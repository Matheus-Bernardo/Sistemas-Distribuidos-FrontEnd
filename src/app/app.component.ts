import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `
    <h1>Gerenciador de Produtos</h1>

    <nav>
      <a routerLink="/products">Produtos</a> |
      <a routerLink="/products/create">Criar Produto</a> |
      <a routerLink="/orders/create">Comprar Produtos</a>
    </nav>

    <router-outlet></router-outlet>
  `
})
export class AppComponent {}
