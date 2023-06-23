import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventWinner } from './events-winners.entity';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import {
  CreateEventWinnerDto,
  FindOneEventWinnerDto,
  RemoveEventWinnerDto,
  UpdateEventWinnerDto,
} from './events-winners.dto';
import { EventsService } from '../events/events.service';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class EventsWinnersService {
  constructor(
    @InjectRepository(EventWinner)
    private readonly eventWinnerRepository: Repository<EventWinner>,
    @Inject(EventsService) private readonly eventsService: EventsService,
  ) {}

  async create(data: CreateEventWinnerDto): Promise<InsertResult> {
    return this.eventWinnerRepository.insert(data);
  }

  async findAll(): Promise<EventWinner[]> {
    return this.eventWinnerRepository.find();
  }

  async findOne(event: string, data: FindOneEventWinnerDto): Promise<EventWinner> {
    const eventNow = await this.eventsService.findOne(event);
    if (!eventNow) {
      throw new RpcException(new NotFoundException(`Event ${event} not found`));
    }
    const eventExiste = await this.eventWinnerRepository.findOne({
      where: {
        eventId: event,
        rank: data.rank,
      },
    });
    if (!eventExiste) {
      throw new RpcException(new NotFoundException(`Event ${event} with rank ${data.rank} not found`));
    }
    return eventExiste;
  }

  async update(event: string, data: UpdateEventWinnerDto): Promise<UpdateResult> {
    const eventNow = await this.findOne(event, data);
    if (!eventNow) {
      throw new RpcException(new NotFoundException(`Event ${event} with rank ${data.rank} not found`));
    }
    return this.eventWinnerRepository.update(
      {
        eventId: event,
        rank: data.rank,
      },
      {
        ...data,
      },
    );
  }

  async remove(event: string, data: RemoveEventWinnerDto): Promise<DeleteResult> {
    const eventNow = await this.findOne(event, data);
    if (!eventNow) {
      throw new RpcException(new NotFoundException(`Event ${event} with rank ${data.rank} not found`));
    }
    return this.eventWinnerRepository.delete({
      eventId: event,
      rank: data.rank,
    });
  }
}
