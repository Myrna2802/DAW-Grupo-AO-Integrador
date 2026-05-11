import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private url = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {}

  login(nombre: string, clave: string): Observable<{ access_token: string }> {
    return this.http.post<{ access_token: string }>(`${this.url}/login`, { nombre, clave });
  }

  guardarToken(token: string): void {
    localStorage.setItem('token', token);
  }

  obtenerToken(): string | null {
    return localStorage.getItem('token');
  }

  cerrarSesion(): void {
    localStorage.removeItem('token');
  }

  estaLogueado(): boolean {
    return !!localStorage.getItem('token');
  }
}