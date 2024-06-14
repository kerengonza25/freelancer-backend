import { ApiProperty } from '@nestjs/swagger';
import { Avance } from 'src/model/avance.entity';

export class UpdateDocumentoDto {
  @ApiProperty()
  readonly nombre?: string;
  @ApiProperty()
  readonly url?: string;
  @ApiProperty()
  readonly avance?: Avance;
}
