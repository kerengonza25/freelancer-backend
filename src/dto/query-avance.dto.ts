import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, MaxLength } from 'class-validator';

export class AvanceSearchQuery {
  @IsOptional()
  @ApiProperty({ required: false })
  trabajo?: string;
  @IsOptional()
  @ApiProperty({ required: false })
  @MaxLength(4)
  trabajoOperador?: string;
  @IsOptional()
  @ApiProperty({ required: false })
  estado?: string;
  @IsOptional()
  @ApiProperty({ required: false })
  @MaxLength(4)
  estadoOperador?: string;
  @IsOptional()
  @ApiProperty({ required: false })
  usuario?: string;
  @IsOptional()
  @ApiProperty({ required: false })
  @MaxLength(4)
  usuarioOperador?: string;
  @IsOptional()
  @ApiProperty({ required: false })
  fecha?: string;
  @IsOptional()
  @ApiProperty({ required: false })
  @MaxLength(4)
  fechaOperador?: string;
  @IsOptional()
  @ApiProperty({ required: false })
  porcentaje?: string;
  @IsOptional()
  @ApiProperty({ required: false })
  @MaxLength(4)
  porcentajeOperador?: string;
}
