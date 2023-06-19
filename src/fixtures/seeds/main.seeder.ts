import { DataSource } from 'typeorm';
import { runSeeder, Seeder } from 'typeorm-extension';
import { EventsSeeder } from './events/events.seeder';
import { EventsWinnersSeeder } from './events-winners/events-winners.seeder';

export class MainSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    await dataSource.synchronize(true);
    await runSeeder(dataSource, EventsSeeder);
    await runSeeder(dataSource, EventsWinnersSeeder);
  }
}
