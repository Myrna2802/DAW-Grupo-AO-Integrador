import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private url = 'http://localhost:3000';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private headers(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.authService.obtenerToken()}`,
    });
  }

  // Clientes
  getClientes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/clientes`, { headers: this.headers() });
  }

  crearCliente(nombre: string): Observable<any> {
    return this.http.post(`${this.url}/clientes`, { nombre }, { headers: this.headers() });
  }

  actualizarCliente(id: number, nombre: string, estado: string): Observable<any> {
    return this.http.patch(`${this.url}/clientes/${id}`, { nombre, estado }, { headers: this.headers() });
  }

  // Proyectos
  getProyectos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/proyectos`, { headers: this.headers() });
  }

  crearProyecto(nombre: string, clienteId?: number): Observable<any> {
    return this.http.post(`${this.url}/proyectos`, { nombre, clienteId }, { headers: this.headers() });
  }

  actualizarProyecto(id: number, nombre: string, estado: string, clienteId?: number): Observable<any> {
    return this.http.patch(`${this.url}/proyectos/${id}`, { nombre, estado, clienteId }, { headers: this.headers() });
  }

  // Tareas
  getTareas(proyectoId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/tareas?proyectoId=${proyectoId}`, { headers: this.headers() });
  }

  crearTarea(descripcion: string, proyectoId: number): Observable<any> {
    return this.http.post(`${this.url}/tareas`, { descripcion, proyectoId }, { headers: this.headers() });
  }

  actualizarTarea(id: number, descripcion: string, estado: string): Observable<any> {
    return this.http.patch(`${this.url}/tareas/${id}`, { descripcion, estado }, { headers: this.headers() });
  }

  eliminarTarea(id: number): Observable<any> {
    return this.http.delete(`${this.url}/tareas/${id}`, { headers: this.headers() });
  }
}