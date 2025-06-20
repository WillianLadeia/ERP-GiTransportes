import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = '/api';  

  constructor(private http: HttpClient) {}

  login(user: string, password: string): Observable<any> {
    const body = { user, password };
    return this.http.post(`${this.baseUrl}/login`, body);
  }

  logout() {
    // Aqui pode limpar tokens, dados, etc
  }

  isAuthenticated(): boolean {
    
    return sessionStorage.getItem('usuarioId') !== null;
  }
}
