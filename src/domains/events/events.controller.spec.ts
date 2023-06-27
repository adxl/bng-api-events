import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from '../../config/typeorm.config';
import { EventsWinnersModule } from '../events-winners/events-winners.module';
import { EventsController } from './events.controller';
import { Event } from './events.entity';
import { EventsModule } from './events.module';
import { EventsService } from './events.service';
import { ClientProxy } from '../../config/proxy.config';

describe('Tests events', () => {
  let eventsController: EventsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClientProxy('AUTH_SERVICE', process.env.AUTH_HOST || 'auth-api-service', process.env.AUTH_PORT || '9000'),
        TypeOrmModule.forRoot(TypeOrmConfig),
        TypeOrmModule.forFeature([Event]),
        EventsModule,
        EventsWinnersModule,
      ],
      providers: [EventsService],
      controllers: [EventsController],
    }).compile();

    eventsController = module.get(EventsController);
  });

  describe('Test find all events', () => {
    it('should return all events', async () => {
      const events = await eventsController.findAll();
      expect(Array.isArray(events)).toBe(true);
    });
  });

  describe('Test find one event', () => {
    it('should return one event', async () => {
      const eventTitle = 'Event 4';
      const event = await eventsController.findOne({ id: '77777777-06e5-4e9e-aa76-d7e12eba4a04' });
      expect(event.name).toEqual(eventTitle);
    });

    it('should throws a not found exception', async () => {
      await expect(eventsController.findOne({ id: '77777777-06e5-4e9e-aa76-d7e12eba4a99' })).rejects.toThrow();
    });
  });

  describe('Test create event', () => {
    it('should return an UUID', async () => {
      const body = {
        name: 'Test circuit de course',
        startsAt: new Date(),
        stationId: '11111111-bab3-439d-965d-0522568b0008',
      };
      expect((await eventsController.create({ body })).identifiers[0].id).toHaveLength(36);
    });
  });

  describe('Test update event', () => {
    it('should return the number of affected resources', async () => {
      const data = {
        id: '77777777-06e5-4e9e-aa76-d7e12eba4a08',
        body: {
          name: 'Course poursuite',
        },
      };
      expect((await eventsController.update(data)).affected).toEqual(1);
    });
  });

  describe('Test remove one event', () => {
    it('should return the number of affected resources', async () => {
      const id = '77777777-06e5-4e9e-aa76-d7e12eba4a05';
      expect((await eventsController.remove({ id })).affected).toEqual(1);
    });
  });
});
