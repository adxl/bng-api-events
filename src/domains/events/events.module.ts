import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './events.entity';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { EventsWinnersModule } from '../events-winners/events-winners.module';
import { ClientProxy } from '../../config/proxy.config';

@Module({
  imports: [
    ClientProxy('AUTH_SERVICE', process.env.AUTH_HOST || 'auth-api-service', process.env.AUTH_PORT || '9000'),
    TypeOrmModule.forFeature([Event]),
    forwardRef(() => EventsWinnersModule),
  ],
  controllers: [EventsController],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsModule {}
