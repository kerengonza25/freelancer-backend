import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
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
import { CrearUserDTO } from 'src/dto/create-user.dto';
import { ActualizarUserDTO } from 'src/dto/update-user.dto';
import {
  FilterOperator,
  FilterSuffix,
  Paginate,
  PaginateQuery,
  PaginatedSwaggerDocs,
} from 'nestjs-paginate';
import { User } from 'src/model/user.entity';

@Controller('/api/v1/users')
@ApiBearerAuth()
@ApiTags('Usuarios')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @Header('content-type', 'application/json')
  public getUsers() {
    return this.userService.findAll();
  }

  /*
  @Get('search')
  @Header('content-type', 'application/json')
  @ApiQuery({ type: QueryUserDTO })
  public async searchUsers(@Query() query: QueryUserDTO) {
    return {
      users: await this.userService.searchBy(query),
      query,
    };
  }
  */

  /*
  @Get('search2')
  @Header('content-type', 'application/json')
  @ApiQuery({ type: QueryUserDTO })
  public async searchAplicacionsByQuery(@Query() query: QueryUserDTO) {
    return this.userService.paginate(
      {
        page: query.page || 1,
        limit: query.limit || 10,
      },
      query,
    );
  }
  */

  @Get('search')
  @Header('content-type', 'application/json')
  @PaginatedSwaggerDocs(User, {
    sortableColumns: ['id', 'firstName', 'lastName', 'email', 'role'],
  })
  public async searchAplicacionsByQuery2(
    @Paginate() @Query() query: PaginateQuery,
  ) {
    return this.userService.paginate(
      {
        defaultSortBy: [['id', 'DESC']],
        searchableColumns: ['firstName', 'lastName', 'email', 'role'],
        sortableColumns: ['id', 'firstName', 'lastName', 'email', 'role'],
        filterableColumns: {
          firstName: [
            FilterOperator.EQ,
            FilterSuffix.NOT,
            FilterOperator.ILIKE,
          ],
          lastName: [FilterOperator.EQ, FilterSuffix.NOT, FilterOperator.ILIKE],
          email: [FilterOperator.EQ, FilterSuffix.NOT, FilterOperator.ILIKE],
          role: [FilterOperator.EQ, FilterSuffix.NOT, FilterOperator.ILIKE],
        },
      },
      query,
    );
  }

  @Get(':id')
  @Header('content-type', 'application/json')
  public async getUser(@Param('id') id: string) {
    const user = await this.userService.findOne(id);

    if (!user) {
      throw new NotFoundException(`User con id: ${id} no encontrado`);
    }

    return user;
  }

  @Post()
  @Header('content-type', 'application/json')
  public createUser(@Body() crearUser: CrearUserDTO) {
    return this.userService.create(crearUser);
  }

  @Put(':id')
  @Header('content-type', 'application/json')
  public async updateUser(
    @Param('id') id: string,
    @Body() actualizarUser: ActualizarUserDTO,
  ) {
    const user = await this.userService.findOne(id);

    if (!user) {
      throw new NotFoundException(`User con id: ${id} no encontrado`);
    }
    return this.userService.update(id, actualizarUser).catch((error) => {
      throw new NotFoundException(error.message);
    });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public deleteUser(@Param('id') id: string) {
    this.userService.delete(id);
  }
}
