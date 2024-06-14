import { Injectable } from '@nestjs/common';
import { Trabajo } from 'src/model/trabajo.entity';
import {
  LessThan,
  LessThanOrEqual,
  Like,
  MoreThan,
  MoreThanOrEqual,
} from 'typeorm';
import { BaseService } from './base.service';
import { QueryTrabajoDTO } from 'src/dto/query-trabajo.dto';

@Injectable()
export class TrabajoService extends BaseService(Trabajo) {
  async searchBy(query: QueryTrabajoDTO): Promise<Trabajo[]> {
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

    if (query.fechaInicio) {
      switch (query.fechaInicioOperator) {
        case 'lt':
          where['fechaInicio'] = LessThan(query.fechaInicio);
          break;
        case 'lte':
          where['fechaInicio'] = LessThanOrEqual(query.fechaInicio);
          break;
        case 'gt':
          where['fechaInicio'] = MoreThan(query.fechaInicio);
          break;
        case 'gte':
          where['fechaInicio'] = MoreThanOrEqual(query.fechaInicio);
          break;
        case 'eq':
          where['fechaInicio'] = query.fechaInicio;
          break;
        default:
          where['fechaInicio'] = query.fechaInicio;
          break;
      }
    }

    if (query.fechaFin) {
      switch (query.fechaFinOperator) {
        case 'lt':
          where['fechaFin'] = LessThan(query.fechaFin);
          break;
        case 'lte':
          where['fechaFin'] = LessThanOrEqual(query.fechaFin);
          break;
        case 'gt':
          where['fechaFin'] = MoreThan(query.fechaFin);
          break;
        case 'gte':
          where['fechaFin'] = MoreThanOrEqual(query.fechaFin);
          break;
        case 'eq':
          where['fechaFin'] = query.fechaFin;
          break;
        default:
          where['fechaFin'] = query.fechaFin;
          break;
      }
    }

    if (query.salario) {
      switch (query.salarioOperator) {
        case 'lt':
          where['salario'] = LessThan(query.salario);
          break;
        case 'lte':
          where['salario'] = LessThanOrEqual(query.salario);
          break;
        case 'gt':
          where['salario'] = MoreThan(query.salario);
          break;
        case 'gte':
          where['salario'] = MoreThanOrEqual(query.salario);
          break;
        case 'eq':
          where['salario'] = query.salario;
          break;
        default:
          where['salario'] = query.salario;
          break;
      }
    }

    if (query.salarioPorHora) {
      switch (query.salarioPorHoraOperator) {
        case 'lt':
          where['salarioPorHora'] = LessThan(query.salarioPorHora);
          break;
        case 'lte':
          where['salarioPorHora'] = LessThanOrEqual(query.salarioPorHora);
          break;
        case 'gt':
          where['salarioPorHora'] = MoreThan(query.salarioPorHora);
          break;
        case 'gte':
          where['salarioPorHora'] = MoreThanOrEqual(query.salarioPorHora);
          break;
        case 'eq':
          where['salarioPorHora'] = query.salarioPorHora;
          break;
        default:
          where['salarioPorHora'] = query.salarioPorHora;
          break;
      }
    }

    if (query.autor) {
      switch (query.autorOperator) {
        case 'like':
          where['autor.id'] = Like(`%${query.autor}%`);
          break;
        case 'eq':
          where['autor.id'] = query.autor;
          break;
        default:
          where['autor.id'] = query.autor;
          break;
      }
    }

    return this.repository.find({ where });
  }
}
