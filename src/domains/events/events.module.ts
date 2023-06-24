import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './events.entity';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { EventsWinnersModule } from '../events-winners/events-winners.module';

@Module({
  imports: [TypeOrmModule.forFeature([Event]), forwardRef(() => EventsWinnersModule)],
  controllers: [EventsController],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsModule {}
