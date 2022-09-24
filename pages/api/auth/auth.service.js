import jwt from 'jsonwebtoken';

const { KEY } = process.env;

export async function signToken(payload) {
  const token = await jwt.sign(payload, KEY, { expiresIn: '3h' });
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
