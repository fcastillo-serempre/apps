interface EnvVariables {
  baseURL: string;
  port: number;
  dbUri: string | undefined;
  jwtSecret: string | undefined;
  googleClientId: string;
  googleClientSecret: string;
}

export const getEnvVariables = (): EnvVariables => {
  const envVariables: EnvVariables = {
    baseURL: process.env['NX_API_URL'] || '/api',
    port: parseInt(process.env['PORT'] as string, 10) || 3333,
    dbUri: process.env['MONGODB_URI'],
    jwtSecret: process.env['JWT_SECRET'],
    googleClientId: process.env['NX_GOOGLE_CLIENT_ID'] || 'NOT_SET',
    googleClientSecret: process.env['NX_GOOGLE_CLIENT_SECRET'] || 'NOT_SET',
  };
  return envVariables;
};
