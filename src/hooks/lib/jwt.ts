import jwt from 'jsonwebtoken';

const ACCESS_SECRET = process.env.ACCESS_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_SECRET! as string;
const JWT_SECRET = process.env.JWT_SECRET as string;

export const generateTokens = (user: { id: number; email: string | null; user_type: string }) => {
  const payload = {
    sub: user.id,
    email: user.email,
    user_type: user.user_type,
  };

  const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET, { expiresIn: '7d' });

  return { accessToken, refreshToken };
};


export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}