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
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1006',
      database: 'gestion_proyectos',
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