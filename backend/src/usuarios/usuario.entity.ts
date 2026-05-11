import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum EstadoUsuario {
  ACTIVO = 'ACTIVO',
  BAJA = 'BAJA',
}

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  nombre!: string;

  @Column()
  clave!: string;

  @Column({ type: 'enum', enum: EstadoUsuario })
  estado!: EstadoUsuario;
}
