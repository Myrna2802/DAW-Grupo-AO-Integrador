import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tarea } from './tarea.entity';
import { TareasService } from './tareas.service';
import { TareasController } from './tareas.controller';
import { Proyecto } from '../proyectos/proyecto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tarea, Proyecto])],
  providers: [TareasService],
  controllers: [TareasController],
  exports: [TareasService],
})
export class TareasModule {}