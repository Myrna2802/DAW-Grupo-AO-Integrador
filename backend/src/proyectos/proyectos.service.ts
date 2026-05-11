import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proyecto, EstadoProyecto } from './proyecto.entity';
import { Cliente, EstadoCliente } from '../clientes/cliente.entity';

@Injectable()
export class ProyectosService {
  constructor(
    @InjectRepository(Proyecto)
    private repo: Repository<Proyecto>,
    @InjectRepository(Cliente)
    private clienteRepo: Repository<Cliente>,
  ) {}

  findAll(): Promise<Proyecto[]> {
    return this.repo.find({ relations: ['cliente'] });
  }

  findOne(id: number): Promise<Proyecto | null> {
    return this.repo.findOne({ where: { id }, relations: ['cliente'] });
  }

  async create(nombre: string, clienteId?: number): Promise<Proyecto> {
    const proyecto = new Proyecto();
    proyecto.nombre = nombre;
    proyecto.estado = EstadoProyecto.ACTIVO;

    if (clienteId) {
      const cliente = await this.clienteRepo.findOne({ where: { id: clienteId } });
      if (!cliente) throw new BadRequestException('Cliente no encontrado');
      if (cliente.estado !== EstadoCliente.ACTIVO)
        throw new BadRequestException('Solo se puede asignar un cliente ACTIVO');
      proyecto.cliente = cliente;
    }

    return this.repo.save(proyecto);
  }

  async update(id: number, nombre: string, estado: EstadoProyecto, clienteId?: number): Promise<Proyecto> {
    const proyecto = await this.repo.findOne({ where: { id }, relations: ['cliente'] });
    if (!proyecto) throw new BadRequestException('Proyecto no encontrado');

    proyecto.nombre = nombre;
    proyecto.estado = estado;

    if (clienteId) {
      const cliente = await this.clienteRepo.findOne({ where: { id: clienteId } });
      if (!cliente) throw new BadRequestException('Cliente no encontrado');
      if (cliente.estado !== EstadoCliente.ACTIVO)
        throw new BadRequestException('Solo se puede asignar un cliente ACTIVO');
      proyecto.cliente = cliente;
    }

    return this.repo.save(proyecto);
  }
}