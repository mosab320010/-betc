export const getBackendTarget = (env: NodeJS.ProcessEnv) => {
  return env.BACKEND_URL ?? 'http://backend:4000';
};
