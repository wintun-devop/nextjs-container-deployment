import jwt from 'jsonwebtoken';

interface TokenPayload {
  id: string;
  email: string;
  profileurl:any;
}

const jwtSecret = process.env.JWT_SECRET as string;


// Function to generate JWT token
export const generateAccessToken = (inputData:TokenPayload): string => {
  return jwt.sign({ ...inputData }, jwtSecret, { expiresIn: '30h' });
};

// Function to generate JWT refresh token
export const generateRefreshToken = (inputData:TokenPayload)=> {
  return jwt.sign({ ...inputData }, jwtSecret, { expiresIn: '30d' });
};

// vertify token
export const verifyToken = (token: string)=> {
  try {
    return jwt.verify(token, jwtSecret);
  } catch (e) {
    console.log("jwt_error",e)
    return null;
  }
};

// decodeToken.ts
export function decodeToken(token: string) {
  const [headerB64, payloadB64, signature] = token.split('.');

  if (!headerB64 || !payloadB64 || !signature) {
    throw new Error('Invalid token format');
  }

  const header = JSON.parse(Buffer.from(headerB64, 'base64').toString('utf-8'));
  const payload = JSON.parse(Buffer.from(payloadB64, 'base64').toString('utf-8'));

  return { header, payload, signature };
}
