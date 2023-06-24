import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventWinner } from './events-winners.entity';
import { EventsWinnersController } from './events-winners.controller';
import { EventsWinnersService } from './events-winners.service';
import { EventsModule } from '../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([EventWinner]), forwardRef(() => EventsModule)],
  controllers: [EventsWinnersController],
  providers: [EventsWinnersService],
  exports: [EventsWinnersService],
})
export class EventsWinnersModule {}
