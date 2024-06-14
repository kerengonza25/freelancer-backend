import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsDefined,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { User } from 'src/model/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CrearTrabajoDTO {
  @IsDefined()
  @IsString()
  @ApiProperty()
  titulo: string;
  @IsDate()
  @Type(() => Date)
  @ApiProperty()
  fechaFin: Date;

  @IsNumber()
  @ApiProperty()
  salario: number;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  salarioPorHora: boolean;

  @IsDefined()
  @ApiProperty()
  autor: User;
}
