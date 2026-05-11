import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proyecto } from './proyecto.entity';
import { ProyectosService } from './proyectos.service';
import { ProyectosController } from './proyectos.controller';
import { Cliente } from '../clientes/cliente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Proyecto, Cliente])],
  providers: [ProyectosService],
  controllers: [ProyectosController],
  exports: [ProyectosService],
})
export class ProyectosModule {}