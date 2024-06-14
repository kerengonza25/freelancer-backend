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
import { CreateDocumentoDTO } from 'src/dto/create-documento.dto';
import { Documento } from 'src/model/documento.entity';
import { AvanceService } from 'src/services/avance.service';
import { DocumentoService } from 'src/services/documento.service';

@Controller('/api/v1/documentos')
@ApiBearerAuth()
@ApiTags('Documentos por avance')
export class DocumentoController {
  constructor(
    private readonly documentoService: DocumentoService,
    private readonly avanceService: AvanceService,
  ) {}

  @Get()
  public async findAll() {
    return this.documentoService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return this.documentoService.findOne(id);
  }

  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return this.documentoService.remove(id);
  }

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(
    @Body() data: CreateDocumentoDTO,
    @UploadedFile() file,
  ) {
    const documentoData = new Documento();
    documentoData.avance = await this.avanceService.findOne(data.avance);
    documentoData.nombre = file.originalname;
    documentoData.url = file.path;
    documentoData.tipo = file.originalname.split('.').pop();
    return this.documentoService.create(documentoData);
  }
}
