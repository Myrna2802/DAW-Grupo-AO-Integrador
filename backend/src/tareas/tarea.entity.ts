import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Proyecto } from '../proyectos/proyecto.entity';

export enum EstadoTarea {
  PENDIENTE = 'PENDIENTE',
  FINALIZADA = 'FINALIZADA',
  BAJA = 'BAJA',
}

@Entity('tareas')
export class Tarea {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  descripcion!: string;

  @Column({ type: 'enum', enum: EstadoTarea })
  estado!: EstadoTarea;

  @ManyToOne(() => Proyecto)
  @JoinColumn({ name: 'id_proyecto' })
  proyecto!: Proyecto;
}