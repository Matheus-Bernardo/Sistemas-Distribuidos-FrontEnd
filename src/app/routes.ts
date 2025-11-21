import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

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
    path: 'products',
    loadComponent: () =>
      import('./products/list-products.component').then(m => m.ListProductsComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'products/create',
    loadComponent: () =>
      import('./products/create-product.component').then(m => m.CreateProductComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'orders/create',
    loadComponent: () =>
      import('./orders/create-order.component').then(m => m.CreateOrderComponent),
    canActivate: [AuthGuard]
  }
  ,
  {
    path: 'auth',
    loadComponent: () =>
      import('./auth/auth.component').then(m => m.AuthComponent)
  }
];
