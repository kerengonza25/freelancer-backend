import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { FreelancerData } from './freelancer-data.entity';
import { ReclutadorData } from './reclutador-data.entity';
import { BaseEntity } from './base.entity';
import { Aplicacion } from './aplicacion.entity';
import { ApiProperty } from '@nestjs/swagger';

export enum UserRole {
  ADMIN = 'admin',
  EDITOR = 'editor',
  USER = 'user',
  FREELANCER = 'freelancer',
  RECRUITER = 'recruiter',
}

@Entity()
export class User extends BaseEntity {
  @Column({
    nullable: false,
  })
  @ApiProperty()
  firstName: string;

  @Column({
    nullable: false,
  })
  @ApiProperty()
  lastName: string;

  @Column({ unique: true })
  @ApiProperty()
  email: string;

  @Column()
  @ApiProperty()
  password: string;

  @Column({
    nullable: true,
  })
  @ApiProperty()
  imagen: string;

  @Column({
    length: 100,
    nullable: true,
  })
  @ApiProperty()
  telefono: string;

  @Column({
    length: 100,
    nullable: true,
  })
  @ApiProperty()
  direccion: string;

  @Column({
    length: 100,
    nullable: true,
  })
  @ApiProperty()
  ciudad: string;

  @Column({
    length: 100,
    nullable: true,
  })
  @ApiProperty()
  pais: string;

  @Column({
    default: false,
  })
  @ApiProperty()
  isVerified: boolean;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  @ApiProperty()
  role: UserRole;

  @OneToOne(() => FreelancerData, (freelancer) => freelancer.usuario, {
    nullable: true,
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  @ApiProperty()
  freelancer: FreelancerData;

  @OneToOne(() => ReclutadorData, (reclutador) => reclutador.usuario, {
    nullable: true,
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  @ApiProperty()
  reclutador: ReclutadorData;

  @OneToMany(() => Aplicacion, (aplicacion) => aplicacion.usuario, {
    eager: true,
  })
  @ApiProperty()
  aplicaciones: Aplicacion[];
}
