import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, MaxLength } from 'class-validator';

export class QueryAplicacionDTO {
  @IsOptional()
  @ApiProperty({ required: false })
  usuario?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  @MaxLength(4)
  usuarioOperator?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  publicacion?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  @MaxLength(4)
  publicacionOperator?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  estado?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  @MaxLength(4)
  estadoOperator?: string;
}
