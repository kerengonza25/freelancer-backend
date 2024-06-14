import { Entity, Column, ManyToOne } from 'typeorm';
import { Publicacion } from './publicacion.entity';
import { BaseEntity } from './base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class PublicacionImagenes extends BaseEntity {
  @Column()
  @ApiProperty()
  url: string;

  @Column()
  @ApiProperty()
  nombre: string;

  @Column()
  @ApiProperty()
  tipo: string;

  @ManyToOne(() => Publicacion, (publicacion) => publicacion.imagenes)
  @ApiProperty({ type: () => Publicacion })
  publicacion: Publicacion;
}
