import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { ProyectosService } from './proyectos.service';
import { EstadoProyecto } from './proyecto.entity';

@Controller('proyectos')
export class ProyectosController {
  constructor(private readonly proyectosService: ProyectosService) {}

  @Get()
  findAll() {
    return this.proyectosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.proyectosService.findOne(+id);
  }

  @Post()
  create(@Body() body: { nombre: string; clienteId?: number }) {
    return this.proyectosService.create(body.nombre, body.clienteId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: { nombre: string; estado: EstadoProyecto; clienteId?: number },
  ) {
    return this.proyectosService.update(+id, body.nombre, body.estado, body.clienteId);
  }
}