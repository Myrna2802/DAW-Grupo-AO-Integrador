import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { TareasService } from './tareas.service';
import { EstadoTarea } from './tarea.entity';

@Controller('tareas')
export class TareasController {
  constructor(private readonly tareasService: TareasService) {}

  @Get()
  findByProyecto(@Query('proyectoId') proyectoId: string) {
    return this.tareasService.findByProyecto(+proyectoId);
  }

  @Post()
  create(@Body() body: { descripcion: string; proyectoId: number }) {
    return this.tareasService.create(body.descripcion, body.proyectoId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: { descripcion: string; estado: EstadoTarea },
  ) {
    return this.tareasService.update(+id, body.descripcion, body.estado);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tareasService.remove(+id);
  }
}