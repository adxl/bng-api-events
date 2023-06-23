import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventWinner } from './events-winners.entity';
import { EventsWinnersController } from './events-winners.controller';
import { EventsWinnersService } from './events-winners.service';
import { Event } from '../events/events.entity';
import { EventsService } from '../events/events.service';
@Module({
  imports: [TypeOrmModule.forFeature([EventWinner, Event])],
  providers: [EventsWinnersService, EventsService],
  controllers: [EventsWinnersController],
})
export class EventsWinnnersModule {}
