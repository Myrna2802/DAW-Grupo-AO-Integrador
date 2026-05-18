import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuarios/usuario.service';
import * as bcrypt from 'bcrypt';
import { EstadoUsuario } from '../usuarios/usuario.entity';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async login(nombre: string, clave: string) {
    const usuario = await this.usuarioService.findOne(nombre);

    if (!usuario)
      throw new UnauthorizedException('Usuario o clave incorrectos');

    if (usuario.estado !== EstadoUsuario.ACTIVO)
      throw new UnauthorizedException('Usuario inactivo');

    const claveValida = await bcrypt.compare(clave, usuario.clave);
    if (!claveValida)
      throw new UnauthorizedException('Usuario o clave incorrectos');

    const payload = {
      sub: usuario.id,
      nombre: usuario.nombre,
      rol: usuario.rol,
    };

    return {
      access_token: this.jwtService.sign(payload),
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        rol: usuario.rol,
  },
};
  }
} 

