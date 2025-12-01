import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthInfo } from '../models/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly http = inject(HttpClient);

  // TODO: Move to environment
  private readonly apiUrl = 'http://localhost:9000/api';

  logout() {
    return this.http.get(`${this.apiUrl}/logout`);
  }

  login(body: AuthInfo) {
    return this.http.post(`${this.apiUrl}/login`, body);
  }
}
