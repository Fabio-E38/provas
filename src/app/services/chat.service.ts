import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private readonly api = environment.apiUrl;
  private readonly http = inject(HttpClient);

  sendMessage(message: string): Observable<{ reply: string; resolved: boolean }> {
    return this.http.post<{ reply: string; resolved: boolean }>(`${this.api}/chat`, { message });
  }
}
