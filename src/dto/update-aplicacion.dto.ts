import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';
import { Publicacion } from 'src/model/publicacion.entity';
import { User } from 'src/model/user.entity';

export class ActualizarAplicacionDTO {
  @IsOptional()
  @ApiProperty()
  usuario?: User;

  @IsOptional()
  @ApiProperty()
  publicacion?: Publicacion;

  @IsString()
  @IsOptional()
  @ApiProperty()
  mensaje?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  estado?: string;
}
