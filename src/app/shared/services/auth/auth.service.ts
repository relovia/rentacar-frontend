import { Injectable } from '@angular/core';
import {
  AuthenticationControllerService,
  LoginRequest,
  LoginResponse,
} from '../api';
import { TokenService } from '../token/token.service';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private authControllerServices: AuthenticationControllerService,
    private tokenServices: TokenService,
    private router: Router
  ) {}

  // Check if the user is logged in
  isLoggedIn(): boolean {
    const token = this.tokenServices.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // Check if the token is expired
  private isTokenExpired(token: string): boolean {
    const payload = this.getPayloadFromToken(token);
    if (!payload) return true;

    const expirationTime = payload.exp;
    const currentTime = Math.floor(Date.now() / 1000);
    return currentTime > expirationTime;
  }

  // Log the user in
  login(email: string, password: string): Observable<LoginResponse> {
    const loginRequest: LoginRequest = {
      email,
      password,
    };

    return this.authControllerServices.login({ loginRequest }).pipe(
      tap((response) => {
        this.tokenServices.setToken(response.token!);
      })
    );
  }

  // Log the user out
  logout(): void {
    this.tokenServices.clearToken();
    this.router.navigate(['/login']);
  }

  // Get the role of the user from the token
  getRole(): string | null {
    const token = this.tokenServices.getToken();
    if (!token) return null;

    try {
      const payload = this.getPayloadFromToken(token);
      console.log('payload', payload);
      console.log("Payload's role: ", payload.role);
      return payload.role || null;
    } catch (error) {
      console.error('Error decoding token payload:', error);
      return null;
    }
  }

  private getPayloadFromToken(token: string): any {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload;
    } catch (error) {
      console.error('Error decoding token payload:', error);
      return null;
    }
  }
}
