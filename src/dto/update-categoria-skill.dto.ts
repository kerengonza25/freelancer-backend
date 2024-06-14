import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ActualizarCategoriaSkillDTO {
  @IsOptional()
  @IsString()
  @ApiProperty()
  nombre?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  descripcion?: string;
}
