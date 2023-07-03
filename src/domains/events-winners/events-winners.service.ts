import { ConflictException, Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventWinner } from './events-winners.entity';
import { InsertResult, Repository, UpdateResult } from 'typeorm';
import {
  CreateEventWinnerDto,
  EventWinnerStats,
  UpdateEventWinnerDto,
  UpdateEventWinnerPayload,
} from './events-winners.dto';
import { EventsService } from '../events/events.service';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class EventsWinnersService {
  @InjectRepository(EventWinner)
  private readonly eventWinnerRepository: Repository<EventWinner>;

  @Inject(forwardRef(() => EventsService))
  private readonly eventsService: EventsService;

  @Inject('AUTH_SERVICE')
  private readonly authProxy: ClientProxy;

  async createMany(data: CreateEventWinnerDto[]): Promise<InsertResult> {
    return this.eventWinnerRepository.insert(data);
  }

  async update(payload: UpdateEventWinnerPayload): Promise<UpdateResult> {
    const eventId: string = payload.id;
    const data: UpdateEventWinnerDto = payload.body;

    const event = await this.eventsService.findOne(eventId);
    if (Object.values(event.winners).find((winner) => winner.userId === data.userId)) {
      throw new ConflictException(`User ${data.userId} already exist in event ${eventId}`);
    }

    const body = {
      caps: 0,
    };

    if (data.rank === 1) {
      body.caps += 50;
    }
    if (data.rank === 2) {
      body.caps += 25;
    }
    if (data.rank === 3) {
      body.caps += 10;
    }

    await this.authProxy.send('users.updateCaps', {
      id: data.userId,
      body,
      token: payload.token,
    });

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
