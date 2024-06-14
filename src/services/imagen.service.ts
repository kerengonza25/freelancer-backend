import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PublicacionImagenes } from 'src/model/imagenes-publicacion.entity';
import { copyFileSync, unlinkSync } from 'fs';

@Injectable()
export class PublicacionImagenesService {
  constructor(
    @InjectRepository(PublicacionImagenes)
    private publicacionimagenesRepository: Repository<PublicacionImagenes>,
  ) {}

  create(
    publicacionimagenes: PublicacionImagenes,
  ): Promise<PublicacionImagenes> {
    return this.publicacionimagenesRepository.save(publicacionimagenes);
  }

  findAll(): Promise<PublicacionImagenes[]> {
    return this.publicacionimagenesRepository.find();
  }

  findOne(id: string): Promise<PublicacionImagenes> {
    return this.publicacionimagenesRepository.findOneBy({ id });
  }

  public async remove(id: string): Promise<void> {
    const publicacionimagenes =
      await this.publicacionimagenesRepository.findOneBy({ id });

    if (!publicacionimagenes) {
      return;
    }

    unlinkSync(publicacionimagenes.url);

    await this.publicacionimagenesRepository.delete(id);
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    copyFileSync(file.buffer.toString(), `./uploads/${file.originalname}`);

    return `./uploads/${file.originalname}`;
  }
}
