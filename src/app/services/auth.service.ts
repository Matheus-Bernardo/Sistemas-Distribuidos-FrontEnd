import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = 'http://localhost:5200/api/auth';

  constructor(private http: HttpClient) {}

  register(data: { name: string; email: string; password: string }) {
    return this.http.post(`${this.base}/register`, data);
  }

  login(data: { email: string; password: string }) {
    return this.http.post(`${this.base}/login`, data);
  }

  logout() {
    try {
      localStorage.removeItem('token');
    } catch (e) {
      // ignore
    }
  }

  isAuthenticated(): boolean {
    try {
      return !!localStorage.getItem('token');
    } catch (e) {
      return false;
    }
  }
}
