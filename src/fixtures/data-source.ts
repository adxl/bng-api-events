import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { MainSeeder } from './seeds/main.seeder';
import { Event } from '../domains/events/events.entity';
import { EventWinner } from '../domains/events-winners/events-winners.entity';

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [Event, EventWinner],
  seeds: [MainSeeder],
};

export const AppDataSource = new DataSource(options);
