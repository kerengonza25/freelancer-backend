import { SkillService } from '../services/skill.service';
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
import { CrearSkillDTO } from 'src/dto/create-skill.dto';
import { ActualizarSkillDTO } from 'src/dto/update-skill.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Skill } from 'src/model/skill.entity';
import { PaginateQuery, PaginatedSwaggerDocs } from 'nestjs-paginate';

@Controller('/api/v1/skill')
@ApiBearerAuth()
@ApiTags('Habilidades')
export class SkillController {
  constructor(private skillService: SkillService) {}

  @Get()
  @Header('content-type', 'application/json')
  public getSkills() {
    return this.skillService.findAll();
  }

  @Get('search')
  @Header('content-type', 'application/json')
  @PaginatedSwaggerDocs(Skill, {
    sortableColumns: ['id', 'nombre'],
  })
  public async searchSkills(@Query() query: PaginateQuery) {
    return this.skillService.paginate(
      {
        defaultSortBy: [['nombre', 'ASC']],
        searchableColumns: ['nombre'],
        sortableColumns: ['nombre'],
      },
      query,
    );
  }

  @Get(':id')
  @Header('content-type', 'application/json')
  public async getSkill(@Param('id') id: string) {
    const skill = await this.skillService.findOne(id);

    if (!skill) {
      throw new NotFoundException(`Skill con id: ${id} no encontrado`);
    }

    return skill;
  }

  @Post()
  @Header('content-type', 'application/json')
  public createSkill(@Body() crearSkill: CrearSkillDTO) {
    return this.skillService.create(crearSkill as any);
  }

  @Put(':id')
  @Header('content-type', 'application/json')
  public async updateSkill(
    @Param('id') id: string,
    @Body() actualizarSkill: ActualizarSkillDTO,
  ) {
    const skill = await this.skillService.findOne(id);

    if (!skill) {
      throw new NotFoundException(`Skill con id: ${id} no encontrado`);
    }
    return this.skillService
      .update(id, actualizarSkill as any)
      .catch((error) => {
        console.error(error);
        throw new NotFoundException(error.message);
      });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public deleteSkill(@Param('id') id: string) {
    this.skillService.delete(id);
  }
}
