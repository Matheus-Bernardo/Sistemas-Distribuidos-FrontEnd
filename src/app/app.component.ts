import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="site-header">
      <div class="site-brand">
        <div class="site-title">Gerenciador de Produtos</div>
      </div>
      <div class="page-container">
        <nav class="main-nav" *ngIf="!isAuthPage">
          <div class="nav-left">
            <a routerLink="/products">Produtos</a>
            <a routerLink="/products/create">Criar Produto</a>
            <a routerLink="/orders/create">Comprar Produtos</a>
          </div>
          <div class="nav-right">
            <button *ngIf="isLogged" (click)="logout()" class="logout-btn btn-auto" title="Logout">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M16 17L21 12L16 7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M21 12H9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M13 19H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Logout
            </button>
          </div>
        </nav>
      </div>
    </header>

    <main class="page-container">
      <router-outlet></router-outlet>
    </main>
  `
})
export class AppComponent {
  constructor(private router: Router, private auth: AuthService) {}

  get isAuthPage(): boolean {
    return !!this.router.url && this.router.url.startsWith('/auth');
  }

  get isLogged(): boolean {
    return this.auth.isAuthenticated();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/auth']);
  }
}

