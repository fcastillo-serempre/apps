import * as jwt from 'jsonwebtoken';

import type { Token } from '@apps/api-interfaces';

import { getEnvVariables } from '@apps/helpers';

const { jwtSecret } = getEnvVariables();

export const generateToken = ({
  uid: id,
  name,
}: Token): Promise<string | undefined> => {
  return new Promise((resolve, reject): void => {
    const payload = { id, name };

    jwt.sign(
      payload,
      jwtSecret,
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
