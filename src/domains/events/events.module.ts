import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './events.entity';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { EventsWinnersModule } from '../events-winners/events-winners.module';
import { AuthGuard } from '../../auth.guard';
import { AUTH_SERVICE } from '../../constants';

@Module({
  imports: [TypeOrmModule.forFeature([Event]), forwardRef(() => EventsWinnersModule)],
  controllers: [EventsController],
  providers: [EventsService, AuthGuard, AUTH_SERVICE],
  exports: [EventsService, AuthGuard, AUTH_SERVICE],
})
export class EventsModule {}
