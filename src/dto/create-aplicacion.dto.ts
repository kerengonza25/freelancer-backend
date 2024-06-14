import { IsNotEmpty, IsString } from 'class-validator';
import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class CrearAplicacionDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  mensaje: string;

  @IsString()
  @Optional()
  @ApiProperty()
  estado: string;
}
