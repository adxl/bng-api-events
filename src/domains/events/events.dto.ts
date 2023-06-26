import { Type } from 'class-transformer';
import { IsString, IsUUID, IsDateString, IsOptional, ValidateNested, IsNotEmptyObject } from 'class-validator';
import { RequestPayload } from 'src/types';

export class CreateEventDto {
  @IsString()
  name: string;

  @IsDateString()
  startsAt: Date;

  @IsUUID(4)
  stationId: string;
}

export class CreateEventPayload extends RequestPayload {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateEventDto)
  body: CreateEventDto;
}

export class UpdateEventDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsDateString()
  @IsOptional()
  endedAt?: Date;
}

export class UpdateEventPayload extends RequestPayload {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => UpdateEventDto)
  body: UpdateEventDto;
}
