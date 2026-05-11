import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum EstadoCliente {
  ACTIVO = 'ACTIVO',
  BAJA = 'BAJA',
}

@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  nombre!: string;

  @Column({ type: 'enum', enum: EstadoCliente })
  estado!: EstadoCliente;
}