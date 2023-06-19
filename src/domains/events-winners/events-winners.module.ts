import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventWinner } from './events-winners.entity';
// import { EventsController } from './events.controller';
// import { EventsService } from './events.service';

@Module({
  imports: [TypeOrmModule.forFeature([EventWinner])],
  // providers: [EventsService],
  // controllers: [EventsController],
})
export class EventsWinnnersModule {}
