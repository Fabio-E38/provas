import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KbDocument } from '../models/kb-document.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class KbService {
  private readonly api = environment.apiUrl;
  private readonly http = inject(HttpClient);

  suggestDocuments(query: string): Observable<KbDocument[]> {
    return this.http.get<KbDocument[]>(`${this.api}/kb/suggest`, { params: { q: query } });
  }
}
