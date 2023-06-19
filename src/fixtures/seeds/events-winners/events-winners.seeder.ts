import { DataSource } from 'typeorm';
import { eventsWinners } from './events-winners.data';
import { EventWinner } from '../../../domains/events-winners/events-winners.entity';
import { Seeder } from 'typeorm-extension';

export class EventsWinnersSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    await dataSource.manager.getRepository(EventWinner).insert([...eventsWinners]);
  }
}
