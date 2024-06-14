import { Injectable } from '@nestjs/common';
import { Publicacion } from 'src/model/publicacion.entity';
import {
  LessThan,
  LessThanOrEqual,
  Like,
  MoreThan,
  MoreThanOrEqual,
} from 'typeorm';
import { BaseService } from './base.service';
import { QueryPublicacionDTO } from 'src/dto/query-publicacion.dto';

@Injectable()
export class PublicacionService extends BaseService(Publicacion) {
  async searchBy(query: QueryPublicacionDTO): Promise<Publicacion[]> {
    const where = {};
    if (query.titulo) {
      switch (query.tituloOperator) {
        case 'like':
          where['titulo'] = Like(`%${query.titulo}%`);
          break;
        case 'eq':
          where['titulo'] = query.titulo;
          break;
        default:
          where['titulo'] = query.titulo;
          break;
      }
    }

    if (query.fechaCreacion) {
      switch (query.fechaCreacionOperator) {
        case 'lt':
          where['fechaCreacion'] = LessThan(query.fechaCreacion);
          break;
        case 'lte':
          where['fechaCreacion'] = LessThanOrEqual(query.fechaCreacion);
          break;
        case 'gt':
          where['fechaCreacion'] = MoreThan(query.fechaCreacion);
          break;
        case 'gte':
          where['fechaCreacion'] = MoreThanOrEqual(query.fechaCreacion);
          break;
        case 'eq':
          where['fechaCreacion'] = query.fechaCreacion;
          break;
        default:
          where['fechaCreacion'] = query.fechaCreacion;
          break;
      }
    }
    return this.repository.find({ where });
  }
}
