import { Injectable } from '@nestjs/common';
import { Aplicacion } from 'src/model/aplicacion.entity';
import { Like } from 'typeorm';
import { BaseService } from './base.service';
import { QueryAplicacionDTO } from 'src/dto/query-aplication.dto';

@Injectable()
export class AplicacionService extends BaseService(Aplicacion) {
  async searchBy(query: QueryAplicacionDTO): Promise<Aplicacion[]> {
    const where = {};
    if (query.usuario) {
      switch (query.usuarioOperator) {
        case 'like':
          where['usuario.id'] = Like(`%${query.usuario}%`);
          break;
        case 'eq':
          where['usuario.id'] = query.usuario;
          break;
        default:
          where['usuario.id'] = query.usuario;
          break;
      }
    }

    if (query.publicacion) {
      switch (query.publicacionOperator) {
        case 'like':
          where['publicacion.id'] = Like(`%${query.publicacion}%`);
          break;
        case 'eq':
          where['publicacion.id'] = query.publicacion;
          break;
        default:
          where['publicacion.id'] = query.publicacion;
          break;
      }
    }

    if (query.estado) {
      switch (query.estadoOperator) {
        case 'like':
          where['estado'] = Like(`%${query.estado}%`);
          break;
        case 'eq':
          where['estado'] = query.estado;
          break;
        default:
          where['estado'] = query.estado;
          break;
      }
    }

    return this.repository.find({ where });
  }
}
