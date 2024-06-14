import {
  Entity,
  Column,
  OneToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Trabajo } from './trabajo.entity';
import { PublicacionImagenes } from './imagenes-publicacion.entity';
import { BaseEntity } from './base.entity';
import { Aplicacion } from './aplicacion.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Publicacion extends BaseEntity {
  @Column()
  @ApiProperty()
  titulo: string;

  @Column({ type: 'longtext' })
  @ApiProperty()
  contenido: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  fechaCreacion: Date;

  @OneToOne(() => Trabajo, (trabajo) => trabajo.publicacion)
  @ApiProperty({ type: () => Trabajo })
  trabajo: Trabajo;

  @Column()
  @ApiProperty()
  fechaFin: Date;

  @OneToMany(() => PublicacionImagenes, (imagenes) => imagenes.publicacion, {
    eager: true,
  })
  @ApiProperty({
    type: PublicacionImagenes,
    isArray: true,
  })
  imagenes: PublicacionImagenes[];

  @ManyToMany(() => Aplicacion, {
    eager: true,
  })
  @JoinTable()
  @ApiProperty({
    type: Aplicacion,
    isArray: true,
  })
  aplicaciones: Aplicacion[];
}
