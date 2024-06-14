import { AvanceService } from '../services/avance.service';
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
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CrearAvanceDTO } from 'src/dto/create-avance.dto';
import { AvanceSearchQuery } from 'src/dto/query-avance.dto';
import { ActualizarAvanceDTO } from 'src/dto/update-avance.dto';

@ApiBearerAuth()
@ApiTags('Avances de trabajos')
@Controller('/api/v1/avances')
export class AvanceController {
  constructor(private avanceService: AvanceService) {}

  @Get()
  @Header('content-type', 'application/json')
  public getAvances() {
    return this.avanceService.findAll();
  }

  @Get('search')
  @ApiQuery({ type: AvanceSearchQuery })
  @Header('content-type', 'application/json')
  public async searchAvances(@Query() query: AvanceSearchQuery) {
    return {
      avances: await this.avanceService.searchBy(query),
      query,
    };
  }

  @Get(':id')
  @Header('content-type', 'application/json')
  public async getAvance(@Param('id') id: string) {
    const avance = await this.avanceService.findOne(id);

    if (!avance) {
      throw new NotFoundException(`Avance con id: ${id} no encontrado`);
    }

    return avance;
  }

  @Post()
  @Header('content-type', 'application/json')
  public createAvance(@Body() crearAvance: CrearAvanceDTO) {
    return this.avanceService.create(crearAvance);
  }

  @Put(':id')
  @Header('content-type', 'application/json')
  public async updateAvance(
    @Param('id') id: string,
    @Body() actualizarAvance: ActualizarAvanceDTO,
  ) {
    const avance = await this.avanceService.findOne(id);

    if (!avance) {
      throw new NotFoundException(`Avance con id: ${id} no encontrado`);
    }
    return this.avanceService.update(id, actualizarAvance).catch((error) => {
      throw new NotFoundException(error.message);
    });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public deleteAvance(@Param('id') id: string) {
    this.avanceService.delete(id);
  }
}
