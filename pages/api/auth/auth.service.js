import jwt from 'jsonwebtoken';

const { KEY } = process.env;

export async function signToken(payload) {
  const token = await jwt.sign(payload, KEY, { expiresIn: '3h' });
  return token;
}
