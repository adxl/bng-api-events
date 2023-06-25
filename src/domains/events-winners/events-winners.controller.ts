import { EventPattern, RpcException } from '@nestjs/microservices';
import { EventsWinnersService } from './events-winners.service';
import { EventWinnerStats, UpdateEventWinnerDtoWrapper } from './events-winners.dto';
import { UpdateResult } from 'typeorm';
import { BadRequestException, Controller, Req, UseGuards } from '@nestjs/common';
import { AuthGuard, RolesGuard } from '../../auth.guard';
import { UserRole } from '../../types/user-role';
import { RequestToken } from '../../types/token';

@Controller()
export class EventsWinnersController {
  constructor(private readonly eventsWinnersService: EventsWinnersService) {}

  @EventPattern('eventsWinners.update')
  @UseGuards(new RolesGuard([UserRole.ORGANIZER]), AuthGuard)
  update(data: UpdateEventWinnerDtoWrapper): Promise<UpdateResult> {
    if (Object.keys(data.body).length === 0) {
      throw new RpcException(new BadRequestException('Payload must not be empty'));
    }
    return this.eventsWinnersService.update(data.event, data.body);
  }

  @EventPattern('eventsWinners.getByUser')
  @UseGuards(new RolesGuard([UserRole.USER]), AuthGuard)
  getByUser(@Req() request: RequestToken): Promise<EventWinnerStats> {
    return this.eventsWinnersService.getByUser(request.userId);
  }
}
