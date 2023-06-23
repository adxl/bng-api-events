import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventWinner } from './events-winners.entity';
import { InsertResult, Repository, UpdateResult } from 'typeorm';
import { CreateEventWinnerDto, FindOneEventWinnerDto, UpdateEventWinnerDto } from './events-winners.dto';
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
    const EventList = await this.findAll();
    EventList.forEach((eventOne) => {
      if (eventOne.userId === data.userId && eventOne.eventId === eventNow.eventId) {
        throw new RpcException(
          new NotFoundException(`User ${eventOne.userId} already exist in event ${eventOne.eventId}`),
        );
      }
    });
    //todo check if user not exist in event
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

  async getByUser(userId: string): Promise<any> {
    const events = await this.eventWinnerRepository.find({
      where: {
        userId,
      },
    });
    const result = {
      firsts: 0,
      seconds: 0,
      thirds: 0,
    };
    events.forEach((event) => {
      if (event.rank === 1) {
        result.firsts += 1;
      }
      if (event.rank === 2) {
        result.seconds += 1;
      }
      if (event.rank === 3) {
        result.thirds += 1;
      }
    });
    return result;
  }
}
