import { Injectable, NotFoundException } from '@nestjs/common';
import { Event } from './events.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { CreateEventDto } from './events.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async create(data: CreateEventDto): Promise<InsertResult> {
    return this.eventRepository.insert(data);
  }

  async findAll(): Promise<Event[]> {
    return this.eventRepository.find();
  }

  async findOne(id: string): Promise<Event> {
    const data = this.eventRepository.findOne({
      where: {
        id,
      },
    });
    if (!data) {
      throw new RpcException(new NotFoundException());
    }
    return data;
  }
}
