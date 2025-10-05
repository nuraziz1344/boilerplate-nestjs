import { Global, Module } from '@nestjs/common';
import knex from 'knex';
import { KNEX_CONNECTION } from '../constants';

@Global()
@Module({
  providers: [
    {
      provide: KNEX_CONNECTION,
      useFactory: () => {
        return knex({
          client: process.env.DB_DRIVER || 'pg',
          connection: {
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT || '5432', 10) || 5432,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            timezone: process.env.TIMEZONE || 'UTC',
          },
          pool: { min: 2, max: 10 },
        });
      },
    },
  ],
  exports: [KNEX_CONNECTION],
})
export class DatabaseModule {}
