import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly TOKEN_KEY = 'authToken';

  // Set the token in local storage
  set token(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  // Get the token from local storage
  get token(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Remove the token from local storage
  clearToken() {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}
