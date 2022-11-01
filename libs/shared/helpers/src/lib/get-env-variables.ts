interface EnvVariables {
  baseURL: string;
  port: number;
  dbUri: string | undefined;
  jwtSecret: string | undefined;
}

export const getEnvVariables = (): EnvVariables => {
  const envVariables: EnvVariables = {
    baseURL: process.env['NX_API_URL'] || '/api',
    port: parseInt(process.env['PORT'] as string, 10) || 3333,
    dbUri: process.env['MONGODB_URI'],
    jwtSecret: process.env['JWT_SECRET'],
  };
  return envVariables;
};
