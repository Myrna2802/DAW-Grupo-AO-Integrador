import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum EstadoUsuario {
  ACTIVO = 'ACTIVO',
  BAJA = 'BAJA',
}
export enum RolUsuario {
  ADMIN = 'ADMIN',
  LIDER = 'LIDER',
  COLABORADOR = 'COLABORADOR',
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

  @Column({
  type: 'enum',
  enum: RolUsuario,
  default: RolUsuario.COLABORADOR,
})
rol!: RolUsuario;

  
}
