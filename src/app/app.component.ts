import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <h1>Gerenciador de Produtos</h1>

    <nav *ngIf="!isAuthPage">
      <a routerLink="/products">Produtos</a> |
      <a routerLink="/products/create">Criar Produto</a> |
      <a routerLink="/orders/create">Comprar Produtos</a>
    </nav>

    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  constructor(private router: Router) {}

  get isAuthPage(): boolean {
    return !!this.router.url && this.router.url.startsWith('/auth');
  }
}

