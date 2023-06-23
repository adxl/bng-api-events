import { IsString, IsUUID, IsPositive, IsDateString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  name: string;

  @IsDateString()
  //@MinDate(new Date()) //TODO: custom min date validator
  startsAt: Date;

  @IsUUID()
  stationId: string;
}
