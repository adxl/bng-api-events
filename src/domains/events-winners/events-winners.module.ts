import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventWinner } from './events-winners.entity';
import { EventsWinnersController } from './events-winners.controller';
import { EventsWinnersService } from './events-winners.service';
import { EventsModule } from '../events/events.module';
import { AuthGuard } from '../../auth.guard';
import { AUTH_SERVICE } from '../../constants';

@Module({
  imports: [TypeOrmModule.forFeature([EventWinner]), forwardRef(() => EventsModule)],
  controllers: [EventsWinnersController],
  providers: [EventsWinnersService, AuthGuard, AUTH_SERVICE],
  exports: [EventsWinnersService, AuthGuard, AUTH_SERVICE],
})
export class EventsWinnersModule {}
