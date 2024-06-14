import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { CreateSkillCategoriaDTO } from './create-skill-categoria.dto';

export class CrearSkillDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  nombre: string;

  @IsDefined()
  @ApiProperty()
  categoria: CreateSkillCategoriaDTO;
}
