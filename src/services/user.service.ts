import { Injectable } from '@nestjs/common';
import { User } from 'src/model/user.entity';
import { BaseService } from './base.service';
import { QueryUserDTO } from 'src/dto/query-user.dto';
import { Like } from 'typeorm';

@Injectable()
export class UserService extends BaseService(User) {
  async searchBy(query: QueryUserDTO): Promise<User[]> {
    const where = {};
    if (query.firstName) {
      switch (query.firstNameOperator) {
        case 'like':
          where['firstName'] = Like(`%${query.firstName}%`);
          break;
        case 'eq':
          where['firstName'] = query.firstName;
          break;
        default:
          where['firstName'] = query.firstName;
          break;
      }
    }
    if (query.lastName) {
      switch (query.lastNameOperator) {
        case 'like':
          where['lastName'] = Like(`%${query.lastName}%`);
          break;
        case 'eq':
          where['lastName'] = query.lastName;
          break;
        default:
          where['lastName'] = query.lastName;
          break;
      }
    }
    if (query.email) {
      switch (query.emailOperator) {
        case 'like':
          where['email'] = Like(`%${query.email}%`);
          break;
        case 'eq':
          where['email'] = query.email;
          break;
        default:
          where['email'] = query.email;
          break;
      }
    }
    if (query.role) {
      switch (query.roleOperator) {
        case 'like':
          where['role'] = Like(`%${query.role}%`);
          break;
        case 'eq':
          where['role'] = query.role;
          break;
        default:
          where['role'] = query.role;
          break;
      }
    }
    if (query.telefono) {
      switch (query.telefonoOperator) {
        case 'like':
          where['telefono'] = Like(`%${query.telefono}%`);
          break;
        case 'eq':
          where['telefono'] = query.telefono;
          break;
        default:
          where['telefono'] = query.telefono;
          break;
      }
    }
    if (query.ciudad) {
      switch (query.ciudadOperator) {
        case 'like':
          where['ciudad'] = Like(`%${query.ciudad}%`);
          break;
        case 'eq':
          where['ciudad'] = query.ciudad;
          break;
        default:
          where['ciudad'] = query.ciudad;
          break;
      }
    }
    if (query.pais) {
      switch (query.paisOperator) {
        case 'like':
          where['pais'] = Like(`%${query.pais}%`);
          break;
        case 'eq':
          where['pais'] = query.pais;
          break;
        default:
          where['pais'] = query.pais;
          break;
      }
    }

    return this.repository.find({ where });
  }
}
