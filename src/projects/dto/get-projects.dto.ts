import {
 IsInt,
 IsOptional,
 IsString,
} from 'class-validator';

import {
 Type,
} from 'class-transformer';

export class GetProjectsDto {

 @IsOptional()

 @Type(
  ()=>Number,
 )

 @IsInt()
 page = 1;

 @IsOptional()

 @Type(
  ()=>Number,
 )

 @IsInt()
 limit = 10;

 @IsOptional()

 @IsString()
 search?: string;

 @IsOptional()

 @IsString()
 sort?: 'asc' | 'desc';

}