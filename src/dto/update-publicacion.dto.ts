import { IsString, IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ActualizarPublicacionDTO {
  @IsString()
  @IsOptional()
  @ApiProperty()
  titulo: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  contenido: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @ApiProperty()
  fechaCreacion: Date;
}
