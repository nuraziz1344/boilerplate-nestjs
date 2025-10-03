import 'dotenv/config';
import type { Knex } from 'knex';

const config: Knex.Config = {
  client: process.env.DB_CLIENT || 'pg',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    user: process.env.DB_USER || 'user',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'solar_monitoring',
  },
  pool: { min: 2, max: 10 },
};

module.exports = config;
