import { findOneUser } from '../../../users/users.service';
import connectDb from '../../../connectDb';
import { signToken } from '../../auth.service';

export default async function veryfyAccountHandler(req, res) {
  await connectDb();
  const { token } = req.query;

  try {
    const user = await findOneUser({ passwordResetActivationToken: token });

    if (!user) {
      console.log('Invalid token');
      return res.status(404).json({ message: 'Invalid token' });
    }

    if (Date.now() > user.passwordResetActivationExpires) {
      console.log('Token expired');
      return res.status(404).json({ message: 'Token expired' });
    }

    user.passwordResetActivationToken = null;
    user.passwordResetActivationExpires = null;
    user.isActive = true;

    await user.save();

    const jwtoken = await signToken({ email: user.email });
    console.log('Account activated', user);
    return res.status(200).json({
      jwtoken,
      profile: user.profile,
      message: 'Account activated',
    });
  } catch (error) {
    console.error(`[ERROR]: ${error}`);
    return res.status(500).json({ error });
  }
}
