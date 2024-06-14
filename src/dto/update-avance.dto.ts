import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsString, Max, Min } from 'class-validator';

export class ActualizarAvanceDTO {
  @IsOptional()
  @IsString()
  @ApiProperty()
  descripcion?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  fecha?: Date;

  @IsOptional()
  @IsString()
  @ApiProperty()
  estado?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @ApiProperty()
  horas?: number;

  @IsOptional()
  @IsNumber()
  @Max(100)
  @Min(0)
  @ApiProperty()
  porcentaje?: number;
}
