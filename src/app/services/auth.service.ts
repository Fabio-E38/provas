import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User, UserRole } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'auth_user';

  // BehaviorSubject per mantenere lo stato dell'utente reattivo
  private currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Ritorna true se c'è un token salvato
  get isUserLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Ritorna l'utente corrente (non reattivo)
  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  // Recupera il token dal localStorage
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Metodo di login (MOCK per ora, poi chiamerà l'API reale)
  login(email: string, password: string): Observable<any> {
    // TODO: Sostituire con chiamata HTTP reale quando l'API è pronta
    // return this.http.post(`${environment.apiUrl}/auth/login`, { email, password }).pipe(...)
    
    console.log('Mock login per:', email);
    
    // Simuliamo una risposta dal backend
    const mockResponse = {
      token: 'mock-jwt-token-12345',
      user: {
        id: '1',
        email: email,
        name: 'Utente Test',
        role: UserRole.Employee
      }
    };

    // Simuliamo il salvataggio dei dati
    this.saveAuthData(mockResponse.token, mockResponse.user);
    
    return of(mockResponse);
  }

  // Metodo di logout
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUserSubject.next(null);
  }

  // Mock: invia email con link di reset — TODO: POST /auth/forgot-password
  forgotPassword(email: string): Observable<void> {
    console.log('Mock forgot password per:', email);
    return of(undefined).pipe(delay(600));
  }

  // Mock: reset password con token dall'URL — TODO: POST /auth/reset-password
  resetPassword(token: string, newPassword: string): Observable<void> {
    console.log('Mock reset password con token:', token);
    return of(undefined).pipe(delay(600));
  }

  // Salva token e utente nel localStorage
  private saveAuthData(token: string, user: User): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  // Recupera l'utente dal localStorage all'avvio dell'app
  private getUserFromStorage(): User | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (e) {
        return null;
      }
    }
    return null;
  }
}