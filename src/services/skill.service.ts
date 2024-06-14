import { Injectable } from '@nestjs/common';
import { Skill } from 'src/model/skill.entity';
import { Like } from 'typeorm';
import { BaseService } from './base.service';
import { QuerySkillDTO } from 'src/dto/query-skill.dto';

@Injectable()
export class SkillService extends BaseService(Skill) {
  async searchBy(query: QuerySkillDTO): Promise<Skill[]> {
    const where = {};
    if (query.nombre) {
      switch (query.nombreOperator) {
        case 'like':
          where['nombre'] = Like(`%${query.nombre}%`);
          break;
        case 'eq':
          where['nombre'] = query.nombre;
          break;
        default:
          where['nombre'] = query.nombre;
          break;
      }
    }
    return this.repository.find({ where });
  }
}
