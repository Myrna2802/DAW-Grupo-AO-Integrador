import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';

import { ProyectosService } from './proyectos.service';
import { EstadoProyecto } from './proyecto.entity';

import { JwtGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('proyectos')
export class ProyectosController {

  constructor(
    private readonly proyectosService: ProyectosService,
  ) {}

  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.proyectosService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(
    @Param('id') id: string,
  ) {
    return this.proyectosService.findOne(+id);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN', 'LIDER')
  @Post()
  create(
    @Body() body: {
      nombre: string;
      clienteId?: number;
    },
  ) {
    return this.proyectosService.create(
      body.nombre,
      body.clienteId,
    );
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN', 'LIDER')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: {
      nombre: string;
      estado: EstadoProyecto;
      clienteId?: number;
    },
  ) {
    return this.proyectosService.update(
      +id,
      body.nombre,
      body.estado,
      body.clienteId,
    );
  }

}