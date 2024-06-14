import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Skill } from './skill.entity';
import { Profesion } from './profesion.entity';
import { User } from './user.entity';
import { Publicacion } from './publicacion.entity';
import { Trabajo } from './trabajo.entity';
import { Avance } from './avance.entity';
import { BaseEntity } from './base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class FreelancerData extends BaseEntity {
  @OneToOne(() => User, (user) => user.freelancer)
  @ApiProperty({ type: () => User })
  usuario: User;

  @ManyToOne(() => Profesion, (profesion) => profesion.usuarios, {
    cascade: false,
    eager: true,
  })
  @ApiProperty({ type: () => Profesion })
  profesion: Profesion;

  @Column({ length: 100 })
  @ApiProperty()
  especialidad: string;

  @Column({ length: 255, nullable: true })
  @ApiProperty()
  web: string;

  @Column('text', { nullable: true })
  @ApiProperty()
  descripcion: string;

  @Column('text', { nullable: true })
  @ApiProperty()
  curriculum: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @ApiProperty()
  price: number;

  @ManyToMany(() => Skill, { eager: true })
  @ApiProperty({ type: () => Skill, isArray: true })
  @JoinTable()
  skills: Skill[];

  @Column({ name: 'num_proyectos' })
  @ApiProperty()
  numProyectos: number;

  @Column({ name: 'num_valoraciones' })
  @ApiProperty()
  numValoraciones: number;

  @Column({ name: 'valoracion_media' })
  @ApiProperty()
  valoracionMedia: number;

  @Column({ name: 'num_valoraciones_negativas' })
  @ApiProperty()
  numValoracionesNegativas: number;

  @Column({ name: 'num_valoraciones_positivas' })
  @ApiProperty()
  numValoracionesPositivas: number;

  @ManyToMany(() => Publicacion, (publicacion) => publicacion.aplicaciones)
  @JoinTable()
  @ApiProperty({ type: () => Publicacion, isArray: true })
  aplicaciones: Publicacion[];

  /*
  @ManyToMany(() => Trabajo, (trabajo) => trabajo.trabajadores)
  @ApiProperty({ type: () => Trabajo, isArray: true })
  trabajos: Trabajo[];
  */

  @ManyToMany(() => Avance, (avance) => avance.usuario)
  @ApiProperty({ type: () => Avance, isArray: true })
  avances: Avance[];
}
