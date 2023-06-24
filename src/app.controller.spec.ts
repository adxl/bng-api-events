import { INestMicroservice } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmConfig } from './config/typeorm.config';
import { EventsWinnersModule } from './domains/events-winners/events-winners.module';
import { EventsModule } from './domains/events/events.module';

import { bootstrap } from './main';

describe('Tests entrypoint', () => {
  let appController: AppController;
  let appInstance: INestMicroservice;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(TypeOrmConfig), TypeOrmModule.forFeature([EventsModule, EventsWinnersModule])],
      providers: [AppService],
      controllers: [AppController],
    }).compile();

    appController = module.get(AppController);
    appInstance = await bootstrap();
  });

  afterAll((done) => {
    appInstance.close();
    done();
  });

  describe('Start the server', () => {
    it('it should start the server', () => {
      expect(appInstance).toBeDefined();
    });
  });

  describe('Test call index', () => {
    it('should return a welcome string', () => {
      expect(appController.index()).toEqual('Welcome to Events API');
    });
  });

  describe('Test kill', () => {
    it('should return exception ServiceUnavailableException', () => {
      expect(() => appController.kill()).toThrow();
    });
  });
});
