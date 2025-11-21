import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean | UrlTree {
    try {
      const token = localStorage.getItem('token');
      if (token) return true;
    } catch (e) {
      // ignore errors reading localStorage
    }

    // redirect to auth page when not authenticated
    return this.router.parseUrl('/auth');
  }
}
