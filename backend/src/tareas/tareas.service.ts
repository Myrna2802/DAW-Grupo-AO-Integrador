import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tarea, EstadoTarea } from './tarea.entity';
import { Proyecto } from '../proyectos/proyecto.entity';

@Injectable()
export class TareasService {
  constructor(
    @InjectRepository(Tarea)
    private repo: Repository<Tarea>,
    @InjectRepository(Proyecto)
    private proyectoRepo: Repository<Proyecto>,
  ) {}

  findByProyecto(proyectoId: number): Promise<Tarea[]> {
    return this.repo.find({ where: { proyecto: { id: proyectoId } } });
  }

  async create(descripcion: string, proyectoId: number): Promise<Tarea> {
    const proyecto = await this.proyectoRepo.findOne({ where: { id: proyectoId } });
    if (!proyecto) throw new BadRequestException('Proyecto no encontrado');

    const tarea = new Tarea();
    tarea.descripcion = descripcion;
    tarea.estado = EstadoTarea.PENDIENTE;
    tarea.proyecto = proyecto;

    return this.repo.save(tarea);
  }

  async update(id: number, descripcion: string, estado: EstadoTarea): Promise<Tarea> {
    const tarea = await this.repo.findOne({ where: { id } });
    if (!tarea) throw new BadRequestException('Tarea no encontrada');

    tarea.descripcion = descripcion;
    tarea.estado = estado;

    return this.repo.save(tarea);
  }

  async remove(id: number): Promise<void> {
    const tarea = await this.repo.findOne({ where: { id } });
    if (!tarea) throw new BadRequestException('Tarea no encontrada');
    await this.repo.delete(id);
  }
}