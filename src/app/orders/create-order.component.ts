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

    <div class="cards-grid">
      <div *ngFor="let p of products" class="card">
        <div>
          <h3>{{ p.name }}</h3>
          <div class="desc">{{ p.description || '' }}</div>
          <div class="price">R$ {{ p.price }}</div>
          <div class="stock">Estoque: {{ p.stock ?? '-' }}</div>
        </div>

        <div class="qty-controls">
          <button type="button" class="small-btn" (click)="decrease(p)">-</button>
          <input type="number" class="qty-input" [(ngModel)]="quantities[p.id]" min="0" [max]="p.stock || 9999" />
          <button type="button" class="small-btn" (click)="increase(p)" [disabled]="(p.stock ?? 9999) <= (quantities[p.id] || 0)">+</button>
        </div>
      </div>
    </div>

    <div class="cart-summary">
      <div class="total">Itens: {{ totalItems }} — Total: R$ {{ totalPrice | number:'1.2-2' }}</div>
      <button class="checkout-btn" [disabled]="totalItems === 0" (click)="confirmPurchase()">Finalizar Compra</button>
    </div>

    <!-- Confirm modal -->
    <div *ngIf="showConfirmModal" class="modal-backdrop">
      <div class="modal">
        <h3>Confirmar Compra</h3>
        <div *ngIf="confirmItems.length; else nothingSelected">
          <ul>
            <li *ngFor="let it of confirmItems">{{ it.quantity }} x {{ it.name }} — R$ {{ (it.quantity * it.price) | number:'1.2-2' }}</li>
          </ul>
          <div style="margin-top:8px; font-weight:600">Total: R$ {{ totalPrice | number:'1.2-2' }}</div>
          <div class="actions">
            <button type="button" (click)="sendOrder()">Confirmar</button>
            <button type="button" (click)="showConfirmModal = false" style="background:#ccc; color:#000">Cancelar</button>
          </div>
        </div>
        <ng-template #nothingSelected>
          <p>Nenhum item selecionado.</p>
          <div class="actions">
            <button type="button" (click)="showConfirmModal = false" style="background:#ccc; color:#000">Fechar</button>
          </div>
        </ng-template>
      </div>
    </div>

    <!-- Result modal -->
    <div *ngIf="showResultModal" class="modal-backdrop">
      <div class="modal">
        <h3>{{ resultTitle }}</h3>
        <p>{{ resultMessage }}</p>
        <div class="actions">
          <button type="button" (click)="closeResult()">Ok</button>
        </div>
      </div>
    </div>
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
    this.productService.getAll().subscribe(x => {
      this.products = x || [];
      // initialize quantities to 0 for each product
      for (const p of this.products) {
        this.quantities[p.id] = this.quantities[p.id] || 0;
      }
    });
  }

  get totalItems(): number {
    return this.products.reduce((acc, p) => acc + (this.quantities[p.id] || 0), 0);
  }

  get totalPrice(): number {
    return this.products.reduce((acc, p) => acc + (this.quantities[p.id] || 0) * (p.price || 0), 0);
  }

  get confirmItems() {
    return this.products
      .filter(p => this.quantities[p.id] > 0)
      .map(p => ({ productId: p.id, name: p.name, quantity: this.quantities[p.id], price: p.price }));
  }

  showConfirmModal = false;
  showResultModal = false;
  resultMessage = '';
  resultTitle = '';
  increase(p: any) {
    const max = p.stock ?? 9999;
    const id = p.id;
    this.quantities[id] = (this.quantities[id] || 0) + 1;
    if (this.quantities[id] > max) this.quantities[id] = max;
  }

  decrease(p: any) {
    const id = p.id;
    this.quantities[id] = Math.max(0, (this.quantities[id] || 0) - 1);
  }
  confirmPurchase() {
    if (this.totalItems === 0) {
      // nothing selected
      this.resultTitle = 'Nada Selecionado';
      this.resultMessage = 'Selecione ao menos um produto antes de finalizar a compra.';
      this.showResultModal = true;
      return;
    }

    this.showConfirmModal = true;
  }

  sendOrder() {
    const items = this.confirmItems.map(i => ({ productId: i.productId, quantity: i.quantity, price: i.price }));
    // backend expects the request body to be the array of items (no wrapper object)
    this.orderService.create(items).subscribe({
      next: () => {
        this.resultTitle = 'Compra Concluída';
        this.resultMessage = 'Compra realizada com sucesso.';
        this.showResultModal = true;
        // reset quantities
        for (const p of this.products) this.quantities[p.id] = 0;
        this.showConfirmModal = false;
        // reload page shortly after success so UI resets completely
        setTimeout(() => window.location.reload(), 1200);
      },
      error: (err: any) => {
        console.error(err);
        this.resultTitle = 'Erro';
        this.resultMessage = err?.error?.message || 'Erro ao processar a compra.';
        this.showResultModal = true;
        this.showConfirmModal = false;
      }
    });
  }

  closeResult() {
    this.showResultModal = false;
    this.resultMessage = '';
    this.resultTitle = '';
  }
}
