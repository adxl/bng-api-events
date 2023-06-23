import { BadRequestException, Controller } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventPattern, RpcException } from '@nestjs/microservices';
import { CreateEventDto, UpdateEventDtoWrapper } from './events.dto';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { Event } from './events.entity';

@Controller()
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @EventPattern('events.create')
  create(data: CreateEventDto): Promise<InsertResult> {
    return this.eventsService.create(data);
  }

  @EventPattern('events.findAll')
  findAll(): Promise<Event[]> {
    return this.eventsService.findAll();
  }

  @EventPattern('events.findOne')
  findOne(id: string): Promise<Event> {
    return this.eventsService.findOne(id);
  }

  @EventPattern('events.update')
  update(data: UpdateEventDtoWrapper): Promise<UpdateResult> {
    if (Object.keys(data.body).length === 0) {
      throw new RpcException(new BadRequestException('Payload must not be empty'));
    }
    return this.eventsService.update(data.id, data.body);
  }

  @EventPattern('events.remove')
  remove(id: string): Promise<DeleteResult> {
    return this.eventsService.remove(id);
  }
}
