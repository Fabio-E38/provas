import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  sendMessage(message: string): Observable<{ reply: string; resolved: boolean }> {
    const normalized = message.toLowerCase();

    const isLikelyResolvedTopic =
      normalized.includes('password') ||
      normalized.includes('login') ||
      normalized.includes('accesso');

    if (isLikelyResolvedTopic) {
      return of({
        reply:
          'Ho trovato una possibile soluzione dalla knowledge base. Prova i passaggi consigliati e conferma se il problema è risolto.',
        resolved: true,
      }).pipe(delay(500));
    }

    return of({
      reply:
        'Non ho trovato una soluzione certa in autonomia. Ti consiglio di aprire un ticket così il team può gestirlo rapidamente.',
      resolved: false,
    }).pipe(delay(500));
  }
}
