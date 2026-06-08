import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente, EstadoCliente } from './cliente.entity';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private repo: Repository<Cliente>,
  ) {}

  async findAll(): Promise<any[]> {
    const clientes = await this.repo.find({ relations: ['proyectos'] });
    return clientes.map(c => ({
      ...c,
      cantidadProyectos: c.proyectos.length,
    }));
  }

  async findOne(id: number): Promise<any> {
    const cliente = await this.repo.findOne({ where: { id }, relations: ['proyectos'] });
    if (!cliente) throw new BadRequestException('Cliente no encontrado');
    return {
      ...cliente,
      cantidadProyectos: cliente.proyectos.length,
    };
  }

  create(nombre: string): Promise<Cliente> {
    const cliente = this.repo.create({ nombre, estado: EstadoCliente.ACTIVO });
    return this.repo.save(cliente);
  }

  async update(id: number, nombre: string, estado: EstadoCliente): Promise<Cliente> {
    const cliente = await this.repo.findOne({ where: { id }, relations: ['proyectos'] });
    if (!cliente) throw new BadRequestException('Cliente no encontrado');

    if (estado === EstadoCliente.BAJA && cliente.proyectos.length > 0) {
      throw new BadRequestException('No se puede dar de baja un cliente con proyectos asociados');
    }

    cliente.nombre = nombre;
    cliente.estado = estado;
    return this.repo.save(cliente);
  }

  async remove(id: number): Promise<void> {
    const cliente = await this.repo.findOne({ where: { id }, relations: ['proyectos'] });
    if (!cliente) throw new BadRequestException('Cliente no encontrado');

    if (cliente.proyectos.length > 0) {
      throw new BadRequestException('No se puede dar de baja un cliente con proyectos asociados');
    }

    await this.repo.update(id, { estado: EstadoCliente.BAJA });
  }
}