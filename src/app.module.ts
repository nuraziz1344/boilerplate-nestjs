import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import knex from 'knex';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KNEX_CONNECTION } from './common/constants';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController],
  providers: [
    AppService,
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
          },
          pool: { min: 2, max: 10 },
        });
      },
    },
  ],
})
export class AppModule {}
