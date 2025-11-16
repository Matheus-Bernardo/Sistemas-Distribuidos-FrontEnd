import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private base = 'http://localhost:5000/api/products';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any[]>(this.base);
  }

  create(data: any) {
    return this.http.post(this.base, data);
  }
}
