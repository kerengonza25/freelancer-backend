import { ApiProperty } from '@nestjs/swagger';
import { Column, PrimaryGeneratedColumn, VersionColumn } from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @VersionColumn()
  @ApiProperty()
  @Column({ select: false })
  version: number;
}
