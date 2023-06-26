import { IsOptional, IsString, IsUUID } from 'class-validator';
import { UserRole } from './user-role';

export class EntityReference {
  @IsUUID(4)
  id: string;
}

export class RequestPayload {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsOptional()
  token?: string;

  @IsOptional()
  roles?: UserRole[] | '*';

  @IsString()
  @IsOptional()
  userId?: string;
}
