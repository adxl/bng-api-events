import { Type } from 'class-transformer';
import { IsString, IsUUID, IsDateString, IsOptional, ValidateNested } from 'class-validator';

export class CreateEventDto {
  @IsString()
  name: string;

  @IsDateString()
  //@MinDate(new Date()) //TODO: custom min date validator
  startsAt: Date;

  @IsUUID(4)
  stationId: string;
}

export class UpdateEventDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsDateString()
  @IsOptional()
  //@MinDate(new Date()) //TODO: custom min date validator
  endedAt?: Date;
}

export class UpdateEventDtoWrapper {
  @IsUUID(4)
  id: string;

  @ValidateNested()
  @Type(() => UpdateEventDto)
  body: UpdateEventDto;
}
