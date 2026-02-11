# Portale Ticketing — Contesto Progetto

---

## 1. Stack Tecnologico

| Tecnologia | Dettaglio |
|---|---|
| Framework | Angular 21 — standalone components |
| State management | RxJS (Observables) + NgRx (stato globale) |
| Autenticazione | Azure AD B2C — MSAL Angular 5, MSAL Browser 5 |
| HTTP | Angular HttpClient + MSAL Interceptor (token automatico) |
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
    ├── environment.ts             → dev  { apiUrl, clientId, tenantId, redirectUri }
    └── environment.prod.ts        → prod { stessi campi, valori produzione }
```

---

## 3. Modelli Dati

> ⚠️ Usa **solo** i campi elencati. Non aggiungere campi non presenti qui.

| Modello | Campi |
|---|---|
| **Ticket** | id, numberId, title, subject, description, priority, severity, status, statusReason, origin, customer, email, product, createdOn |
| **Account** | accountName, mainPhone, email, addressCity, website, primaryContact, codiceFiscale *(opzionale)* |
| **Contact** | name, email, businessPhone, companyName, jobTitle |
| **Feedback** | title, rating, comments, source |
| **User** | fullName, title, businessUnit |
| **Product** | productId, name, description, productType |
| **ChatMessage** | *(da definire quando API chat è pronta)* |
| **KbDocument** | *(da definire quando API KB è pronta)* |

---

## 4. API (frontend → backend)

```
Auth      →  gestita da MSAL (Azure AD B2C), nessun endpoint manuale
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
     ChatOverlay
     /          \
 Risolto      Non risolto
    ↓               ↓
FeedbackOverlay  TicketFormOverlay → CasesPage
```

| Overlay | Trigger | Esito |
|---|---|---|
| `chat-overlay` | pulsante Home o Apertura Ticket | risolto → Feedback / non risolto → TicketForm |
| `ticket-overlay` | chatbot fallisce o clic manuale | toast conferma + redirect CasesPage |
| `feedback-overlay` | chat risolta, ticket inviato, banner CasesPage | valutazione + commento opzionale |

---

## 6. Regole di Sviluppo

- **Componenti** → solo presentational (zero logica, solo UI e output/input)
- **Logica** → nei `services/`
- **Stato globale** → NgRx; stato locale → RxJS `BehaviorSubject`
- **API non pronta** → mock nel service con la stessa firma del metodo reale
- **Autenticazione** → `MsalGuard` su tutte le rotte tranne `/auth/login`
- **HTTP** → `HttpClient` + interceptor MSAL (token iniettato in automatico)
- **Non inventare** campi, modelli o endpoint non presenti in questo documento