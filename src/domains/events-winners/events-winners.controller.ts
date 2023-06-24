import { EventPattern, RpcException } from '@nestjs/microservices';
import { EventsWinnersService } from './events-winners.service';
import { UpdateEventWinnerDtoWrapper } from './events-winners.dto';
import { UpdateResult } from 'typeorm';
import { BadRequestException, Controller } from '@nestjs/common';
import { EventWinner } from './events-winners.entity';
@Controller()
export class EventsWinnersController {
  constructor(private readonly eventsWinnersService: EventsWinnersService) {}

  @EventPattern('eventsWinners.update')
  update(data: UpdateEventWinnerDtoWrapper): Promise<UpdateResult> {
    if (Object.keys(data.body).length === 0) {
      throw new RpcException(new BadRequestException('Payload must not be empty'));
    }
    return this.eventsWinnersService.update(data.event, data.body);
  }

  @EventPattern('eventsWinners.getByUser')
  getByUser(id: string): Promise<EventWinner[]> {
    return this.eventsWinnersService.getByUser(id);
  }
}
