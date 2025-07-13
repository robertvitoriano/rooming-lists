import { IsOptional, IsEnum, IsInt, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { Sorting } from 'src/core/repositories/types';

export class FetchRoomingListsQueryDto {
  @IsOptional()
  @IsString()
  eventName?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  rfpName?: string;

  @IsOptional()
  @IsString()
  agreementType?: string;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  perPage: number = 3;

  @IsOptional()
  @IsEnum(Sorting)
  sort: Sorting = Sorting.DESC;
}

export const roomingListsStatusMap = {
  active: 'received',
  closed: 'completed',
  canceled: 'archived',
};
