import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateSkillCategoriaDTO {
  @IsOptional()
  @IsString()
  @ApiProperty()
  id?: string;
}
