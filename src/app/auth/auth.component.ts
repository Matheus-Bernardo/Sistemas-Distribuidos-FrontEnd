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
        <button type="button" (click)="setMode('login')" [disabled]="mode==='login'">Login</button>
        <button type="button" (click)="setMode('register')" [disabled]="mode==='register'">Cadastro</button>
      </div>

      <div *ngIf="message" [ngClass]="{ 'success': messageType==='success', 'error': messageType==='error' }" style="margin-bottom:12px; padding:8px; border-radius:4px;">{{ message }}</div>

      <div *ngIf="mode === 'register'">
        <form #registerForm="ngForm" (ngSubmit)="register(registerForm)">
          <label>Nome</label>
          <input [(ngModel)]="name" name="name" placeholder="Nome" required #nameCtrl="ngModel" />
          <div *ngIf="nameCtrl.invalid && (nameCtrl.dirty || nameCtrl.touched)" style="color:#c00; font-size:0.9em;">Nome é obrigatório.</div>

          <label>Email</label>
          <input [(ngModel)]="email" name="email" type="email" placeholder="Email" required email #emailCtrl="ngModel" />
          <div *ngIf="emailCtrl.invalid && (emailCtrl.dirty || emailCtrl.touched)" style="color:#c00; font-size:0.9em;">
            <span *ngIf="emailCtrl.errors?.required">Email é obrigatório.</span>
            <span *ngIf="emailCtrl.errors?.email">Email inválido.</span>
          </div>

          <label>Senha</label>
          <input [(ngModel)]="password" name="password" type="password" placeholder="Senha" required minlength="6" #passwordCtrl="ngModel" />
          <div *ngIf="passwordCtrl.invalid && (passwordCtrl.dirty || passwordCtrl.touched)" style="color:#c00; font-size:0.9em;">
            <span *ngIf="passwordCtrl.errors?.required">Senha é obrigatória.</span>
            <span *ngIf="passwordCtrl.errors?.minlength">Senha precisa ter ao menos 6 caracteres.</span>
          </div>

          <button type="submit" [disabled]="registerForm.invalid || loading">{{ loading ? 'Enviando...' : 'Cadastrar' }}</button>
        </form>
      </div>

      <div *ngIf="mode === 'login'">
        <form #loginForm="ngForm" (ngSubmit)="login(loginForm)">
          <label>Email</label>
          <input [(ngModel)]="loginEmail" name="loginEmail" type="email" placeholder="Email" required email #loginEmailCtrl="ngModel" />
          <div *ngIf="loginEmailCtrl.invalid && (loginEmailCtrl.dirty || loginEmailCtrl.touched)" style="color:#c00; font-size:0.9em;">
            <span *ngIf="loginEmailCtrl.errors?.required">Email é obrigatório.</span>
            <span *ngIf="loginEmailCtrl.errors?.email">Email inválido.</span>
          </div>

          <label>Senha</label>
          <input [(ngModel)]="loginPassword" name="loginPassword" type="password" placeholder="Senha" required minlength="6" #loginPasswordCtrl="ngModel" />
          <div *ngIf="loginPasswordCtrl.invalid && (loginPasswordCtrl.dirty || loginPasswordCtrl.touched)" style="color:#c00; font-size:0.9em;">
            <span *ngIf="loginPasswordCtrl.errors?.required">Senha é obrigatória.</span>
            <span *ngIf="loginPasswordCtrl.errors?.minlength">Senha precisa ter ao menos 6 caracteres.</span>
          </div>

          <button type="submit" [disabled]="loginForm.invalid || loading">{{ loading ? 'Enviando...' : 'Entrar' }}</button>
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

  loading = false;
  message = '';
  messageType: 'success' | 'error' = 'success';

  constructor(private auth: AuthService, private router: Router) {}

  setMode(m: 'login' | 'register') {
    this.mode = m;
    this.message = '';
  }

  register(form: any) {
    if (form.invalid) {
      this.messageType = 'error';
      this.message = 'Preencha corretamente os campos do formulário.';
      return;
    }

    this.loading = true;
    const payload = { name: this.name, email: this.email, password: this.password };
    this.auth.register(payload).subscribe({
      next: (res: any) => {
        const token = res?.token || res?.accessToken;
        if (token) localStorage.setItem('token', token);
        this.messageType = 'success';
        this.message = 'Cadastro realizado com sucesso.';
        this.router.navigate(['/products']);
      },
      error: err => {
        this.messageType = 'error';
        this.message = err?.error?.message || 'Erro ao cadastrar.';
      },
      complete: () => (this.loading = false)
    });
  }

  login(form: any) {
    if (form.invalid) {
      this.messageType = 'error';
      this.message = 'Preencha corretamente os campos do formulário.';
      return;
    }

    this.loading = true;
    const payload = { email: this.loginEmail, password: this.loginPassword };
    this.auth.login(payload).subscribe({
      next: (res: any) => {
        const token = res?.token || res?.accessToken;
        if (token) localStorage.setItem('token', token);
        this.messageType = 'success';
        this.message = 'Login realizado com sucesso.';
        this.router.navigate(['/products']);
      },
      error: err => {
        this.messageType = 'error';
        this.message = err?.error?.message || 'Erro ao efetuar login.';
      },
      complete: () => (this.loading = false)
    });
  }
}
