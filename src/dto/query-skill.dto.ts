import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class QuerySkillDTO {
  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  nombre?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  @MaxLength(4)
  nombreOperator?: string;
}
