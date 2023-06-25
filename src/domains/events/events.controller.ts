import { BadRequestException, Controller, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventPattern, RpcException } from '@nestjs/microservices';
import { CreateEventDto, UpdateEventDtoWrapper } from './events.dto';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { Event } from './events.entity';
import { AuthGuard, RolesGuard } from '../../auth.guard';
import { UserRole } from '../../types/user-role';

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
  findOne(id: string): Promise<Event> {
    return this.eventsService.findOne(id);
  }

  @EventPattern('events.create')
  @UseGuards(new RolesGuard([UserRole.ORGANIZER]), AuthGuard)
  create(data: CreateEventDto): Promise<InsertResult> {
    return this.eventsService.create(data);
  }

  @EventPattern('events.update')
  @UseGuards(new RolesGuard([UserRole.ORGANIZER]), AuthGuard)
  update(data: UpdateEventDtoWrapper): Promise<UpdateResult> {
    if (Object.keys(data.body).length === 0) {
      throw new RpcException(new BadRequestException('Payload must not be empty'));
    }
    return this.eventsService.update(data.id, data.body);
  }

  @EventPattern('events.remove')
  @UseGuards(new RolesGuard([UserRole.ORGANIZER]), AuthGuard)
  remove(id: string): Promise<DeleteResult> {
    return this.eventsService.remove(id);
  }
}
