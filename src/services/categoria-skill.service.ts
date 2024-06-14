import { Injectable } from '@nestjs/common';
import { CategoriaSkills } from 'src/model/categoria-skill.entity';
import { Like } from 'typeorm';
import { BaseService } from './base.service';
import { QueryCategoriaSkillDTO } from 'src/dto/query-categoria-skill.dto';

@Injectable()
export class CategoriaSkillsService extends BaseService(CategoriaSkills) {
  async searchBy(query: QueryCategoriaSkillDTO): Promise<CategoriaSkills[]> {
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
