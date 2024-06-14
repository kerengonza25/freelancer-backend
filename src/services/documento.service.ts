import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { copyFileSync, unlinkSync } from 'fs';
import { Documento } from 'src/model/documento.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DocumentoService {
  constructor(
    @InjectRepository(Documento)
    private documentoRepository: Repository<Documento>,
  ) {}

  create(documento: Documento): Promise<Documento> {
    return this.documentoRepository.save(documento);
  }

  findAll(): Promise<Documento[]> {
    return this.documentoRepository.find();
  }

  findOne(id: string): Promise<Documento> {
    return this.documentoRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    const documento = await this.documentoRepository.findOneBy({ id });

    if (!documento) {
      return;
    }

    unlinkSync(documento.url);

    await this.documentoRepository.delete(id);
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    copyFileSync(file.path, `./uploads/${file.originalname}`);

    return `./uploads/${file.originalname}`;
  }
}
