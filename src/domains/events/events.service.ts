import { Injectable } from '@nestjs/common';
import { Event } from './events.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { CreateEventDto } from './events.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async create(data: CreateEventDto): Promise<InsertResult> {
    return this.eventRepository.insert(data);
  }
}
