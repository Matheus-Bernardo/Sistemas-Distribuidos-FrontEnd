import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <h2 style="text-align:center; margin-bottom: 20px;">Autenticação</h2>

    <div style="max-width:480px; margin:0 auto;">
      <div style="display:flex; gap:8px; justify-content:center; margin-bottom:16px;">
        <button type="button" (click)="mode = 'login'" [disabled]="mode==='login'">Login</button>
        <button type="button" (click)="mode = 'register'" [disabled]="mode==='register'">Cadastro</button>
      </div>

      <div *ngIf="mode === 'register'">
        <form (ngSubmit)="register()">
          <label>Nome</label>
          <input [(ngModel)]="name" name="name" placeholder="Nome" />

          <label>Email</label>
          <input [(ngModel)]="email" name="email" type="email" placeholder="Email" />

          <label>Senha</label>
          <input [(ngModel)]="password" name="password" type="password" placeholder="Senha" />

          <button type="submit">Cadastrar</button>
        </form>
      </div>

      <div *ngIf="mode === 'login'">
        <form (ngSubmit)="login()">
          <label>Email</label>
          <input [(ngModel)]="loginEmail" name="loginEmail" type="email" placeholder="Email" />

          <label>Senha</label>
          <input [(ngModel)]="loginPassword" name="loginPassword" type="password" placeholder="Senha" />

          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  `
})
export class AuthComponent {
  mode: 'login' | 'register' = 'login';

  // register fields
  name = '';
  email = '';
  password = '';

  // login fields
  loginEmail = '';
  loginPassword = '';

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    const payload = { name: this.name, email: this.email, password: this.password };
    this.auth.register(payload).subscribe({
      next: () => this.router.navigate(['/products']),
      error: err => console.error('Register error', err)
    });
  }

  login() {
    const payload = { email: this.loginEmail, password: this.loginPassword };
    this.auth.login(payload).subscribe({
      next: () => this.router.navigate(['/products']),
      error: err => console.error('Login error', err)
    });
  }
}
