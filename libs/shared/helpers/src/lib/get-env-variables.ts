interface EnvVariables {
  baseURL?: string;
}

export const getEnvVariables = (): EnvVariables => {
  const envVariables: EnvVariables = {
    baseURL: process.env['NX_API_URL'],
  };
  return envVariables;
};
