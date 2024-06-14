import { Injectable } from '@nestjs/common';
import { Profesion } from 'src/model/profesion.entity';
import { Like } from 'typeorm';
import { BaseService } from './base.service';
import { QueryProfesionDTO } from 'src/dto/query-profesion.dto';

@Injectable()
export class ProfesionService extends BaseService(Profesion) {
  async searchBy(query: QueryProfesionDTO): Promise<Profesion[]> {
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
