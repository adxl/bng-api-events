import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { Event } from './events.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { CreateEventDto, UpdateEventDto } from './events.dto';
import { RpcException } from '@nestjs/microservices';
import { EventsWinnersService } from '../events-winners/events-winners.service';

@Injectable()
export class EventsService {
  @InjectRepository(Event)
  private readonly eventRepository: Repository<Event>;

  @Inject(forwardRef(() => EventsWinnersService))
  private readonly eventsWinnersService: EventsWinnersService;

  async create(data: CreateEventDto): Promise<InsertResult> {
    const event = await this.eventRepository.insert(data);
    const eventWinners = Array(3)
      .fill(null)
      .map((_, index) => ({
        event: {
          id: event.identifiers[0].id,
        },
        rank: index + 1,
      }));
    await this.eventsWinnersService.createMany(eventWinners);

    return event;
  }

  async findAll(): Promise<Event[]> {
    return this.eventRepository.find({
      relations: {
        winners: true,
      },
    });
  }

  async findOne(id: string): Promise<Event> {
    const data = await this.eventRepository.findOne({
      where: {
        id,
      },
      relations: {
        winners: true,
      },
    });
    if (!data) {
      throw new RpcException(new NotFoundException(`Event ${id} not found`));
    }
    return data;
  }

  async update(id: string, data: UpdateEventDto): Promise<UpdateResult> {
    await this.findOne(id);
    return this.eventRepository.update(id, data);
  }

  async remove(id: string): Promise<DeleteResult> {
    await this.findOne(id);
    return this.eventRepository.delete(id);
  }
}
