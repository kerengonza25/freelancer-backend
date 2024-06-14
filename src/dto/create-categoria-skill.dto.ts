import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CrearCategoriaSkillDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  descripcion: string;
}
