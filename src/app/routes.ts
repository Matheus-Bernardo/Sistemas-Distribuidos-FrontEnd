import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },

  {
    path: 'products',
    loadComponent: () =>
      import('./products/list-products.component').then(m => m.ListProductsComponent)
  },
  {
    path: 'products/create',
    loadComponent: () =>
      import('./products/create-product.component').then(m => m.CreateProductComponent)
  },
  {
    path: 'orders/create',
    loadComponent: () =>
      import('./orders/create-order.component').then(m => m.CreateOrderComponent)
  }
  ,
  {
    path: 'auth',
    loadComponent: () =>
      import('./auth/auth.component').then(m => m.AuthComponent)
  }
];
