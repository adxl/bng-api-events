import { EventPattern, Payload } from '@nestjs/microservices';
import { EventsWinnersService } from './events-winners.service';
import { EventWinnerStats, UpdateEventWinnerPayload } from './events-winners.dto';
import { UpdateResult } from 'typeorm';
import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard, RolesGuard } from '../../auth.guard';
import { UserRole } from '../../types/user-role';
import { RequestPayload } from '../../types';

@Controller()
export class EventsWinnersController {
  constructor(private readonly eventsWinnersService: EventsWinnersService) {}

  @EventPattern('eventsWinners.update')
  @UseGuards(new RolesGuard([UserRole.ORGANIZER]), AuthGuard)
  update(@Payload() payload: UpdateEventWinnerPayload): Promise<UpdateResult> {
    return this.eventsWinnersService.update(payload);
  }

  @EventPattern('eventsWinners.getByUser')
  @UseGuards(new RolesGuard([UserRole.USER]), AuthGuard)
  getByUser(@Payload() payload: RequestPayload): Promise<EventWinnerStats> {
    return this.eventsWinnersService.getByUser(payload.userId);
  }
}
