import { Type } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  PaginateConfig,
  PaginateQuery,
  Paginated,
  paginate,
} from 'nestjs-paginate';
import { Repository } from 'typeorm';

export interface IDataService<T> {
  readonly repository: Repository<T>;
  entityName: string;
  findOne: (id: string) => Promise<T>;
  findAll: () => Promise<T[]>;
  create: (entity: Partial<T>) => Promise<T>;
  update: (id: string, entity: Partial<T>) => Promise<T>;
  delete: (id: string) => Promise<void>;
  paginate: (
    paginateConfig: PaginateConfig<T>,
    findOptions?: PaginateQuery,
  ) => Promise<Paginated<T>>;
}

type Constructor<I> = new (...args: any[]) => I; // Main Point

export function BaseService<T>(entity: Constructor<T>): Type<IDataService<T>> {
  class BaseServiceHost implements IDataService<T> {
    constructor(
      @InjectRepository(entity) public readonly repository: Repository<T>,
    ) {}
    entityName: string;

    public async findOne(id: string): Promise<T> {
      return this.repository.findOneBy({ id } as any);
    }

    public async findAll(): Promise<T[]> {
      return this.repository.find();
    }

    public async create(entity: Partial<T>): Promise<T> {
      const newEntity = this.repository.create(entity as any);
      return this.repository.save(newEntity) as Promise<T>;
    }

    public async update(id: string, entity: Partial<T>): Promise<T> {
      try {
        await this.repository.update(id, entity as any);
      } catch (error) {
        entity = this.repository.merge(await this.findOne(id), entity as any);
        await this.create(entity);
      }
      return this.findOne(id) as Promise<T>;
    }

    public async delete(id: string): Promise<void> {
      const existingEntity = await this.findOne(id);
      await this.repository.remove(existingEntity);
    }

    public async paginate(
      paginateConfig: PaginateConfig<T>,
      findOptions?: PaginateQuery,
    ): Promise<Paginated<T>> {
      return paginate<T>(findOptions, this.repository, paginateConfig);
    }
  }
  return BaseServiceHost;
}
