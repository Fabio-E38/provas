# Portale Ticketing — Contesto Progetto

---
## Fasi del progetto

- **Fase 1** — ✅ Struttura cartelle e file vuoti
- **Fase 2** — ✅ Modelli TypeScript (`ticket`, `user`, `feedback` ecc.)
- **Fase 3** — ✅ Routing + pagine placeholder + lazy loading
- **Fase 4** — ✅ Auth Custom JWT (Service, Guard, Interceptor, Environments puliti)
- **Fase 5** — ✅ UI Login e Mock Data (Form login, salvataggio token, mock services)
- **Fase 6** — 🔄 UI pagine (`home`, `cases`, `ticket`, `feedback`) base completata, design in evoluzione
- **Fase 7** — 🔄 Componenti shared (`button`, `toast`, `modal`, `overlay-container`) avviata con `overlay-container`
- **Fase 8** — 🔄 Overlay pattern (`overlay.service` + flusso chat→ticket→feedback) MVP implementato
- **Fase 9** — ⏳ Integrazione API reale D365 (sostituisce i mock)
- **Fase 10** — ⏳ Chat + Knowledge Base (AI) con API reale
- **Fase 11** — ⏳ Rifinitura (validazioni, errori, performance)

## 1. Stack Tecnologico

| Tecnologia | Dettaglio |
|---|---|
| Framework | Angular 21 — standalone components |
| State management | RxJS (`BehaviorSubject`) per iniziare, NgRx valutato per il futuro |
| HTTP | Angular HttpClient + Custom JWT Interceptor (token automatico) |
| Backend | API REST custom → Dynamics 365 (frontend riceve solo JSON) |

> ⚠️ Il frontend **non accede mai direttamente** a Dynamics 365.

---

## 2. Struttura Cartelle

```
src/
├── app/
│   ├── models/                   → interfacce TypeScript dei dati
│   │   ├── user.model.ts
│   │   ├── ticket.model.ts
│   │   ├── mock-data.ts
│   │   ├── chat-message.model.ts
│   │   ├── kb-document.model.ts
│   │   └── feedback.model.ts
│   │
│   ├── services/                 → logica di business, chiamate API, guard, interceptor
│   │   ├── auth.service.ts
│   │   ├── auth.guard.ts
│   │   ├── auth.interceptor.ts
│   │   ├── chat.service.ts
│   │   ├── kb.service.ts
│   │   ├── ticket.service.ts
│   │   ├── cases.service.ts
│   │   ├── feedback.service.ts
│   │   └── overlay.service.ts
│   │
│   ├── shared/                   → componenti riusabili, direttive, pipe
│   │   ├── components/
│   │   │   ├── modal/
│   │   │   ├── overlay-container/
│   │   │   │   └── overlay-container.component.ts
│   │   │   ├── toast/
│   │   │   ├── confirm-dialog/
│   │   │   ├── input/
│   │   │   ├── button/
│   │   │   └── card/
│   │   ├── directives/
│   │   └── pipes/
│   │
│   └── pages/                    → una cartella per ogni pagina/feature
│       ├── auth/
│       │   └── login.component.ts
│       ├── home/
│       │   └── home.component.ts
│       ├── chat/
│       │   ├── chat.component.ts
│       │   ├── kb-panel.component.ts
│       │   └── chat-overlay.component.ts
│       ├── ticket/
│       │   ├── ticket-form.component.ts
│       │   ├── ticket-overlay.component.ts
│       │   └── ticket-edit.component.ts
│       ├── cases/
│       │   ├── cases-list.component.ts
│       │   └── case-detail.component.ts
│       └── feedback/
│           ├── feedback.component.ts
│           └── feedback-overlay.component.ts
│
├── assets/                       → immagini, audio, file statici
└── environments/                 → configurazioni per dev/prod
    ├── environment.ts             → dev  { apiUrl }
    └── environment.prod.ts        → prod { apiUrl }
```

---

## 3. Modelli Dati

> ⚠️ Usa **solo** i campi elencati. Non aggiungere campi non presenti qui.

| Modello | Campi |
|---|---|
| **Ticket** | id, numberId, title, subject, description, priority, severity, status, statusReason, origin, customer, email, product, createdOn |
| **Account** | accountName, mainPhone, email, addressCity, website, primaryContact, codiceFiscale *(opzionale)* |
| **Contact** | name, email, businessPhone, companyName, jobTitle |
| **Feedback** | title, rating, comments *(opzionale)*, source |
| **User** | id, name, email, role, department *(opzionale)* |
| **Product** | productId, name, description, productType |
| **ChatMessage** | id, sender (`user`/`bot`), text, createdAt |
| **KbDocument** | id, title, summary, fileType |

---

## 4. API (frontend → backend)

```
Auth      →  POST /auth/login (riceve email/password, restituisce JWT) *(mock locale attivo nel frontend)*
Tickets   →  GET  /tickets
             GET  /tickets/:id
             POST /tickets
             PATCH /tickets/:id
Account   →  GET  /account/:id
Contact   →  GET  /contact/:id
Feedback  →  POST /feedback
Chat/KB   →  da definire
```

> Se un endpoint non è ancora pronto, implementa un **mock nel service** con la stessa interfaccia.

---

## 5. Flusso Principali e Pattern Overlay

Gli overlay si sovrappongono alla pagina corrente tramite `overlay-container`.  
`overlay.service.ts` gestisce apertura/chiusura in modo centralizzato.

```
Login → Home
       ↓
   Pulsante flottante (bottom-right)
       ↓
      ChatOverlay (mini-chat + KB panel)
     /                     \
 Problema risolto      Non risolto
     ↓                     ↓
   Chiusura overlay       Redirect a /ticket
```

| Overlay | Trigger | Esito |
|---|---|---|
| `chat-overlay` | pulsante flottante in Home | risolto → chiusura overlay / non risolto → redirect `/ticket` |
| `ticket-overlay` | chatbot fallisce o clic manuale | toast conferma + redirect CasesPage |
| `feedback-overlay` | chat risolta, ticket inviato, banner CasesPage | valutazione + commento opzionale |

> In MVP attuale: click sul backdrop (sfondo) chiude l'overlay e lascia la Home visibile in secondo piano.

---

## 6. Regole di Sviluppo

- **Componenti** → solo presentational (zero logica, solo UI e output/input)
- **Logica** → nei `services/`
- **Stato globale** → RxJS (`BehaviorSubject`) per iniziare, NgRx valutato per il futuro
- **Autenticazione** → Custom `AuthGuard` su tutte le rotte tranne `/login`
- **HTTP** → `HttpClient` + Custom JWT Interceptor (legge il token dal localStorage e lo inietta in automatico)
- **Non inventare** campi, modelli o endpoint non presenti in questo documento

---

## 7. Strumenti e UI Stack

| Strumento | Scelta | Motivazione |
|---|---|---|
| **UI Framework** | Tailwind CSS | Già installato, moderna, flessibile, ottima per imparare |
| **Icon Pack** | Lucide Icons | SVG leggere, pulite, perfette con Tailwind |
| **Notifiche (Toast)** | Componente Custom | Fase 7 — imparare la gestione DOM in Angular |
| **Modali/Overlay** | Componente Custom | Fase 7 — imparare il pattern overlay con RxJS |
| **State Management** | RxJS `BehaviorSubject` | Semplice e già in uso, NgRx valutato in futuro |
| **Animazioni** | Angular Animations | Già disponibile, nessuna dipendenza esterna |
| **HTTP** | Angular HttpClient | Integrato con RxJS e l'interceptor JWT |
| **Qualità Codice** | Prettier (già configurato) | Formattazione automatica unificata |