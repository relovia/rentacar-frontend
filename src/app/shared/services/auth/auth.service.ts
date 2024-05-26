import { Injectable } from '@angular/core';
import {
  AuthenticationControllerService,
  LoginRequest,
  LoginResponse,
} from '../api';
import { TokenService } from '../token/token.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private authControllerServices: AuthenticationControllerService,
    private tokenServices: TokenService
  ) {}

  // Check if the user is logged in
  isLoggedIn(): boolean {
    const token = this.tokenServices.token;
    return token !== null && !this.isTokenExpired(token);
  }

  // Check if the token is expired
  private isTokenExpired(token: string): boolean {
    const payload = JSON.parse(atob(token.split('.')[1]));
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
        this.tokenServices.token = response.token!;
      })
    );
  }

  // Log the user out
  logout(): void {
    this.tokenServices.clearToken();
  }

  // Get the role of the user from the token
  getRole(): string | null {
    const token = this.tokenServices.token;
    if (!token) return null;

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role || null;
  }
}
