import { IsString, IsDate, IsOptional, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class QueryPublicacionDTO {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  titulo?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  @MaxLength(4)
  tituloOperator?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  contenido?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  @MaxLength(4)
  contenidoOperator?: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @ApiProperty({ required: false })
  fechaCreacion?: Date;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  @MaxLength(4)
  fechaCreacionOperator?: string;
}
