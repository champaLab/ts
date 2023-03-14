
import jwt, { SignOptions } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import environment from '../environment';

const i = 'Monpity'; // Issuer (Software organization who issues the token)
const s = 'monpity@gmail.com'; // Subject (intended user of the token)
const a = 'https://monpity.la'; // Audience (Domain within which this token will live and function)

export const sign = async (payload: object) => {
  const privateKEY = environment.PRIVATE_KEY ?? '';

  // Token signing options
  const signOptions: SignOptions = {
    issuer: i,
    subject: s,
    audience: a,
    expiresIn: "24h", // 24h validity
    algorithm: "RS256"
  };
  return jwt.sign(payload, privateKEY, signOptions);
}

export const verify = async (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers['Authorization'] as string;

  if (req.headers.authorization) {
    token = `${req.headers.authorization}`.replace('Bearer ', '')
  }

  if (!token)
    return res.status(403).send({ auth: false, message: 'No token provided.' });

  const verifyOptions = {
    issuer: i,
    subject: s,
    audience: a,
    expiresIn: "24h",
    algorithm: ["RS256"]
  };

  const publicKEY = environment.PUBLIC_KEY ?? '';;

  jwt.verify(token, publicKEY, verifyOptions, function (err: any, decoded: any) {
    if (err) {
      console.error(err)
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }
    // if everything good, save to request for use in other routes
    if (decoded) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      req.body.user = decoded
      console.log("verify token: ", decoded)
    }
    next();
  });
}
