import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TrabajoService } from '../services/trabajo.service';
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
import { CrearTrabajoDTO } from 'src/dto/create-trabajo.dto';
import { ActualizarTrabajoDTO } from 'src/dto/update-trabajo.dto';
import {
  FilterOperator,
  FilterSuffix,
  PaginateQuery,
  PaginatedSwaggerDocs,
} from 'nestjs-paginate';
import { Trabajo } from 'src/model/trabajo.entity';

@Controller('/api/v1/trabajos')
@ApiBearerAuth()
@ApiTags('Trabajos')
export class TrabajoController {
  constructor(private trabajoService: TrabajoService) {}

  @Get()
  @Header('content-type', 'application/json')
  public getTrabajos() {
    return this.trabajoService.findAll();
  }

  @Get('search')
  @Header('content-type', 'application/json')
  @PaginatedSwaggerDocs(Trabajo, {
    sortableColumns: [
      'id',
      'nombre',
      'descripcion',
      'fechaInicio',
      'fechaFin',
      'salario',
      'salarioPorHora',
    ],
  })
  public async searchTrabajos(@Query() query: PaginateQuery) {
    return this.trabajoService.paginate(
      {
        defaultSortBy: [['fechaInicio', 'DESC']],
        searchableColumns: ['titulo', 'salario', 'salarioPorHora'],
        sortableColumns: [
          'titulo',
          'salario',
          'salarioPorHora',
          'fechaInicio',
          'fechaFin',
        ],
        filterableColumns: {
          titulo: [FilterOperator.EQ, FilterSuffix.NOT, FilterOperator.ILIKE],
          salario: [FilterOperator.EQ, FilterOperator.GTE, FilterOperator.LTE],
          salarioPorHora: [FilterOperator.EQ],
          fechaInicio: [FilterOperator.GTE, FilterOperator.LTE],
          fechaFin: [FilterOperator.GTE, FilterOperator.LTE],
        },
      },
      query,
    );
  }

  @Get(':id')
  @Header('content-type', 'application/json')
  public async getTrabajo(@Param('id') id: string) {
    const trabajo = await this.trabajoService.findOne(id);

    if (!trabajo) {
      throw new NotFoundException(`Trabajo con id: ${id} no encontrado`);
    }

    return trabajo;
  }

  @Post()
  @Header('content-type', 'application/json')
  public createTrabajo(@Body() crearTrabajo: CrearTrabajoDTO) {
    return this.trabajoService.create(crearTrabajo);
  }

  @Put(':id')
  @Header('content-type', 'application/json')
  public async updateTrabajo(
    @Param('id') id: string,
    @Body() actualizarTrabajo: ActualizarTrabajoDTO,
  ) {
    const trabajo = await this.trabajoService.findOne(id);

    if (!trabajo) {
      throw new NotFoundException(`Trabajo con id: ${id} no encontrado`);
    }

    return this.trabajoService.update(id, actualizarTrabajo).catch((error) => {
      console.error(error);
      throw new NotFoundException(error.message);
    });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public deleteTrabajo(@Param('id') id: string) {
    this.trabajoService.delete(id);
  }
}
