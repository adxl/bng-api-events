import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from '../../config/typeorm.config';
import { EventsWinnersController } from '../events-winners/events-winners.controller';
import { EventWinner } from './events-winners.entity';
import { EventsWinnersService } from './events-winners.service';
import { EventsWinnersModule } from './events-winners.module';
import { EventsModule } from '../events/events.module';
import { ClientProxy } from '../../config/proxy.config';

describe('Tests events winners', () => {
  let winnersController: EventsWinnersController;
  let jwtService: JwtService;
  let jwt = null;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClientProxy('AUTH_SERVICE', process.env.AUTH_HOST || 'auth-api-service', process.env.AUTH_PORT || '9000'),
        TypeOrmModule.forRoot(TypeOrmConfig),
        TypeOrmModule.forFeature([EventWinner]),
        EventsModule,
        EventsWinnersModule,
      ],
      providers: [EventsWinnersService, JwtService],
      controllers: [EventsWinnersController],
    }).compile();

    winnersController = module.get(EventsWinnersController);
    jwtService = module.get(JwtService);

    jwt = {
      token: 'Bearer ' + jwtService.sign({ id: '163a4bd1-cabd-44ee-b911-9ee2533dd003' }, { privateKey: 'esgi' }),
    };
  });

  describe('Test update winner', () => {
    it('should return the number of affected resources', async () => {
      const data = {
        id: '77777777-06e5-4e9e-aa76-d7e12eba4a06',
        body: {
          userId: 'c63a4bd1-cabd-44ee-b911-9ee2533dd005',
          rank: 2,
        },
      };
      expect((await winnersController.update(data)).affected).toEqual(1);
    });
  });

  describe('Test get winner stats', () => {
    it('should return the user victories and caps count', async () => {
      const result = await winnersController.getByUser(jwt);
      expect(typeof result.firsts).toBe('number');
      expect(typeof result.seconds).toBe('number');
      expect(typeof result.thirds).toBe('number');
    });
  });
});
