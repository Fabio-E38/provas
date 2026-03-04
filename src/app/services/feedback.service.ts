import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feedback } from '../models/feedback.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private readonly api = environment.apiUrl;
  private readonly http = inject(HttpClient);

  submitFeedback(payload: Feedback): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(`${this.api}/feedback`, payload);
  }

  getFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.api}/feedback`);
  }
}