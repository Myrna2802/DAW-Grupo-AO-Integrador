import { Controller, Get, Post, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { EstadoCliente } from './cliente.entity';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Get()
  findAll() {
    return this.clientesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientesService.findOne(+id);
  }

  @Post()
  create(@Body() body: { nombre: string }) {
    return this.clientesService.create(body.nombre);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: { nombre: string; estado: EstadoCliente }) {
    return this.clientesService.update(+id, body.nombre, body.estado);
  }

  @Patch(':id/baja')
  remove(@Param('id') id: string) {
    return this.clientesService.remove(+id);
  }
}