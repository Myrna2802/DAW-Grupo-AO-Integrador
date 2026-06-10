import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ClientesModule } from './clientes/clientes.module';
import { ProyectosModule } from './proyectos/proyectos.module';
import { TareasModule } from './tareas/tareas.module';
import { Usuario } from './usuarios/usuario.entity';
import { Cliente } from './clientes/cliente.entity';
import { Proyecto } from './proyectos/proyecto.entity';
import { Tarea } from './tareas/tarea.entity';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT || 5432),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || '4329298',
      database: process.env.DB_NAME || 'integrador_daw',
      entities: [Usuario, Cliente, Proyecto, Tarea],
      synchronize: false,
    }),
    UsuariosModule,
    ClientesModule,
    ProyectosModule,
    TareasModule,
    AuthModule,
  ],
})
export class AppModule {}