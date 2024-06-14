import { PublicacionImagenesService } from 'src/services/imagen.service';
import { ChatModule } from './chat/chat.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomsController } from './chat/room.controller';
import { ChatWebsocketGateway } from './chat/chat.gateway';
import { User } from './model/user.entity';
import { Trabajo } from './model/trabajo.entity';
import { Avance } from './model/avance.entity';
import { Skill } from './model/skill.entity';
import { FreelancerData } from './model/freelancer-data.entity';
import { ReclutadorData } from './model/reclutador-data.entity';
import { Documento } from './model/documento.entity';
import { PublicacionImagenes } from './model/imagenes-publicacion.entity';
import { CategoriaSkills } from './model/categoria-skill.entity';
import { Profesion } from './model/profesion.entity';
import { Publicacion } from './model/publicacion.entity';
import { DocumentoController } from './controller/documento.controller';
import { AvanceService } from './services/avance.service';
import { DocumentoService } from './services/documento.service';
import { CategoriaSkillsService } from './services/categoria-skill.service';
import { ProfesionService } from './services/profesion.service';
import { SkillService } from './services/skill.service';
import { TrabajoService } from './services/trabajo.service';
import { UserService } from './services/user.service';
import { AvanceController } from './controller/avance.controller';
import { UserController } from './controller/user.controller';
import { ProfesionController } from './controller/profesion.controller';
import { CategoriaSkillController } from './controller/categoria-skill.controller';
import { SkillController } from './controller/skill.controller';
import { TrabajoController } from './controller/trabajo.controller';
import { Aplicacion } from './model/aplicacion.entity';
import { AplicacionService } from './services/aplicacion.service';
import { AplicacionController } from './controller/aplicacion.controller';
import { ImagenController } from './controller/imagenes.controller';
import { PublicacionController } from './controller/publicacion.controller';
import { PublicacionService } from './services/publicacion.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ChatModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'freelanceando',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([
      User,
      Trabajo,
      Publicacion,
      Avance,
      Documento,
      PublicacionImagenes,
      CategoriaSkills,
      Profesion,
      Skill,
      FreelancerData,
      ReclutadorData,
      Aplicacion,
    ]),
    MulterModule.register({
      dest: './static/assets/upload',
      storage: diskStorage({
        destination: './static/assets/upload',
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: './static',
    }),
  ],
  controllers: [
    RoomsController,
    AvanceController,
    UserController,
    DocumentoController,
    ProfesionController,
    CategoriaSkillController,
    SkillController,
    TrabajoController,
    AplicacionController,
    ImagenController,
    PublicacionController,
  ],
  providers: [
    ChatWebsocketGateway,
    AvanceService,
    DocumentoService,
    CategoriaSkillsService,
    ProfesionService,
    SkillService,
    TrabajoService,
    UserService,
    AplicacionService,
    PublicacionImagenesService,
    PublicacionService,
  ],
})
export class AppModule {}
