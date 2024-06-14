import { Entity, Column, OneToMany } from 'typeorm';
import { Skill } from './skill.entity';
import { BaseEntity } from './base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class CategoriaSkills extends BaseEntity {
  @Column()
  @ApiProperty()
  nombre: string;

  @Column()
  @ApiProperty()
  descripcion: string;

  @OneToMany(() => Skill, (skill) => skill.categoria)
  @ApiProperty()
  skills: Skill[];
}
