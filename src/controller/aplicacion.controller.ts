import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AplicacionService } from '../services/aplicacion.service';
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
import { CrearAplicacionDTO } from 'src/dto/create-aplicacion.dto';
import { QueryAplicacionDTO } from 'src/dto/query-aplication.dto';
import { ActualizarAplicacionDTO } from 'src/dto/update-aplicacion.dto';

@Controller('/api/v1/aplicaciones')
@ApiBearerAuth()
@ApiTags('Aplicaciones a empleo')
export class AplicacionController {
  constructor(private aplicacionService: AplicacionService) {}

  @Get()
  @Header('content-type', 'application/json')
  public getAplicacions() {
    return this.aplicacionService.findAll();
  }

  @Get('search')
  @Header('content-type', 'application/json')
  @ApiQuery({ type: QueryAplicacionDTO })
  public async searchAplicacions(@Query() query: QueryAplicacionDTO) {
    return {
      aplicacions: await this.aplicacionService.searchBy(query),
      query,
    };
  }

  /*
  @Get('search2')
  @Header('content-type', 'application/json')
  @ApiQuery({ type: QueryAplicacionDTO })
  public async searchAplicacionsByQuery(query: QueryAplicacionDTO) {
    return this.aplicacionService.paginate(
      {
        page: 1,
        limit: 10,
      },
      query,
    );
  }
  */
  @Get(':id')
  @Header('content-type', 'application/json')
  public async getAplicacion(@Param('id') id: string) {
    const aplicacion = await this.aplicacionService.findOne(id);

    if (!aplicacion) {
      throw new NotFoundException(`Aplicacion con id: ${id} no encontrado`);
    }

    return aplicacion;
  }

  @Post()
  @Header('content-type', 'application/json')
  public createAplicacion(@Body() crearAplicacion: CrearAplicacionDTO) {
    return this.aplicacionService.create(crearAplicacion);
  }

  @Put(':id')
  @Header('content-type', 'application/json')
  public async updateAplicacion(
    @Param('id') id: string,
    @Body() actualizarAplicacion: ActualizarAplicacionDTO,
  ) {
    const aplicacion = await this.aplicacionService.findOne(id);

    if (!aplicacion) {
      throw new NotFoundException(`Aplicacion con id: ${id} no encontrado`);
    }

    return this.aplicacionService
      .update(id, actualizarAplicacion)
      .catch((error) => {
        throw new NotFoundException(error.message);
      });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public deleteAplicacion(@Param('id') id: string) {
    this.aplicacionService.delete(id);
  }
}
