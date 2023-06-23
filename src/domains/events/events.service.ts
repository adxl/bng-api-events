import { Injectable, NotFoundException } from '@nestjs/common';
import { Event } from './events.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { CreateEventDto, UpdateEventDto } from './events.dto';
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
    const data = await this.eventRepository.findOne({
      where: {
        id,
      },
    });
    if (!data) {
      throw new RpcException(new NotFoundException(`Event ${id} not found`));
    }
    return data;
  }

  async update(id: string, data: UpdateEventDto): Promise<UpdateResult> {
    const event = await this.findOne(id);
    if (!event) {
      throw new RpcException(new NotFoundException(`Event ${id} not found`));
    }
    return this.eventRepository.update(event.id, data);
  }

  async remove(id: string): Promise<DeleteResult> {
    const event = await this.findOne(id);
    if (!event) {
      throw new RpcException(new NotFoundException(`Event ${id} not found`));
    }
    return this.eventRepository.delete(event.id);
  }
}
