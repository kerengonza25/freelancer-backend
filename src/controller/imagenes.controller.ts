import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { PublicacionImagenesService } from '../services/imagen.service';
import { CrearImagenPublicacionDTO } from 'src/dto/create-imagen.dto';
import { PublicacionImagenes } from 'src/model/imagenes-publicacion.entity';
import { PublicacionService } from '../services/publicacion.service';

@Controller('/api/v1/imagenes')
@ApiBearerAuth()
@ApiTags('Imagenes')
export class ImagenController {
  constructor(
    private readonly imagenService: PublicacionImagenesService,
    private readonly publicacionService: PublicacionService,
  ) {}

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(
    @Body() data: CrearImagenPublicacionDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(file);
    const imagenData = new PublicacionImagenes();
    imagenData.publicacion = await this.publicacionService.findOne(
      data.publicacion,
    );
    imagenData.nombre = file.originalname;
    imagenData.tipo = file.originalname.split('.').pop();
    imagenData.url = file.path;

    return this.imagenService.create(imagenData);
  }

  @Get()
  findAll() {
    return this.imagenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imagenService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imagenService.remove(id);
  }
}
