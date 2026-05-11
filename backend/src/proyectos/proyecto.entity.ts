import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Cliente } from '../clientes/cliente.entity';

export enum EstadoProyecto {
  ACTIVO = 'ACTIVO',
  FINALIZADO = 'FINALIZADO',
  BAJA = 'BAJA',
}

@Entity('proyectos')
export class Proyecto {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  nombre!: string;

  @Column({ type: 'enum', enum: EstadoProyecto })
  estado!: EstadoProyecto;

  @ManyToOne(() => Cliente, { nullable: true })
  @JoinColumn({ name: 'id_cliente' })
  cliente!: Cliente;
}