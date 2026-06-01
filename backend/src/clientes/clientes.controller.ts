import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';

import { ClientesService } from './clientes.service';
import { EstadoCliente } from './cliente.entity';

import { JwtGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('clientes')
export class ClientesController {

  constructor(
    private readonly clientesService: ClientesService,
  ) {}

  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.clientesService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(
    @Param('id') id: string,
  ) {
    return this.clientesService.findOne(+id);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  @Post()
  create(
    @Body() body: {
      nombre: string;
    },
  ) {
    return this.clientesService.create(
      body.nombre,
    );
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: {
      nombre: string;
      estado: EstadoCliente;
    },
  ) {
    return this.clientesService.update(
      +id,
      body.nombre,
      body.estado,
    );
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  @Patch(':id/baja')
  remove(
    @Param('id') id: string,
  ) {
    return this.clientesService.remove(+id);
  }

}