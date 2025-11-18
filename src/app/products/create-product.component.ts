import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'create-product',
  standalone: true,
  imports: [FormsModule, RouterModule],
  template: `
    <h2 style="text-align:center; margin-bottom: 20px;">Criar Produto</h2>

    <form (ngSubmit)="save()">
      <label>Nome</label>
      <input [(ngModel)]="name" name="name" placeholder="Nome do produto" />

      <label>Descrição</label>
      <input [(ngModel)]="description" name="description" placeholder="Descrição" />

      <label>Preço</label>
      <input [(ngModel)]="price" name="price" type="number" placeholder="Preço" />

      <label>Estoque</label>
      <input [(ngModel)]="stock" name="stock" type="number" placeholder="Quantidade em estoque" />

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
