import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({ providedIn: 'root' })
export class AuthService {
  private url = 'http://localhost:3000/auth';

  constructor(
  private http: HttpClient,
  private router: Router
) {}

  login(nombre: string, clave: string): Observable<{
  access_token: string,
  usuario: {
    id: number,
    nombre: string,
    rol: string
  }
}> {
  return this.http.post<{
    access_token: string,
    usuario: {
      id: number,
      nombre: string,
      rol: string
    }
  }>(`${this.url}/login`, { nombre, clave });
}

  guardarToken(token: string): void {
    localStorage.setItem('token', token);
  }

  guardarUsuario(usuario: any): void {
  localStorage.setItem('usuario', JSON.stringify(usuario));
}

  obtenerUsuario(): any {
  const usuario = localStorage.getItem('usuario');
  return usuario ? JSON.parse(usuario) : null;
}

obtenerRol(): string | null {
  const usuario = this.obtenerUsuario();
  return usuario ? usuario.rol : null;
}
esAdmin(): boolean {
  return this.obtenerRol() === 'ADMIN';
}

esLider(): boolean {
  return this.obtenerRol() === 'LIDER';
}

esColaborador(): boolean {
  return this.obtenerRol() === 'COLABORADOR';
}
  obtenerToken(): string | null {
    return localStorage.getItem('token');
  }

cerrarSesion(): void {
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');

  this.router.navigate(['/login']);
}

  estaLogueado(): boolean {
    return !!localStorage.getItem('token');
  }
}