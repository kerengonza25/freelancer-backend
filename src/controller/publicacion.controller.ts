import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PublicacionService } from '../services/publicacion.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CrearPublicacionDTO } from 'src/dto/create-publicacion.dto';
import { ActualizarPublicacionDTO } from 'src/dto/update-publicacion.dto';
import {
  FilterOperator,
  FilterSuffix,
  PaginateQuery,
  PaginatedSwaggerDocs,
} from 'nestjs-paginate';
import { Publicacion } from 'src/model/publicacion.entity';

@Controller('/api/v1/publicaciones')
@ApiBearerAuth()
@ApiTags('Publicaciones')
export class PublicacionController {
  constructor(private publicacionService: PublicacionService) {}

  @Get()
  @Header('content-type', 'application/json')
  public getPublicacions() {
    return this.publicacionService.findAll();
  }

  @Get('search')
  @Header('content-type', 'application/json')
  @PaginatedSwaggerDocs(Publicacion, {
    sortableColumns: ['id', 'titulo'],
  })
  public async searchPublicacions(@Query() query: PaginateQuery) {
    return this.publicacionService.paginate(
      {
        defaultSortBy: [['titulo', 'ASC']],
        searchableColumns: ['titulo'],
        sortableColumns: ['id', 'titulo'],
        filterableColumns: {
          titulo: [FilterOperator.EQ, FilterSuffix.NOT, FilterOperator.ILIKE],
        },
      },
      query,
    );
  }

  @Get(':id')
  @Header('content-type', 'application/json')
  public async getPublicacion(@Param('id') id: string) {
    const publicacion = await this.publicacionService.findOne(id);

    if (!publicacion) {
      throw new NotFoundException(`Publicacion con id: ${id} no encontrado`);
    }

    return publicacion;
  }

  @Post()
  @Header('content-type', 'application/json')
  public createPublicacion(@Body() crearPublicacion: CrearPublicacionDTO) {
    return this.publicacionService.create(crearPublicacion);
  }

  @Put(':id')
  @Header('content-type', 'application/json')
  public async updatePublicacion(
    @Param('id') id: string,
    @Body() actualizarPublicacion: ActualizarPublicacionDTO,
  ) {
    const publicacion = await this.publicacionService.findOne(id);

    if (!publicacion) {
      throw new NotFoundException(`Publicacion con id: ${id} no encontrado`);
    }

    return this.publicacionService
      .update(id, actualizarPublicacion)
      .catch((error) => {
        throw new NotFoundException(error.message);
      });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public deletePublicacion(@Param('id') id: string) {
    this.publicacionService.delete(id);
  }
}
