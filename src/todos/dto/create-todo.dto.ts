import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty({message:'title khong de trong'})
  @IsString()
  isCompleted?: string;
}