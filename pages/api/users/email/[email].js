import connectDb from '../../connectDb/';
import { findUserByEmail } from '../users.service';

export default async function handler(req, res) {
  connectDb();
  const { email } = req.query;
  try {
    const user = await findUserByEmail(email);

    if (!user) {
      console.log('[WARNING]: User not found');
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    console.log('[SUCCESS]: Showing user', user);
    return res.json(user);
  } catch (error) {
    console.error(`[ERROR]: ${error}`);
    return res.status(500).json({ error });
  }
}
