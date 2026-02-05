export const jwtConfig = {
  secret: process.env.JWT_SECRET ?? 'replace-me',
  accessTokenTtl: '15m'
};
