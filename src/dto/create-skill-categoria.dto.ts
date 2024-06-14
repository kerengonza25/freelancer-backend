import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateSkillCategoriaDTO {
  @IsString()
  @ApiProperty()
  id: string;
}
