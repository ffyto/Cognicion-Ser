import crypto from 'crypto';
import connectDb from '../connectDb';

import { createUser, getAllUsers } from './users.service';

export default async function handler(req, res) {
  await connectDb();
  const { method } = req;

  switch (method) {
    case 'GET': {
      try {
        console.log('Showing all users');
        const users = await getAllUsers();
        return res.status(200).json(users);
      } catch (error) {
        console.error(`[ERROR]: ${error}`);
        return res.status(500).json({ error });
      }
    }

    case 'POST': {
      const userData = req.body;
      try {
        const hash = crypto
          .createHash('sha256')
          .update(userData.email)
          .digest('hex');

        userData.passwordResetActivationToken = hash;
        userData.passwordResetActivationExpires = Date.now() + 3_600_000 * 24;

        const user = await createUser(userData);

        console.log('User created successfully', user);
        return res.status(201).json(user.profile);
      } catch (error) {
        console.error(`[ERROR]: ${error}`);
        return res.status(500).json({ error });
      }
    }
  }
}
