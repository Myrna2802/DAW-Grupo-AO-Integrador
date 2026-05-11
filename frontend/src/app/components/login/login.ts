import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  nombre = '';
  clave = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.error = '';
    this.authService.login(this.nombre, this.clave).subscribe({
      next: (res) => {
        this.authService.guardarToken(res.access_token);
        this.router.navigate(['/proyectos']);
      },
      error: () => {
        this.error = 'Usuario o clave incorrectos';
      }
    });
  }
}