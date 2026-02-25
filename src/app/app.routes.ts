import { Routes } from '@angular/router';
import { authGuard } from './services/auth.guard';

// Routes è il tipo Angular per definire l'array delle rotte.
// Fornisce autocompletamento e controllo errori TypeScript.

export const routes: Routes = [

  // Rotta di default: quando l'URL è vuoto "/" reindirizza a "/home".
  // pathMatch: 'full' = corrisponde SOLO all'URL esattamente vuoto.
  // Senza 'full', "" corrisponderebbe a qualsiasi URL (es. /cases, /ticket...).
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Rotta pubblica: accessibile senza autenticazione.
  { 
    path: 'login', 
    loadComponent: () => import('./pages/auth/login.component')
      .then(m => m.LoginComponent) 
  },

  // Rotte pubbliche aggiuntive: accessibili senza autenticazione.
  {
    path: 'forgot-password',
    loadComponent: () => import('./pages/auth/forgot-password.component')
      .then(m => m.ForgotPasswordComponent)
  },
  {
    path: 'reset-password',
    loadComponent: () => import('./pages/auth/reset-password.component')
      .then(m => m.ResetPasswordComponent)
  },

  // Rotte protette (usano canActivate: [authGuard]).
  // Usano tutte lazy loading: il componente viene scaricato solo quando
  // l'utente naviga su quella rotta, non all'avvio dell'app.
  { 
    path: 'home',       
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    canActivate: [authGuard]
  },
  { 
    path: 'cases',      
    loadComponent: () => import('./pages/cases/cases-list.component').then(m => m.CasesListComponent),
    canActivate: [authGuard]
  },
  { 
    path: 'cases/:id',  
    loadComponent: () => import('./pages/cases/case-detail.component').then(m => m.CaseDetailComponent),
    canActivate: [authGuard]
  },
  { 
    path: 'ticket',     
    loadComponent: () => import('./pages/ticket/ticket-form.component').then(m => m.TicketFormComponent),
    canActivate: [authGuard]
  },
  { 
    path: 'feedback',   
    loadComponent: () => import('./pages/feedback/feedback.component').then(m => m.FeedbackComponent),
    canActivate: [authGuard]
  },

  // Wildcard: qualsiasi URL non riconosciuto viene reindirizzato a /home.
  // Va sempre messo come ULTIMA rotta, altrimenti blocca le rotte successive.
  { path: '**', redirectTo: '/login' }

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