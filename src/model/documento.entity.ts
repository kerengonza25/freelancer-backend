import { Entity, Column, ManyToOne } from 'typeorm';
import { Avance } from './avance.entity';
import { BaseEntity } from './base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Documento extends BaseEntity {
  @Column()
  @ApiProperty()
  nombre: string;

  @Column()
  @ApiProperty()
  url: string;

  @Column()
  @ApiProperty()
  tipo: string;

  @ManyToOne(() => Avance, (avance) => avance.documentos)
  @ApiProperty({ type: () => Avance })
  avance: Avance;
}
