import { Routes } from '@angular/router';
import { CreateProductComponent } from './products/create-product.component';
import { ListProductsComponent } from './products/list-products.component';
import { CreateOrderComponent } from './orders/create-order.component';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ListProductsComponent },
  { path: 'products/create', component: CreateProductComponent },
  { path: 'orders/create', component: CreateOrderComponent }
];
