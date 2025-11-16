import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'list-products',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Produtos</h2>

    <ul>
      <li *ngFor="let p of products">
        {{ p.name }} — R$ {{ p.price }} ({{ p.stock }} em estoque)
      </li>
    </ul>
  `
})
export class ListProductsComponent implements OnInit {
  products: any[] = [];

  constructor(private service: ProductService) {}

  ngOnInit() {
    this.service.getAll().subscribe(x => (this.products = x));
  }
}
