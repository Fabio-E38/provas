import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Feedback } from '../models/feedback.model';
import { MOCK_FEEDBACKS } from '../models/mock-data';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private feedbacks: Feedback[] = [...MOCK_FEEDBACKS];

  submitFeedback(payload: Feedback): Observable<{ success: boolean; message: string }> {
    this.feedbacks.push(payload);
    return of({
      success: true,
      message: 'Feedback inviato con successo.'
    });
  }

  getFeedbacks(): Observable<Feedback[]> {
    return of(this.feedbacks);
  }
}