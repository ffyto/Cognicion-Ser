import crypto from 'crypto';
import connectDb from '../connectDb';
import { createUser, getAllUsers } from './users.service';
import { sendMail } from '../../../utils/mail';
import { isAuthenticated } from '../auth/auth.service';
import { registerLogin } from './user.joiSchema';

export default async function handler(req, res) {
  connectDb();
  const { method } = req;

  switch (method) {
    case 'GET': {
      await isAuthenticated(req, res);

      if (!req.user) {
        return res;
      }

      if (req.user.rol === 'professional') {
        try {
          console.log('[SUCCESS]: Showing all users');
          const users = await getAllUsers();
          return res.status(200).json(users);
        } catch (error) {
          console.error(`[ERROR]: ${error}`);
          return res.status(500).json({ error });
        }
      } else {
        console.log(`[WARNING]: Unauthorized`);
        return res.status(401).json({
          message: '¡No está autorizado para realizar esta operación!',
        });
      }
    }

    case 'POST': {
      registerLogin(req, res);

      if (res.statusCode === 400) {
        return res;
      }

      const userData = req.body;
      try {
        const hash = crypto
          .createHash('sha256')
          .update(userData.email)
          .digest('hex');

        userData.passwordResetActivationToken = hash;
        userData.passwordResetActivationExpires = Date.now() + 3_600_000 * 24;

        const user = await createUser(userData);

        const message = {
          from: '"no-reply" <cognicionyser@gmail.com>',
          to: user.email,
          subject: 'Bienvenido a Cognición & Ser!',
          preheader: 'Active su cuenta ahora.',
          template_id: 'd-fde2a310f01f4baa9712799fd62b00ac',
          dynamic_template_data: {
            name: user.name,
            lastName: user.lastName,
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/activar-cuenta/${hash}`,
          },
        };

        await sendMail(message);

        console.log('[SUCCESS]: User created successfully', user);
        return res.status(201).json(user.profile);
      } catch (error) {
        console.error(`[ERROR]: ${error}`);
        return res.status(500).json({ error });
      }
    }
    default:
      return null;
  }
}
