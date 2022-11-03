import { OAuth2Client } from 'google-auth-library';

import { getEnvVariables } from '@apps/helpers';

import { getErrorMessage } from './get-error-message';

const { googleClientId } = getEnvVariables();
const client = new OAuth2Client(googleClientId);

interface GoogleUser {
  name: string;
  email: string;
  picture: string;
}

export const verifyGoogle = async (token: string): Promise<GoogleUser> => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: googleClientId,
    });
    const { name, email, picture } = ticket.getPayload();

    return { name, email, picture };
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};
