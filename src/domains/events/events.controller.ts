import { Controller } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventPattern } from '@nestjs/microservices';
import { CreateEventDto } from './events.dto';
import { InsertResult } from 'typeorm';

@Controller()
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @EventPattern('events.create')
  create(data: CreateEventDto): Promise<InsertResult> {
    return this.eventsService.create(data);
  }
}
