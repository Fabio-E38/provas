import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { KbDocument } from '../models/kb-document.model';

@Injectable({
  providedIn: 'root',
})
export class KbService {
  private kbDocuments: KbDocument[] = [
    {
      id: 'kb-1',
      title: 'Reset password portale',
      summary: 'Procedura per reset password e verifica account bloccato.',
      fileType: 'Guida',
    },
    {
      id: 'kb-2',
      title: 'Errori comuni login',
      summary: 'Checklist rapida per errori di autenticazione.',
      fileType: 'Checklist',
    },
    {
      id: 'kb-3',
      title: 'Lentezza dashboard',
      summary: 'Passi per diagnosi prestazioni e raccolta evidenze.',
      fileType: 'Runbook',
    },
    {
      id: 'kb-4',
      title: 'Apertura ticket efficace',
      summary: 'Campi minimi da compilare per accelerare la presa in carico.',
      fileType: 'Best Practice',
    },
  ];

  suggestDocuments(query: string): Observable<KbDocument[]> {
    const normalized = query.toLowerCase();

    if (normalized.includes('login') || normalized.includes('password')) {
      return of(this.kbDocuments.filter(doc => doc.id === 'kb-1' || doc.id === 'kb-2'));
    }

    if (normalized.includes('lento') || normalized.includes('dashboard') || normalized.includes('performance')) {
      return of(this.kbDocuments.filter(doc => doc.id === 'kb-3' || doc.id === 'kb-4'));
    }

    return of(this.kbDocuments.filter(doc => doc.id === 'kb-4').concat(this.kbDocuments[0]));
  }
}
