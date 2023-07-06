import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsInt,
  IsNotEmptyObject,
  IsOptional,
  IsUUID,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
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

export class Winner {
  @IsUUID(4)
  userId: string;

  @IsInt()
  @Min(1)
  @Max(3)
  rank: number;
}

export class UpdateEventWinnerDto {
  @ValidateNested()
  @Type(() => Winner)
  @ArrayMinSize(3)
  @ArrayMaxSize(3)
  winners: Winner[];
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
