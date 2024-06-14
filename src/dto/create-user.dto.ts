import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CrearUserDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  password: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  imagen: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  @ApiProperty()
  telefono: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  @ApiProperty()
  direccion: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  @ApiProperty()
  ciudad: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  @ApiProperty()
  pais: string;
}
