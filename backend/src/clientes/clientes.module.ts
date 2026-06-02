import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Cliente } from './cliente.entity';
import { Proyecto } from '../proyectos/proyecto.entity';

import { ClientesService } from './clientes.service';
import { ClientesController } from './clientes.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Cliente,
      Proyecto
    ])
  ],

  providers: [ClientesService],
  controllers: [ClientesController],
  exports: [ClientesService],
})

export class ClientesModule {}