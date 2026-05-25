import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Cliente, EstadoCliente } from './cliente.entity';
import { Proyecto } from '../proyectos/proyecto.entity';

@Injectable()
export class ClientesService {

  constructor(

    @InjectRepository(Cliente)
    private repo: Repository<Cliente>,

    @InjectRepository(Proyecto)
    private proyectoRepo: Repository<Proyecto>,

  ) {}

  async findAll(): Promise<any[]> {

    const clientes = await this.repo.find();

    const clientesConCantidad = await Promise.all(

      clientes.map(async (cliente) => {

        const cantidadProyectos =
          await this.proyectoRepo.count({

            where: {
              cliente: {
                id: cliente.id
              }
            }

          });

        return {
          ...cliente,
          cantidadProyectos
        };

      })

    );

    return clientesConCantidad;

  }

  findOne(id: number): Promise<Cliente | null> {

    return this.repo.findOne({
      where: { id }
    });

  }

  create(nombre: string): Promise<Cliente> {

    const cliente = this.repo.create({
      nombre,
      estado: EstadoCliente.ACTIVO
    });

    return this.repo.save(cliente);

  }

  async update(
    id: number,
    nombre: string,
    estado: EstadoCliente
  ): Promise<Cliente> {

    if (estado === EstadoCliente.BAJA) {

      const proyectos = await this.proyectoRepo.find({

        where: {
          cliente: {
            id
          }
        },

        relations: ['cliente']

      });

      if (proyectos.length > 0) {

        throw new BadRequestException(
          'No se puede dar de baja un cliente con proyectos asociados'
        );

      }

    }

    await this.repo.update(id, {
      nombre,
      estado
    });

    return this.repo.findOne({
      where: { id }
    }) as Promise<Cliente>;

  }

  async remove(id: number): Promise<void> {

    const cliente = await this.repo.findOne({
      where: { id }
    });

    if (!cliente) {

      throw new BadRequestException(
        'Cliente no encontrado'
      );

    }

    const proyectos = await this.proyectoRepo.find({

      where: {
        cliente: {
          id
        }
      },

      relations: ['cliente']

    });

    if (proyectos.length > 0) {

      throw new BadRequestException(
        'No se puede dar de baja un cliente con proyectos asociados'
      );

    }

    await this.repo.update(id, {
      estado: EstadoCliente.BAJA
    });

  }

}