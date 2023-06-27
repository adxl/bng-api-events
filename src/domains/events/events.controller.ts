import { Controller, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CreateEventPayload, UpdateEventPayload } from './events.dto';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { Event } from './events.entity';
import { AuthGuard, RolesGuard } from '../../auth.guard';
import { UserRole } from '../../types/user-role';
import { RequestPayload } from '../../types';

@Controller()
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @EventPattern('events.findAll')
  @UseGuards(new RolesGuard('*'), AuthGuard)
  findAll(): Promise<Event[]> {
    return this.eventsService.findAll();
  }

  @EventPattern('events.findOne')
  @UseGuards(new RolesGuard('*'), AuthGuard)
  findOne(@Payload() payload: RequestPayload): Promise<Event> {
    return this.eventsService.findOne(payload.id);
  }

  @EventPattern('events.create')
  @UseGuards(new RolesGuard([UserRole.ORGANIZER]), AuthGuard)
  create(@Payload() payload: CreateEventPayload): Promise<InsertResult> {
    return this.eventsService.create(payload.body);
  }

  @EventPattern('events.update')
  @UseGuards(new RolesGuard([UserRole.ORGANIZER]), AuthGuard)
  update(@Payload() payload: UpdateEventPayload): Promise<UpdateResult> {
    return this.eventsService.update(payload.id, payload.body);
  }

  @EventPattern('events.remove')
  @UseGuards(new RolesGuard([UserRole.ADMINISTRATOR]), AuthGuard)
  remove(@Payload() payload: RequestPayload): Promise<DeleteResult> {
    return this.eventsService.remove(payload.id);
  }
}
