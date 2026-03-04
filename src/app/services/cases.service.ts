import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountMock, ContactMock } from '../models/mock-data';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CasesService {
  private readonly api = environment.apiUrl;
  private readonly http = inject(HttpClient);

  getAccountById(id: string): Observable<AccountMock> {
    return this.http.get<AccountMock>(`${this.api}/account/${id}`);
  }

  getContactById(id: string): Observable<ContactMock> {
    return this.http.get<ContactMock>(`${this.api}/contact/${id}`);
  }
}