import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private base = 'http://localhost:5000/api/orders';

  constructor(private http: HttpClient) {}

  create(data: any) {
    return this.http.post(this.base, data);
  }
}
