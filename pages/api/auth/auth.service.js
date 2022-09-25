import jwt from 'jsonwebtoken';
import { findUserByEmail } from '../users/users.service';

const { KEY } = process.env;

export function signToken(payload) {
  const token = jwt.sign(payload, KEY, { expiresIn: '3h' });
  return token;
}

export function verifyToken(token) {
  try {
    const payload = jwt.verify(token, KEY);
    return payload;
  } catch (e) {
    return null;
  }
}

export async function isAuthenticated(req, res) {
  const auth = req.headers?.authorization;

  if (!auth) {
    return res
      .status(401)
      .json({ message: '¡No está autorizado para realizar esta operación!' });
  }
  const token = auth.split(' ')[1];
  const decoded = verifyToken(token);

  if (!decoded) {
    return res
      .status(401)
      .json({ message: '¡No está autorizado para realizar esta operación!' });
  }
  const { email } = decoded;
  const user = await findUserByEmail(email);

  if (!user) {
    return res.status(404).json({ message: 'El usuario no existe' });
  }
  req.user = user;

  console.log(
    '🚀 ~ file: auth.services.js ~ line 49 ~ isAuthenticated ~ user',
    user.id
  );

  return null;
}
