import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiService } from '../../services/api';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clientes.html',
  styleUrl: './clientes.css'
})

export class Clientes implements OnInit {

  clientes: any[] = [];

  mostrarFormulario = false;
  editando = false;

  clienteSeleccionado: any = null;

  nombre = '';
  estado = 'ACTIVO';

  constructor(
    private api: ApiService,
    private router: Router,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {

    this.cargarClientes();

  }

  cargarClientes() {

    this.api.getClientes().subscribe({

      next: (c) => {

        this.clientes = c;

        this.cdr.detectChanges();

      },

      error: (err) => {

        console.log('ERROR CLIENTES:', err);

      }

    });

  }

  abrirFormulario() {

    this.mostrarFormulario = true;
    this.editando = false;

    this.nombre = '';
    this.estado = 'ACTIVO';

  }

  editar(cliente: any) {

    this.mostrarFormulario = true;
    this.editando = true;

    this.clienteSeleccionado = cliente;

    this.nombre = cliente.nombre;
    this.estado = cliente.estado;

  }

  guardar() {

    if (this.editando) {

      this.api.actualizarCliente(
        this.clienteSeleccionado.id,
        this.nombre,
        this.estado
      ).subscribe(() => {

        this.mostrarFormulario = false;

        this.cargarClientes();

      });

    } else {

      this.api.crearCliente(this.nombre)
        .subscribe(() => {

          this.mostrarFormulario = false;

          this.cargarClientes();

        });

    }

  }

  volver() {

    this.router.navigate(['/proyectos']);

  }

  cerrarSesion() {

    this.authService.cerrarSesion();

  }

  puedeCrearCliente(): boolean {

    return this.authService.esAdmin();

  }

  puedeEditarCliente(): boolean {

    return this.authService.esAdmin();

  }

}