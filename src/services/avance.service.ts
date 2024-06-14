import { Injectable } from '@nestjs/common';
import { Avance } from 'src/model/avance.entity';
import {
  Equal,
  LessThan,
  LessThanOrEqual,
  Like,
  MoreThan,
  MoreThanOrEqual,
} from 'typeorm';
import { BaseService } from './base.service';
import { AvanceSearchQuery } from 'src/dto/query-avance.dto';

@Injectable()
export class AvanceService extends BaseService(Avance) {
  async searchBy(avanceSearchQuery: AvanceSearchQuery): Promise<Avance[]> {
    const where = {};
    if (avanceSearchQuery.trabajo) {
      switch (avanceSearchQuery.trabajoOperador) {
        case 'like':
          where['trabajo'] = Like(`%${avanceSearchQuery.trabajo}%`);
          break;
        case 'eq':
          where['trabajo'] = avanceSearchQuery.trabajo;
          break;
        default:
          where['trabajo'] = avanceSearchQuery.trabajo;
          break;
      }
    }
    if (avanceSearchQuery.estado) {
      switch (avanceSearchQuery.estadoOperador) {
        case 'like':
          where['estado'] = Like(`%${avanceSearchQuery.estado}%`);
          break;
        case 'eq':
          where['estado'] = avanceSearchQuery.estado;
          break;
        default:
          where['estado'] = avanceSearchQuery.estado;
          break;
      }
    }
    if (avanceSearchQuery.usuario) {
      switch (avanceSearchQuery.usuarioOperador) {
        case 'like':
          where['usuario'] = Like(`%${avanceSearchQuery.usuario}%`);
          break;
        case 'eq':
          where['usuario'] = avanceSearchQuery.usuario;
          break;
        default:
          where['usuario'] = avanceSearchQuery.usuario;
          break;
      }
    }
    if (avanceSearchQuery.fecha) {
      switch (avanceSearchQuery.fechaOperador) {
        case 'lt':
          where['fecha'] = LessThan(this.parseDate(avanceSearchQuery.fecha));
          break;
        case 'lte':
          where['fecha'] = LessThanOrEqual(
            this.parseDate(avanceSearchQuery.fecha),
          );
          break;
        case 'gt':
          where['fecha'] = MoreThan(this.parseDate(avanceSearchQuery.fecha));
          break;
        case 'gte':
          where['fecha'] = MoreThanOrEqual(
            this.parseDate(avanceSearchQuery.fecha),
          );
          break;
        case 'eq':
          where['fecha'] = Equal(this.parseDate(avanceSearchQuery.fecha));
          break;
        default:
          where['fecha'] = Equal(this.parseDate(avanceSearchQuery.fecha));
          break;
      }
    }
    if (avanceSearchQuery.porcentaje) {
      switch (avanceSearchQuery.porcentajeOperador) {
        case 'lt':
          where['porcentaje'] = LessThan(
            this.parseNumber(avanceSearchQuery.porcentaje),
          );
          break;
        case 'lte':
          where['porcentaje'] = LessThanOrEqual(
            this.parseNumber(avanceSearchQuery.porcentaje),
          );
          break;
        case 'gt':
          where['porcentaje'] = MoreThan(
            this.parseNumber(avanceSearchQuery.porcentaje),
          );
          break;
        case 'gte':
          where['porcentaje'] = MoreThanOrEqual(
            this.parseNumber(avanceSearchQuery.porcentaje),
          );
          break;
        case 'eq':
          where['porcentaje'] = Equal(
            this.parseNumber(avanceSearchQuery.porcentaje),
          );
          break;
        default:
          where['porcentaje'] = Equal(
            this.parseNumber(avanceSearchQuery.porcentaje),
          );
      }
    }

    return this.repository.find({ where });
  }

  private parseDate(date: string): Date {
    if (!date) {
      return null;
    }

    return new Date(date);
  }

  private parseNumber(number: string): number {
    if (!number) {
      return null;
    }

    return parseInt(number);
  }
}
