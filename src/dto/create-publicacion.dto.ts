import { IsString, IsDate, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CrearPublicacionDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  contenido: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  @ApiProperty()
  fechaCreacion: Date;
}
