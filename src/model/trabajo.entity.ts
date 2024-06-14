import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Publicacion } from './publicacion.entity';
import { User } from './user.entity';
import { Avance } from './avance.entity';
import { BaseEntity } from './base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Trabajo extends BaseEntity {
  @Column()
  @ApiProperty()
  titulo: string;

  @Column()
  @ApiProperty()
  descripcion: string;

  @Column()
  @ApiProperty()
  fechaInicio: Date;

  @Column()
  @ApiProperty()
  fechaFin: Date;

  @Column()
  @ApiProperty()
  salario: number;

  @Column({ default: false })
  @ApiProperty()
  salarioPorHora: boolean;

  @OneToOne(() => Publicacion, (publicacion) => publicacion.trabajo, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  @ApiProperty({ type: () => Publicacion })
  publicacion: Publicacion;

  @ManyToOne(() => User, (usuario) => usuario.reclutador.trabajos)
  @JoinTable()
  autor: User;

  @ManyToMany(() => User, {
    eager: true,
  })
  @ApiProperty({ type: User, isArray: true })
  @JoinTable()
  trabajadores: User[];

  @OneToMany(() => Avance, (avance) => avance.trabajo, { eager: true })
  @ApiProperty({ type: Avance, isArray: true })
  avances: Avance[];
}
