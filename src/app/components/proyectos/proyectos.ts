import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './proyectos.html',
  styleUrl: './proyectos.css'
})
export class Proyectos implements OnInit {

  proyectos: any[] = [];
  clientes: any[] = [];

  mostrarFormulario = false;
  editando = false;
  proyectoSeleccionado: any = null;

  nombre = '';
  clienteId: number | null = null;
  estado = 'ACTIVO';

  // Funcionalidad adicional: búsqueda y filtrado
  busqueda = '';
  filtroEstado = '';

  constructor(
    private api: ApiService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.cargarProyectos();
    this.cargarClientes();
  }

  cargarProyectos() {
    this.api.getProyectos().subscribe({
      next: (p) => {
        this.proyectos = p;
        this.cdr.detectChanges();
      },
      error: (err) => console.log('Error:', err)
    });
  }

  cargarClientes() {
    this.api.getClientes().subscribe({
      next: (c) => {
        this.clientes = c.filter((x: any) => x.estado === 'ACTIVO');
      },
      error: (err) => console.log('Error:', err)
    });
  }

  // Getter para filtrar proyectos en tiempo real
  get proyectosFiltrados() {
    return this.proyectos.filter(p => {
      const coincideNombre = p.nombre.toLowerCase().includes(this.busqueda.toLowerCase());
      const coincideEstado = this.filtroEstado ? p.estado === this.filtroEstado : true;
      return coincideNombre && coincideEstado;
    });
  }

  abrirFormulario() {
    this.mostrarFormulario = true;
    this.editando = false;
    this.nombre = '';
    this.clienteId = null;
    this.estado = 'ACTIVO';
  }

  editar(proyecto: any) {
    this.mostrarFormulario = true;
    this.editando = true;
    this.proyectoSeleccionado = proyecto;
    this.nombre = proyecto.nombre;
    this.estado = proyecto.estado;
    this.clienteId = proyecto.cliente?.id || null;
  }

  guardar() {
    if (this.editando) {
      this.api.actualizarProyecto(
        this.proyectoSeleccionado.id,
        this.nombre,
        this.estado,
        this.clienteId || undefined
      ).subscribe(() => {
        this.mostrarFormulario = false;
        this.cargarProyectos();
      });
    } else {
      this.api.crearProyecto(this.nombre, this.clienteId || undefined)
        .subscribe(() => {
          this.mostrarFormulario = false;
          this.cargarProyectos();
        });
    }
  }

  verTareas(id: number) {
    this.router.navigate(['/tareas', id]);
  }

  irAClientes() {
    this.router.navigate(['/clientes']);
  }

  cerrarSesion() {
    this.authService.cerrarSesion();
    this.router.navigate(['/login']);
  }

  puedeCrearProyecto(): boolean {
    return this.authService.esAdmin() || this.authService.esLider();
  }

  puedeEditarProyecto(): boolean {
    return this.authService.esAdmin() || this.authService.esLider();
  }

  puedeDarBajaProyecto(): boolean {
    return this.authService.esAdmin();
  }
}
