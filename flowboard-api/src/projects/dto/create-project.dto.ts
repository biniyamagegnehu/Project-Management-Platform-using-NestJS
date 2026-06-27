import {
 IsArray,
 IsInt,
 IsNotEmpty,
 IsOptional,
 IsString,
 ValidateNested,
} from 'class-validator';

import { Type }
from 'class-transformer';

class InitialTaskDto {

 @IsString()
 @IsNotEmpty()
 title: string;

}

export class CreateProjectDto {

 @IsString()
 @IsNotEmpty()
 title: string;

 @IsOptional()
 @IsString()
 description?: string;

 @IsInt()
 ownerId: number;

 @IsOptional()

 @IsArray()

 @ValidateNested({
  each:true,
 })

 @Type(
  ()=>InitialTaskDto,
 )

 tasks?: InitialTaskDto[];

}