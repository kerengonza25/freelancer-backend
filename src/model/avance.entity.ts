import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { Trabajo } from './trabajo.entity';
import { User } from './user.entity';
import { Documento } from './documento.entity';
import { BaseEntity } from './base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Avance extends BaseEntity {
  @Column()
  @ApiProperty()
  descripcion: string;

  @Column({
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    type: 'timestamp',
  })
  @ApiProperty()
  fecha: Date;

  @ManyToOne(() => Trabajo, (trabajo) => trabajo.avances)
  @ApiProperty({ type: () => Trabajo })
  trabajo: Trabajo;

  @ManyToOne(() => User, (usuario) => usuario.freelancer.avances, {
    eager: true,
  })
  @ApiProperty({ type: () => User })
  usuario: User;

  @Column()
  @ApiProperty()
  porcentaje: number;

  @Column()
  @ApiProperty()
  estado: string;

  @Column()
  @ApiProperty()
  horas: number;

  @OneToMany(() => Documento, (documento) => documento.avance)
  @ApiProperty({
    type: Documento,
    isArray: true,
  })
  documentos: Documento[];
}
