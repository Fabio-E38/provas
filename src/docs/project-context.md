# Portale Ticketing — Contesto Progetto

## Obiettivo
Restyling di un sistema di ticketing legacy → portale **proattivo e AI-driven**. Il chatbot è il punto d’ingresso principale: risolve problemi *prima* di aprire un ticket. Il form ticket è un fallback, mai la prima cosa mostrata.

## Principio di Scalabilità
Ogni decisione architetturale segue questa regola: **un tutor deve poter cambiare colori, layout o logica toccando il minor numero possibile di file.**

| Dove | Come |
|---|---|
| **Colori / tema** | Variabili CSS in `styles.css` `:root` — `--brand-primary`, `--brand-primary-rgb`, `--n0`…`--n800`, status/priority tokens. Zero colori hardcoded nei componenti. |
| **Layout condiviso** | `AppShellComponent` (sidebar + topbar + `<ng-content>`) — tutte le pagine interne lo usano. |
| **Stili riusabili** | `shared/styles/form-page.css` (classi `.fp-*`) per form card. `shared/styles/auth-base.css` per pagine auth. |
| **Componenti** | Solo presentational (`@Input`/`@Output`), logica nei `services/`. |
| **Codice** | Minimal, funzionale, nessuna sovra-ingegnerizzazione. |

## Backend & Mock Strategy
Il frontend **non** contiene mock in-memory nei services. Tutti i services usano `HttpClient` e puntano a `environment.apiUrl`.

| Ambiente | `apiUrl` | Backend |
|---|---|---|
| **Dev** | `http://localhost:3000` | **Mockoon** — server mock locale con route JSON |
| **Prod** | URL del backend reale | API REST custom → D365 |

**Flusso**: Mockoon simula le risposte → Postman per testare le route → quando arriva il backend reale, si cambia solo `apiUrl` e il formato del token JWT. Zero modifiche ai services.

L’`authInterceptor` inietta automaticamente il Bearer token da localStorage su ogni richiesta HTTP.

## Fasi

| # | Stato | Descrizione |
|---|---|---|
| 1–8, 12 | ✅ | Struttura, modelli, routing, auth JWT, UI pagine, overlay pattern, forgot/reset-password |
| 9 | ⏳ | Refactor services → HttpClient + Mockoon (sostituisce mock in-memory) |
| 10 | ⏳ | Chat + KB con API AI reale |
| 11 | ⏳ | Rifinitura (validazioni, errori, performance) |
| 13 | ⏳ | ThemeService — al login carica colori/logo del tenant via `setProperty()` |

## Stack

| | |
|---|---|
| **Framework** | Angular 21 — standalone components, `inject()`, `@if`/`@for` |
| **State** | RxJS `BehaviorSubject` (NgRx valutato in futuro) |
| **HTTP** | HttpClient + JWT Interceptor (token da localStorage) |
| **Backend dev** | Mockoon (localhost:3000) + Postman per testing |
| **Backend prod** | API REST custom → D365 (frontend mai direttamente a D365) |
| **Stile** | CSS custom properties + Tailwind utilities. Estetica Notion/Linear: flat, bordi sottili, ombre minime. |

## Struttura

```
src/app/
  models/       → interfacce TS (ticket, user, feedback, chat-message, kb-document)
  services/     → logica, API (HttpClient), auth.guard, auth.interceptor, overlay.service
  shared/       → components/ (app-shell, overlay-container), styles/, directives/, pipes/
  pages/        → auth/, home/, cases/, ticket/, chat/, feedback/
src/styles.css  → :root con tutti i design tokens
src/docs/       → questo file
```

## Modelli Dati
> ⚠️ Usa **solo** i campi elencati. Non inventare campi, modelli o endpoint.

| Modello | Campi chiave |
|---|---|
| **Ticket** | id, numberId, title, subject, description, priority, severity, status, statusReason, origin, customer, email, product, createdOn |
| **User** | id, name, email, role, department? — `tenantId` in valutazione per Fase 13 |
| **Feedback** | title, rating, comments?, source |
| **ChatMessage** | id, sender (`user`\|`bot`), text, createdAt |
| **KbDocument** | id, title, summary, fileType |

## API (Mockoon routes)

```
POST /auth/login               → { token, user }
POST /auth/forgot-password     → { message }
POST /auth/reset-password      → { message }

GET  /tickets                  → Ticket[]
GET  /tickets/:id              → Ticket
POST /tickets                  → Ticket (created)
PATCH /tickets/:id             → Ticket (updated)

GET  /account/:id              → Account
GET  /contact/:id              → Contact

POST /feedback                 → { success, message }
GET  /feedback                 → Feedback[]

POST /chat                     → { reply, resolved }
GET  /kb/suggest?q=...         → KbDocument[]
```

Se un endpoint non è pronto su Mockoon → configurarlo prima di usarlo nel frontend.

## Flusso Overlay

`overlay.service.ts` gestisce `OverlayType = 'chat' | 'ticket' | 'feedback' | null`.

```
Home → CTA "Descrivi il problema" → ChatOverlay (chat + KB panel)
  → Risolto  → chiusura overlay
  → Non risolto → redirect /ticket → dopo invio → feedback-overlay
```

## Regole

1. **Componenti presentational** — `@Input`/`@Output`, zero logica di business
2. **Logica nei services** — chiamate API via HttpClient, stato, navigazione
3. **`inject()` sempre** — preferire a constructor injection
4. **Zero colori hardcoded** — tutto via `var(--token)` definiti in `styles.css`
5. **Zero mock in-memory nei services** — tutti usano `HttpClient` → `environment.apiUrl` (Mockoon in dev)
6. **Non inventare** campi, modelli o endpoint non documentati qui
