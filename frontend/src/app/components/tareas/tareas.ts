import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  Router,
  ActivatedRoute
} from '@angular/router';

import { ApiService } from '../../services/api';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-tareas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tareas.html',
  styleUrl: './tareas.css'
})

export class Tareas implements OnInit {

  tareas: any[] = [];
  filtroEstado = 'TODOS';

  proyectoId: number = 0;

  mostrarFormulario = false;
  editando = false;

  tareaSeleccionada: any = null;

  descripcion = '';
  estado = 'PENDIENTE';

  constructor(
    private api: ApiService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {

    this.proyectoId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.cargarTareas();

  }

  puedeEditar(): boolean {

    return this.authService.esAdmin()
      || this.authService.esLider();

  }

  get tareasFiltradas(): any[] {
    if (this.filtroEstado === 'TODOS') {
      return this.tareas;
    }

    return this.tareas.filter((tarea) => tarea.estado === this.filtroEstado);
  }

  cargarTareas() {

    this.api.getTareas(this.proyectoId).subscribe({

      next: (t) => {

        console.log('TAREAS RECIBIDAS:', t);

        this.tareas = t;

        this.cdr.detectChanges();

      },

      error: (err) => {

        console.log('ERROR TAREAS:', err);

      }

    });

  }

  abrirFormulario() {

    this.mostrarFormulario = true;
    this.editando = false;

    this.descripcion = '';
    this.estado = 'PENDIENTE';

  }

  editar(tarea: any) {

    this.mostrarFormulario = true;
    this.editando = true;

    this.tareaSeleccionada = tarea;

    this.descripcion = tarea.descripcion;
    this.estado = tarea.estado;

  }

  guardar() {

    if (this.editando) {

      this.api.actualizarTarea(
        this.tareaSeleccionada.id,
        this.descripcion,
        this.estado
      ).subscribe(() => {

        this.mostrarFormulario = false;

        this.cargarTareas();

      });

    } else {

      this.api.crearTarea(
        this.descripcion,
        this.proyectoId
      ).subscribe(() => {

        this.mostrarFormulario = false;

        this.cargarTareas();

      });

    }

  }

  marcarComoFinalizada(tarea: any) {

    if (tarea.estado === 'FINALIZADA') {
      return;
    }

    this.api.actualizarTarea(
      tarea.id,
      tarea.descripcion,
      'FINALIZADA'
    ).subscribe(() => this.cargarTareas());

  }

  eliminar(id: number) {

    if (confirm('¿Seguro que querés eliminar esta tarea?')) {

      this.api.eliminarTarea(id)
        .subscribe(() => this.cargarTareas());

    }

  }

  volver() {

    this.router.navigate(['/proyectos']);

  }

  cerrarSesion() {

    this.authService.cerrarSesion();

  }

}