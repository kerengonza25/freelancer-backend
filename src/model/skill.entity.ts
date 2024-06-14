import { Entity, Column, ManyToOne, JoinTable } from 'typeorm';
import { CategoriaSkills } from './categoria-skill.entity';
import { BaseEntity } from './base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Skill extends BaseEntity {
  @Column()
  @ApiProperty()
  nombre: string;

  @ApiProperty({ type: () => CategoriaSkills })
  @ManyToOne(() => CategoriaSkills, (categoria) => categoria.skills, {
    eager: true,
  })
  @JoinTable()
  categoria: CategoriaSkills;
}
