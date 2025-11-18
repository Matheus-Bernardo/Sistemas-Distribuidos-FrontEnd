import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { OrderService } from '../services/order.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'create-order',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  template: `
    <h2>Comprar Produtos</h2>

    <div *ngFor="let p of products">
      <label>{{ p.name }} — R$ {{ p.price }}</label>
      <input type="number" [(ngModel)]="quantities[p.id]" />
    </div>

    <button (click)="buy()">Finalizar Compra</button>
  `
})
export class CreateOrderComponent implements OnInit {
  products: any[] = [];
  quantities: any = {};

  constructor(
    private productService: ProductService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.productService.getAll().subscribe(x => (this.products = x));
  }

  buy() {
    const items = this.products
      .filter(p => this.quantities[p.id] > 0)
      .map(p => ({
        productId: p.id,
        quantity: this.quantities[p.id],
        price: p.price
      }));

    this.orderService.create({
      userId: '123',
      items
    }).subscribe();
  }
}
