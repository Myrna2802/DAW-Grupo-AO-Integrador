import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';

import { TareasService } from './tareas.service';
import { EstadoTarea } from './tarea.entity';

import { JwtGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('tareas')
export class TareasController {

  constructor(
    private readonly tareasService: TareasService,
  ) {}

  @UseGuards(JwtGuard)
  @Get()
  findByProyecto(
    @Query('proyectoId') proyectoId: string,
  ) {
    return this.tareasService.findByProyecto(
      +proyectoId,
    );
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN', 'LIDER')
  @Post()
  create(
    @Body() body: {
      descripcion: string;
      proyectoId: number;
    },
  ) {
    return this.tareasService.create(
      body.descripcion,
      body.proyectoId,
    );
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN', 'LIDER')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: {
      descripcion: string;
      estado: EstadoTarea;
    },
  ) {
    return this.tareasService.update(
      +id,
      body.descripcion,
      body.estado,
    );
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN', 'LIDER')
  @Delete(':id')
  remove(
    @Param('id') id: string,
  ) {
    return this.tareasService.remove(
      +id,
    );
  }

}