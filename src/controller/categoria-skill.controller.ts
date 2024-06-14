import { CategoriaSkillsService } from '../services/categoria-skill.service';
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
import { CrearCategoriaSkillDTO } from 'src/dto/create-categoria-skill.dto';
import { ActualizarCategoriaSkillDTO } from 'src/dto/update-categoria-skill.dto';
import { QueryCategoriaSkillDTO } from 'src/dto/query-categoria-skill.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Categoria por Skill')
@Controller('/api/v1/categoriaskill')
export class CategoriaSkillController {
  constructor(private categoriaskillService: CategoriaSkillsService) {}

  @Get()
  @Header('content-type', 'application/json')
  public getCategoriaSkills() {
    return this.categoriaskillService.findAll();
  }

  @Get('search')
  @Header('content-type', 'application/json')
  public async searchCategoriaSkills(@Query() query: QueryCategoriaSkillDTO) {
    return {
      categoriaskilles: await this.categoriaskillService.searchBy(query),
      query,
    };
  }

  @Get(':id')
  @Header('content-type', 'application/json')
  public async getCategoriaSkill(@Param('id') id: string) {
    const categoriaskill = await this.categoriaskillService.findOne(id);

    if (!categoriaskill) {
      throw new NotFoundException(`CategoriaSkill con id: ${id} no encontrado`);
    }

    return categoriaskill;
  }

  @Post()
  @Header('content-type', 'application/json')
  public createCategoriaSkill(
    @Body() crearCategoriaSkill: CrearCategoriaSkillDTO,
  ) {
    return this.categoriaskillService.create(crearCategoriaSkill);
  }

  @Put(':id')
  @Header('content-type', 'application/json')
  public async updateCategoriaSkill2(
    @Param('id') id: string,
    @Body() actualizarCategoriaSkill: ActualizarCategoriaSkillDTO,
  ) {
    const categoriaskill = await this.categoriaskillService.findOne(id);

    if (!categoriaskill) {
      throw new NotFoundException(`CategoriaSkill con id: ${id} no encontrado`);
    }

    return this.categoriaskillService
      .update(id, actualizarCategoriaSkill)
      .catch((error) => {
        throw new NotFoundException(error.message);
      });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public deleteCategoriaSkill2(@Param('id') id: string) {
    this.categoriaskillService.delete(id);
  }
}
