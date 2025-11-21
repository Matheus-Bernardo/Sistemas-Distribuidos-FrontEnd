import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private base = 'http://localhost:5200/api/orders';

  constructor(private http: HttpClient) {}

  // Send the items array as the request body (backend expects an array of order items)
  create(items: Array<{ productId: string; quantity: number; price: number }>) {
    return this.http.post(this.base, items);
  }
}
