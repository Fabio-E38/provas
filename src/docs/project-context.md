# Portale Ticketing â€” Contesto Progetto

## Fasi

| # | Stato | Descrizione |
|---|---|---|
| 1â€“3 | âœ… | Struttura, modelli TypeScript, routing + lazy loading |
| 4 | âœ… | Auth Custom JWT â€” Service, Guard, Interceptor, Environments |
| 5 | âœ… | UI Login + Mock Data |
| 6 | âœ… | UI pagine interne con `AppShellComponent` condiviso (sidebar + topbar) |
| 7 | âœ… | Componenti shared â€” `overlay-container`; `button`, `toast`, `modal` placeholder |
| 8 | âœ… | Overlay pattern â€” `overlay.service` + flusso chat â†’ ticket â†’ feedback MVP |
| 12 | âœ… | `forgot-password` e `reset-password` (validatore cross-field, redirect automatico) |
| 9 | â³ | API reale D365 â€” `CasesService` â†’ `AccountService`; nuovi modelli `account`, `contact` |
| 10 | â³ | Chat + KB AI con API reale |
| 11 | â³ | Rifinitura â€” validazioni, errori, performance |
| 13 | â³ | Theming tenant â€” `ThemeService` inietta CSS vars al login |

---

## Filosofia UX

| Principio | Dettaglio |
|---|---|
| **Chatbot-first** | Il chatbot Ã¨ il punto d'ingresso principale. Il form ticket Ã¨ escalation, non primo accesso. |
| **Proattiva** | La Home invita ad agire ("Come posso aiutarti?"), non mostra tabelle passive. |
| **Role-based** | `Employee` vede solo i propri ticket. `Support`/`Admin` vedono tutto. |

---

## Stack

| Layer | Scelta |
|---|---|
| Framework | Angular 21 â€” standalone components, `inject()`, `@if`/`@for` |
| Stili | CSS custom properties + Tailwind utility classes (nessun framework CSS imposto) |
| State | RxJS `BehaviorSubject` â€” NgRx valutato per il futuro |
| HTTP | `HttpClient` + `AuthInterceptor` JWT automatico |
| Backend | API REST custom â†’ Dynamics 365 (il frontend non accede mai direttamente a D365) |
| Icons | SVG inline Lucide |

---

## Struttura Cartelle

```
src/app/
â”œâ”€â”€ models/        â†’ interfacce TypeScript (ticket, user, feedback, chat-message, kb-document)
â”œâ”€â”€ services/      â†’ logica business: auth, ticket, cases, chat, kb, feedback, overlay
â”œâ”€â”€ shared/
â”‚   â”œâ”€â”€ components/
â”‚   â”‚   â”œâ”€â”€ app-shell/        â†’ AppShellComponent â€” layout condiviso (sidebar + topbar)
â”‚   â”‚   â”œâ”€â”€ overlay-container/ â†’ ng-content condizionale per overlay
â”‚   â”‚   â””â”€â”€ ...               â†’ modal, toast, button, card (placeholder)
â”‚   â””â”€â”€ styles/
â”‚       â”œâ”€â”€ auth-base.css     â†’ stili condivisi pagine auth (glassmorphism)
â”‚       â””â”€â”€ form-page.css     â†’ stili condivisi card/form pagine interne
â””â”€â”€ pages/
    â”œâ”€â”€ auth/     â†’ login, forgot-password, reset-password
    â”œâ”€â”€ home/     â†’ Bento Grid: hero search + stats + KB + CTA chat
    â”œâ”€â”€ cases/    â†’ cases-list (tabella filtrata), case-detail (dettaglio 2-col)
    â”œâ”€â”€ ticket/   â†’ ticket-form (form apertura), ticket-edit (placeholder)
    â”œâ”€â”€ feedback/ â†’ feedback (star rating + form)
    â””â”€â”€ chat/     â†’ chat-page, chat, kb-panel, chat-overlay
```

---

## Modelli Dati

> âš ï¸ Usa **solo** i campi elencati qui. Non aggiungere campi non definiti.

| Modello | Campi chiave |
|---|---|
| **Ticket** | id, numberId, title, subject, description, priority, severity, status, statusReason, origin, customer, email, product, createdOn |
| **Account** | accountName, mainPhone, email, addressCity, website, primaryContact, codiceFiscale *(opzionale)* |
| **Contact** | name, email, businessPhone, companyName, jobTitle |
| **Feedback** | title, rating, comments *(opzionale)*, source |
| **User** | id, name, email, role, department *(opzionale)* |
| **ChatMessage** | id, sender (`'user'`\|`'bot'`), text, createdAt |
| **KbDocument** | id, title, summary, fileType |

---

## API

> Se un endpoint non Ã¨ pronto â†’ implementa un **mock nel service** con la stessa interfaccia.

```
POST /auth/login                 â†’ JWT *(mock attivo)*
POST /auth/forgot-password       *(mock attivo)*
POST /auth/reset-password        *(mock attivo)*
GET  /tickets  |  GET /tickets/:id  |  POST /tickets  |  PATCH /tickets/:id
GET  /account/:id  |  GET /contact/:id
POST /feedback
Chat/KB â†’ da definire (Fase 10)
```

---

## Flusso Principale & Overlay

```
Login â†’ Home  â†’  CTA "Avvia Chat"  â†’  ChatOverlay (chat + KB panel)
                                          â†™           â†˜
                                    Risolto        Non risolto
                                    â†“                  â†“
                               chiudi overlay     redirect /ticket  â†’  CasesPage
```

| Overlay | Trigger | Esito |
|---|---|---|
| `chat-overlay` | CTA "Avvia Chat" Home | risolto â†’ chiude / non risolto â†’ `/ticket` |
| `ticket-overlay` | bot fallisce o click manuale | toast + redirect CasesPage |
| `feedback-overlay` | chat risolta, ticket inviato, banner Cases | star rating + commento opzionale |

---

## Regole di Sviluppo

- **Componenti** â†’ solo presentational (`@Input`/`@Output`, zero business logic)
- **Logica** â†’ esclusivamente nei `services/`
- **DI** â†’ usa sempre `inject()`, mai costruttore
- **Guard** â†’ `AuthGuard` su tutte le rotte eccetto `/login`, `/forgot-password`, `/reset-password`
- **Non inventare** campi, modelli o endpoint non presenti in questo documento

---

## Design System

**Regola assoluta:** zero valori di colore hardcoded nei componenti. Ogni colore Ã¨ una CSS var.

```css
/* â”€â”€ Brand (ThemeService sovrascrive queste in Fase 13) â”€â”€ */
--brand-primary: #4f46e5;        --brand-primary-hover: #4338ca;
--brand-primary-light: #e0e7ff;  --brand-primary-rgb: 79, 70, 229;
--brand-accent: #f59e0b;         --brand-danger: #ef4444;

/* â”€â”€ Neutral scale â”€â”€ */
--n0â€¦--n800   (white â†’ #1a1a1a)

/* â”€â”€ Status tokens â”€â”€ */
--open-c/bg   --prog-c/bg   --done-c/bg   --closed-c/bg
--low-c/bg    --med-c/bg    --high-c/bg   --crit-c/bg

/* â”€â”€ Derived (uso in shadow/focus) â”€â”€ */
--brand-shadow-sm:  0 1px  4px rgba(var(--brand-primary-rgb), 0.25);
--brand-shadow-md:  0 2px  8px rgba(var(--brand-primary-rgb), 0.20);
--brand-focus-ring: 0 0   0 3px rgba(var(--brand-primary-rgb), 0.10);
--brand-row-hover:  color-mix(in srgb, var(--brand-primary) 3%, var(--n0));
```


