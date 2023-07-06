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
import { catchError, firstValueFrom, of } from 'rxjs';

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

  async update(payload: UpdateEventWinnerPayload): Promise<null> {
    const eventId: string = payload.id;
    const data: UpdateEventWinnerDto = payload.body;

    await this.eventsService.findOne(eventId);

    if (
      Array.from(new Set(data.winners.map((w) => w.rank))).length !== 3 ||
      Array.from(new Set(data.winners.map((w) => w.userId))).length !== 3
    ) {
      throw new ConflictException(`Duplicated ranks or users`);
    }

    data.winners.forEach(async (winner) => {
      await firstValueFrom(
        this.authProxy
          .send('users.updateCaps', {
            id: winner.userId,
            body: { caps: 40 - winner.rank * 10 },
            token: payload.token,
          })
          .pipe(catchError((error) => of(error))),
      );
      await this.eventWinnerRepository.update(
        {
          eventId: eventId,
          rank: winner.rank,
        },
        {
          userId: winner.userId,
        },
      );
    });

    return null;
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
