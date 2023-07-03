import { Type } from 'class-transformer';
import { IsInt, IsNotEmptyObject, IsOptional, IsUUID, Max, Min, ValidateNested } from 'class-validator';
import { EntityReference, RequestPayload } from '../../types';

export class CreateEventWinnerDto {
  @ValidateNested()
  @Type(() => EntityReference)
  @IsNotEmptyObject()
  event: EntityReference;

  @IsInt()
  @Min(1)
  @Max(3)
  rank: number;
}

// ---

export class UpdateEventWinnerDto {
  @IsUUID(4)
  @IsOptional()
  userId: string;

  @IsInt()
  @Min(1)
  @Max(3)
  rank: number;
}

export class UpdateEventWinnerPayload extends RequestPayload {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => UpdateEventWinnerDto)
  body: UpdateEventWinnerDto;
}

// ---

export type EventWinnerStats = {
  firsts: number;
  seconds: number;
  thirds: number;
};
