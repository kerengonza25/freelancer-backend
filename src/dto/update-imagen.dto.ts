import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class ActualizarImagenPublicacionDTO {
  @IsString()
  @IsOptional()
  @ApiProperty()
  nombre: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  url: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  tipo: string;
}
