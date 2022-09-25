import { findUserByEmail } from '../../users/users.service';
import { signToken } from '../auth.service';
import connectDb from '../../connectDb';

export default async function loginHandler(req, res) {
  connectDb();
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);

    if (!user) {
      console.log('User not found');
      return res
        .status(404)
        .json({ status: 404, message: 'Los datos ingresados son incorrectos' });
    }

    if (user.isActive === false) {
      console.log('The account has not been activated');
      return res
        .status(403)
        .json({ message: 'La cuenta no ha sido activada!' });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      console.log('Incorrect password');
      return res.status(401).json({
        status: 401,
        message: 'Los datos ingresados son incorrectos!',
      });
    }

    const jwtoken = await signToken({ email: user.email });
    console.log('Successful login', user);
    return res.json({
      jwtoken,
      profile: user.profile,
      message: 'Bienvenido!',
    });
  } catch (error) {
    console.error(`[ERROR]: ${error}`);
    return res.status(500).json({ status: 401, error });
  }
}
