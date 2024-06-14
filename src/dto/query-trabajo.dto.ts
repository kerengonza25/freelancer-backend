import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class QueryTrabajoDTO {
  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  titulo?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  @MaxLength(4)
  tituloOperator?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  estado?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  @MaxLength(4)
  estadoOperator?: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @ApiProperty({ required: false })
  fechaInicio?: Date;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  @MaxLength(4)
  fechaInicioOperator?: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @ApiProperty({ required: false })
  fechaFin?: Date;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  @MaxLength(4)
  fechaFinOperator?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  salario?: number;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  @MaxLength(4)
  salarioOperator?: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false })
  salarioPorHora?: boolean;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  @MaxLength(4)
  salarioPorHoraOperator?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  autor?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  @MaxLength(4)
  autorOperator?: string;
}
