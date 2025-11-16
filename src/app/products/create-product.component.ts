import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'create-product',
  standalone: true,
  imports: [FormsModule],
  template: `
    <h2>Criar Produto</h2>

    <form (ngSubmit)="save()">
      <input [(ngModel)]="name" name="name" placeholder="Nome" />
      <input [(ngModel)]="description" name="description" placeholder="Descrição" />

      <input [(ngModel)]="price" name="price" type="number" placeholder="Preço" />
      <input [(ngModel)]="stock" name="stock" type="number" placeholder="Estoque" />

      <button type="submit">Salvar</button>
    </form>
  `
})
export class CreateProductComponent {
  name = '';
  description = '';
  price = 0;
  stock = 0;

  constructor(private service: ProductService) {}

  save() {
    this.service.create({
      name: this.name,
      description: this.description,
      price: this.price,
      stock: this.stock
    }).subscribe();
  }
}
