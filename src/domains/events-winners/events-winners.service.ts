import { ConflictException, Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventWinner } from './events-winners.entity';
import { InsertResult, Repository, UpdateResult } from 'typeorm';
import { CreateEventWinnerDto, EventWinnerStats, UpdateEventWinnerDto } from './events-winners.dto';
import { EventsService } from '../events/events.service';

@Injectable()
export class EventsWinnersService {
  @InjectRepository(EventWinner)
  private readonly eventWinnerRepository: Repository<EventWinner>;

  @Inject(forwardRef(() => EventsService))
  private readonly eventsService: EventsService;

  async createMany(data: CreateEventWinnerDto[]): Promise<InsertResult> {
    return this.eventWinnerRepository.insert(data);
  }

  async update(eventId: string, data: UpdateEventWinnerDto): Promise<UpdateResult> {
    const event = await this.eventsService.findOne(eventId);
    if (Object.values(event.winners).find((winner) => winner.userId === data.userId)) {
      throw new ConflictException(`User ${data.userId} already exist in event ${eventId}`);
    }

    return this.eventWinnerRepository.update(
      {
        eventId: eventId,
        rank: data.rank,
      },
      {
        userId: data.userId,
      },
    );
  }

  async getByUser(userId: string): Promise<EventWinnerStats> {
    const events = await this.eventWinnerRepository.find({
      where: {
        userId,
      },
    });

    const result = {
      firsts: 0,
      seconds: 0,
      thirds: 0,
      caps: 0,
    };

    events.forEach((event) => {
      if (event.rank === 1) {
        result.firsts += 1;
        result.caps += 50;
      }
      if (event.rank === 2) {
        result.seconds += 1;
        result.caps += 25;
      }
      if (event.rank === 3) {
        result.thirds += 1;
        result.caps += 10;
      }
    });

    return result;
  }
}
