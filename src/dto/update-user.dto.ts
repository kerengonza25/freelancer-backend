import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEmail, MaxLength } from 'class-validator';

export class ActualizarUserDTO {
  @IsOptional()
  @IsString()
  @ApiProperty()
  firstName: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  lastName: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsOptional()
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
