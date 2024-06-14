import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class QueryCategoriaSkillDTO {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  nombre?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  @MaxLength(4)
  nombreOperator?: string;
}
