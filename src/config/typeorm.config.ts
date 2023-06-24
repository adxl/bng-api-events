import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const IS_LOCAL: boolean = process.env.STAGE === 'local' || process.env.STAGE === 'test';

export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  autoLoadEntities: true,
  synchronize: IS_LOCAL,
  ssl: !IS_LOCAL,
  extra: IS_LOCAL
    ? {}
    : {
        ssl: {
          rejectUnauthorized: false,
        },
      },
};
