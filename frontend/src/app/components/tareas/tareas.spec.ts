import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { Tareas } from './tareas';
import { ApiService } from '../../services/api';
import { AuthService } from '../../services/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

describe('Tareas', () => {
  let component: Tareas;
  let fixture: ComponentFixture<Tareas>;
  let apiService: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    apiService = jasmine.createSpyObj('ApiService', ['actualizarTarea']);
    apiService.actualizarTarea.and.returnValue(of({}));

    const authService = jasmine.createSpyObj('AuthService', ['esAdmin', 'esLider', 'cerrarSesion']);
    authService.esAdmin.and.returnValue(true);
    authService.esLider.and.returnValue(false);

    await TestBed.configureTestingModule({
      imports: [Tareas],
      providers: [
        { provide: ApiService, useValue: apiService },
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } },
        { provide: ChangeDetectorRef, useValue: { detectChanges: jasmine.createSpy('detectChanges') } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Tareas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should mark a task as finalized', () => {
    const tarea = { id: 7, descripcion: 'Revisar entregable', estado: 'PENDIENTE' };
    const cargarSpy = spyOn(component, 'cargarTareas');

    component.marcarComoFinalizada(tarea);

    expect(apiService.actualizarTarea).toHaveBeenCalledWith(7, 'Revisar entregable', 'FINALIZADA');
    expect(cargarSpy).toHaveBeenCalled();
  });
});
