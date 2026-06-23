import {
 IsInt,
 IsNotEmpty,
 IsOptional,
 IsString,
} from 'class-validator';

export class CreateProjectDto {

 @IsString()
 @IsNotEmpty()
 title: string;

 @IsOptional()
 @IsString()
 description?: string;

 @IsInt()
 ownerId: number;

}