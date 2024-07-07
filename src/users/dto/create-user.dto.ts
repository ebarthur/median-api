import { ApiProperty } from '@nestjs/swagger'
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator'

export class CreateUserDto {
  @IsString()
  @IsOptional()
  @MinLength(5)
  @ApiProperty()
  name: string

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  @ApiProperty()
  password: string
}
