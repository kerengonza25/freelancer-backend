import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

export class CrearImagenPublicacionDTO {
  @ApiProperty({ required: true })
  @IsDefined()
  @IsString()
  publicacion: string;

  @ApiProperty({ type: 'string', format: 'binary', required: true })
  file: Express.Multer.File;
}
