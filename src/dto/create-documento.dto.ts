import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

export class CreateDocumentoDTO {
  @ApiProperty({ required: true })
  @IsDefined()
  @IsString()
  avance: string;

  @ApiProperty({ type: 'string', format: 'binary', required: true })
  file: Express.Multer.File;
}
