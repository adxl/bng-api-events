import { DataSource } from 'typeorm';
import { events } from './events.data';
import { Event } from '../../../domains/events/events.entity';
import { Seeder } from 'typeorm-extension';

export class EventsSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    await dataSource.manager.getRepository(Event).insert([...events]);
  }
}
