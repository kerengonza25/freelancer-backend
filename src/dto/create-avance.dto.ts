import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CrearAvanceDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  descripcion: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  fecha: Date;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  estado: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @ApiProperty()
  horas: number;

  @IsNotEmpty()
  @IsNumber()
  @Max(100)
  @Min(0)
  @ApiProperty()
  porcentaje: number;
}
