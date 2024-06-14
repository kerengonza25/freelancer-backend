import { ProfesionService } from '../services/profesion.service';
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
import { CrearProfesionDTO } from 'src/dto/create-profesion.dto';
import { ActualizarProfesionDTO } from 'src/dto/update-profesion.dto';
import { QueryProfesionDTO } from 'src/dto/query-profesion.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('/api/v1/profesion')
@ApiBearerAuth()
@ApiTags('Profesion')
export class ProfesionController {
  constructor(private profesionService: ProfesionService) {}

  @Get()
  @Header('content-type', 'application/json')
  public getProfesions() {
    return this.profesionService.findAll();
  }

  @Get('search')
  @Header('content-type', 'application/json')
  public async searchProfesions(@Query() query: QueryProfesionDTO) {
    return {
      profesiones: await this.profesionService.searchBy(query),
      query,
    };
  }

  @Get(':id')
  @Header('content-type', 'application/json')
  public async getProfesion(@Param('id') id: string) {
    const profesion = await this.profesionService.findOne(id);

    if (!profesion) {
      throw new NotFoundException(`Profesion con id: ${id} no encontrado`);
    }

    return profesion;
  }

  @Post()
  @Header('content-type', 'application/json')
  public createProfesion(@Body() crearProfesion: CrearProfesionDTO) {
    return this.profesionService.create(crearProfesion);
  }

  @Put(':id')
  @Header('content-type', 'application/json')
  public async updateProfesion(
    @Param('id') id: string,
    @Body() actualizarProfesion: ActualizarProfesionDTO,
  ) {
    const profesion = await this.profesionService.findOne(id);

    if (!profesion) {
      throw new NotFoundException(`Profesion con id: ${id} no encontrado`);
    }
    return this.profesionService
      .update(id, actualizarProfesion)
      .catch((error) => {
        throw new NotFoundException(error.message);
      });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public deleteProfesion(@Param('id') id: string) {
    this.profesionService.delete(id);
  }
}
