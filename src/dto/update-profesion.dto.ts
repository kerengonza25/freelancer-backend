import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ActualizarProfesionDTO {
  @IsOptional()
  @IsString()
  @ApiProperty()
  nombre: string;
}
