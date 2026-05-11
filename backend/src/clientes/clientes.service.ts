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

  findAll(): Promise<Cliente[]> {
    return this.repo.find();
  }

  findOne(id: number): Promise<Cliente | null> {
    return this.repo.findOne({ where: { id } });
  }

  create(nombre: string): Promise<Cliente> {
    const cliente = this.repo.create({ nombre, estado: EstadoCliente.ACTIVO });
    return this.repo.save(cliente);
  }

  async update(id: number, nombre: string, estado: EstadoCliente): Promise<Cliente> {
    await this.repo.update(id, { nombre, estado });
    return this.repo.findOne({ where: { id } }) as Promise<Cliente>;
  }

  async remove(id: number): Promise<void> {
    const cliente = await this.repo.findOne({ where: { id } });
    if (!cliente) throw new BadRequestException('Cliente no encontrado');
    await this.repo.update(id, { estado: EstadoCliente.BAJA });
  }
}