import * as jwt from 'jsonwebtoken';

import { config } from '../config';

export interface Token {
  uid: string;
  name: string;
}

export const generateToken = ({
  uid,
  name,
}: Token): Promise<string | undefined> => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name };

    jwt.sign(
      payload,
      config.jwtSecret,
      {
        expiresIn: '2h',
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject('Could not generate token');
        } else {
          resolve(token);
        }
      }
    );
  });
};
