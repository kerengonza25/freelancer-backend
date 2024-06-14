import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsArray,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Avance } from 'src/model/avance.entity';
import { User } from 'src/model/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ActualizarTrabajoDTO {
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @ApiProperty()
  fechaFin?: Date;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @ApiProperty()
  fechaInicio?: Date;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  salario?: number;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  salarioPorHora?: boolean;

  @IsOptional()
  @ApiProperty()
  autor?: User;

  @IsArray()
  @IsOptional()
  @ApiProperty()
  trabajadores?: User[];

  @IsArray()
  @IsOptional()
  @ApiProperty()
  avances?: Avance[];

  @IsOptional()
  @IsString()
  @ApiProperty()
  titulo?: string;
}
