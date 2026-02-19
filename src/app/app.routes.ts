import { Routes } from '@angular/router';

// Routes è il tipo Angular per definire l'array delle rotte.
// Fornisce autocompletamento e controllo errori TypeScript.

export const routes: Routes = [

  // Rotta di default: quando l'URL è vuoto "/" reindirizza a "/home".
  // pathMatch: 'full' = corrisponde SOLO all'URL esattamente vuoto.
  // Senza 'full', "" corrisponderebbe a qualsiasi URL (es. /cases, /ticket...).
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // Rotta pubblica: accessibile senza autenticazione.
  // Dopo aver configurato MSAL, questa sarà l'unica rotta senza MsalGuard.
  { 
    path: 'login', 
    loadComponent: () => import('./pages/auth/login.component')
      .then(m => m.LoginComponent) 
  },

  // Rotte protette (dopo Fase 4 avranno canActivate: [MsalGuard]).
  // Usano tutte lazy loading: il componente viene scaricato solo quando
  // l'utente naviga su quella rotta, non all'avvio dell'app.
  { path: 'home',       loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'cases',      loadComponent: () => import('./pages/cases/cases-list.component').then(m => m.CasesListComponent) },
  { path: 'cases/:id',  loadComponent: () => import('./pages/cases/case-detail.component').then(m => m.CaseDetailComponent) },
  { path: 'ticket',     loadComponent: () => import('./pages/ticket/ticket-form.component').then(m => m.TicketFormComponent) },
  { path: 'feedback',   loadComponent: () => import('./pages/feedback/feedback.component').then(m => m.FeedbackComponent) },

  // Wildcard: qualsiasi URL non riconosciuto viene reindirizzato a /home.
  // Va sempre messo come ULTIMA rotta, altrimenti blocca le rotte successive.
  { path: '**', redirectTo: '/home' }

];

// -----------------------------------------------------------------------
// LAZY LOADING vs EAGER LOADING
// -----------------------------------------------------------------------
// Lazy loading (usato qui):
//   - il componente viene caricato solo quando l'utente visita la rotta
//   - sintassi: loadComponent: () => import('...').then(m => m.NomeComponente)
//   - vantaggio: avvio app più veloce, meno banda usata
//
// Eager loading (NON usato):
//   - tutti i componenti vengono importati in cima al file e caricati subito
//   - sintassi: import { HomeComponent } from './pages/home/home.component'
//   - svantaggio: avvio app più lento perché carica tutto subito
//
// -----------------------------------------------------------------------
// OVERLAY (chat, ticket, feedback)
// -----------------------------------------------------------------------
// Gli overlay NON hanno una rotta perché non sono pagine navigabili.
// Si aprono sopra la pagina corrente tramite overlay.service.ts.
// Esempio: ChatOverlay si apre su /home senza cambiare URL.
// -----------------------------------------------------------------------