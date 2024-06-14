import { Entity, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Publicacion } from './publicacion.entity';
import { BaseEntity } from './base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Aplicacion extends BaseEntity {
  @ManyToOne(() => User, (usuario) => usuario.aplicaciones, {
    eager: false,
  })
  @ApiProperty({ type: () => User })
  usuario: User;

  @ManyToOne(() => Publicacion, (publicacion) => publicacion.aplicaciones)
  @ApiProperty({ type: () => Publicacion })
  publicacion: Publicacion;

  @Column()
  @ApiProperty()
  mensaje: string;

  @Column({ nullable: false, default: 'Aplicado' })
  @ApiProperty()
  estado: string;
}
