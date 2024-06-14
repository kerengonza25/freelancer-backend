import { Entity, Column, OneToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Trabajo } from './trabajo.entity';
import { BaseEntity } from './base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class ReclutadorData extends BaseEntity {
  @OneToOne(() => User, (user) => user.reclutador)
  @ApiProperty({ type: () => User })
  usuario: User;

  @Column({ length: 100 })
  @ApiProperty()
  nombreEmpresa: string;

  @Column({ name: 'num_colaboradores' })
  @ApiProperty()
  numColaboradores: number;

  @Column({ length: 255, nullable: true })
  @ApiProperty()
  web: string;

  @Column('text', { nullable: true })
  @ApiProperty()
  descripcion: string;

  @Column('text', { nullable: true })
  @ApiProperty()
  logo: string;

  @Column({ name: 'num_publicaciones' })
  @ApiProperty()
  numPublicaciones: number;

  @OneToMany(() => Trabajo, (trabajo) => trabajo.autor)
  @ApiProperty({
    type: Trabajo,
    isArray: true,
  })
  trabajos: Trabajo[];
}
