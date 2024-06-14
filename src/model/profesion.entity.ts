import { Entity, Column, OneToMany } from 'typeorm';
import { FreelancerData } from './freelancer-data.entity';
import { BaseEntity } from './base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Profesion extends BaseEntity {
  @Column()
  @ApiProperty()
  nombre: string;

  @OneToMany(() => FreelancerData, (usuario) => usuario.profesion)
  @ApiProperty({
    type: FreelancerData,
    isArray: true,
  })
  usuarios: FreelancerData[];
}
