export const config = {
  PORT: Number(process.env.PORT) || 3000,
  API_PREFIX: process.env.API_PREFIX || '/api',
  DB_NAME: process.env.DB_NAME || 'postgres',
  DB_USER: process.env.DB_USER || 'postgres',
  DB_PASSWORD: process.env.DB_PASSWORD || 'root',
  DB_PORT: Number(process.env.DB_PORT) || 5432,
  HOST: process.env.HOST || 'localhost',
  SECRET: process.env.SECRET || 'secret_passphrase',
};
