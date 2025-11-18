import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'list-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <h2>Produtos</h2>

   <div *ngFor="let p of products" class="product-card">
      <h3>{{ p.name }}</h3>
      <p>{{ p.description }}</p>
      <strong>R$ {{ p.price }}</strong>
    </div>

  `
})
export class ListProductsComponent implements OnInit {
  products: any[] = [];

  constructor(private service: ProductService) { }

  ngOnInit() {
    this.service.getAll().subscribe(x => (this.products = x));
  }
}
