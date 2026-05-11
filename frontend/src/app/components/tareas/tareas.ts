import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-tareas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tareas.html',
  styleUrl: './tareas.css'
})
export class Tareas implements OnInit {
  tareas: any[] = [];
  proyectoId: number = 0;
  mostrarFormulario = false;
  editando = false;
  tareaSeleccionada: any = null;

  descripcion = '';
  estado = 'PENDIENTE';

  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.proyectoId = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarTareas();
  }

  cargarTareas() {
    this.api.getTareas(this.proyectoId).subscribe(t => this.tareas = t);
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
      this.api.actualizarTarea(this.tareaSeleccionada.id, this.descripcion, this.estado)
        .subscribe(() => {
          this.mostrarFormulario = false;
          this.cargarTareas();
        });
    } else {
      this.api.crearTarea(this.descripcion, this.proyectoId)
        .subscribe(() => {
          this.mostrarFormulario = false;
          this.cargarTareas();
        });
    }
  }

  eliminar(id: number) {
    if (confirm('¿Seguro que querés eliminar esta tarea?')) {
      this.api.eliminarTarea(id).subscribe(() => this.cargarTareas());
    }
  }

  volver() {
    this.router.navigate(['/proyectos']);
  }
}