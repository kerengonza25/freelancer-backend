import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { UpdateSkillCategoriaDTO } from './update-skill-categoria.dto';

export class ActualizarSkillDTO {
  @IsOptional()
  @IsString()
  @ApiProperty()
  nombre: string;

  @IsOptional()
  @ApiProperty()
  categoria: UpdateSkillCategoriaDTO;
}
