# Portale Ticketing — Contesto Progetto

---
## Fasi del progetto

- **Fase 1** — ✅ Struttura cartelle e file vuoti
- **Fase 2** — ✅ Modelli TypeScript (`ticket`, `user`, `feedback` ecc.)
- **Fase 3** — ✅ Routing + pagine placeholder + lazy loading
- **Fase 4** — ✅ Auth Custom JWT (Service, Guard, Interceptor, Environments puliti)
- **Fase 5** — ✅ UI Login e Mock Data (Form login, salvataggio token, mock services)
- **Fase 6** — ✅ UI pagine (`home`, `cases`, `ticket`, `feedback`) completata — template separati in `.html`/`.css`, sidebar nav, back-to-home links
- **Fase 7** — ✅ Componenti shared — `overlay-container` completato con `.ts`/`.html`/`.css`; altri (`button`, `toast`, `modal`) placeholder
- **Fase 8** — ✅ Overlay pattern (`overlay.service` + flusso chat→ticket→feedback) MVP implementato
- **Fase 12** — ✅ Pagine auth aggiuntive: `forgot-password` (form email + stato successo) e `reset-password` (lettura token da query param, validatore cross-field, redirect automatico dopo reset) — mock attivo, pronte per integrazione API Fase 9
- **Fase 9** — ⏳ Integrazione API reale D365 (sostituisce i mock) — include: rinominare `CasesService` → `AccountService`, estrarre `AccountMock`/`ContactMock` da `mock-data.ts` in `account.model.ts` e `contact.model.ts`
- **Fase 10** — ⏳ Chat + Knowledge Base (AI) con API reale — la barra di ricerca della Home si collega all'AI
- **Fase 11** — ⏳ Rifinitura (validazioni, errori, performance)
- **Fase 13** — ⏳ Design System / Theming — CSS custom properties (`--brand-primary`, ecc.) + `ThemeService` che al login carica colori e logo del tenant

## 0. Filosofia UX

Il progetto è un restyling di un sistema di ticketing legacy (tabellare, passivo) verso un portale **proattivo e AI-driven**.

| Principio | Dettaglio |
|---|---|
| **Chatbot-first** | Il chatbot è il punto d'ingresso principale per la risoluzione. L'utente è invitato a descrivere il problema prima di compilare un form. |
| **Ticket manuale secondario** | Il form ticket esiste come escalation (se il bot non risolve) o per utenti esperti. Non è mai la prima cosa che l'utente vede. |
| **Interfaccia proattiva** | La Home invita l'utente ad agire ("Come posso aiutarti?"), non mostra tabelle passive. |
| **Role-based** | `Employee` vede solo i propri ticket. `Support`/`Admin` vedono tutti i ticket. |
| **Legacy vs Nuovo** | Da griglia tabellare con filtri rigidi → a Bento Grid con hero search, stats cliccabili, risorse KB e CTA chat prominente. |

---

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
│   │   │   │   ├── overlay-container.component.ts
│   │   │   │   ├── overlay-container.component.html → ng-container condizionale
│   │   │   │   └── overlay-container.component.css
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
│       │   ├── login.component.ts
│       │   ├── login.component.html  → markup del form di login + link "Hai dimenticato la password?"
│       │   ├── login.component.css   → stili del login
│       │   ├── forgot-password.component.ts   → form email, usa inject(), stato submitted
│       │   ├── forgot-password.component.html → 2 stati: form e successo
│       │   ├── forgot-password.component.css  → stili condivisi auth (glassmorphism)
│       │   ├── reset-password.component.ts    → legge token da queryParams, validatore cross-field, redirect automatico
│       │   ├── reset-password.component.html  → 2 campi password con eye-toggle + stato successo
│       │   └── reset-password.component.css   → stili condivisi auth (glassmorphism)
│       ├── home/
│       │   ├── home.component.ts
│       │   ├── home.component.html   → Bento Grid: hero search + stats cliccabili + ultimi casi + risorse KB + CTA chat
│       │   └── home.component.css
│       ├── chat/
│       │   ├── chat.component.ts
│       │   ├── chat.component.html   → message bubbles + input + resolution buttons
│       │   ├── chat.component.css
│       │   ├── kb-panel.component.ts
│       │   ├── kb-panel.component.html → document cards suggeriti in tempo reale
│       │   ├── kb-panel.component.css
│       │   ├── chat-overlay.component.ts
│       │   ├── chat-overlay.component.html → backdrop + griglia chat|kb-panel
│       │   └── chat-overlay.component.css
│       ├── ticket/
│       │   ├── ticket-form.component.ts
│       │   ├── ticket-form.component.html → form 11 campi
│       │   ├── ticket-form.component.css
│       │   ├── ticket-overlay.component.ts  (placeholder)
│       │   └── ticket-edit.component.ts     (placeholder)
│       ├── cases/
│       │   ├── cases-list.component.ts
│       │   ├── cases-list.component.html → lista ticket con ngFor
│       │   ├── cases-list.component.css
│       │   ├── case-detail.component.ts
│       │   ├── case-detail.component.html → dettaglio ticket 2-col grid
│       │   └── case-detail.component.css
│       └── feedback/
│           ├── feedback.component.ts
│           ├── feedback.component.html → form 4 campi
│           ├── feedback.component.css
│           └── feedback-overlay.component.ts  (placeholder)
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
| **User** | id, name, email, role, department *(opzionale)* — campo `tenantId`/`companyId` in valutazione per Fase 13 (theming per tenant) |
| **Product** | productId, name, description, productType |
| **ChatMessage** | id, sender (`user`/`bot`), text, createdAt |
| **KbDocument** | id, title, summary, fileType |

---

## 4. API (frontend → backend)

```
Auth      →  POST /auth/login               (riceve email/password, restituisce JWT) *(mock locale attivo nel frontend)*
             POST /auth/forgot-password      (riceve email, invia token via mail) *(mock locale attivo)*
             POST /auth/reset-password       (riceve token + nuova password) *(mock locale attivo)*
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

Il tipo `OverlayType` supporta: `'chat' | 'ticket' | 'feedback' | null`.

```
Login → Home (Bento Grid)
       ↓
   CTA "Avvia Chat" nella hero section (+ barra ricerca)
       ↓
      ChatOverlay (mini-chat + KB panel)
     /                     \
 Problema risolto      Non risolto
     ↓                     ↓
   Chiusura overlay       Redirect a /ticket
```

| Overlay | Trigger | Esito |
|---|---|---|
| `chat-overlay` | CTA "Avvia Chat" nella hero section della Home | risolto → chiusura overlay / non risolto → redirect `/ticket` |
| `ticket-overlay` | chatbot fallisce o clic manuale | toast conferma + redirect CasesPage |
| `feedback-overlay` | chat risolta, ticket inviato, banner CasesPage | valutazione + commento opzionale |

> In MVP attuale: click sul backdrop (sfondo) chiude l'overlay e lascia la Home visibile in secondo piano.

---

## 6. Regole di Sviluppo

- **Componenti** → solo presentational (`@Input()`/`@Output()` per dati e eventi, zero logica di business)
- **Logica** → nei `services/`
- **Stato globale** → RxJS (`BehaviorSubject`) per iniziare, NgRx valutato per il futuro
- **Autenticazione** → Custom `AuthGuard` su tutte le rotte tranne `/login`, `/forgot-password`, `/reset-password`
- **Dependency Injection** → preferire `inject()` rispetto al costruttore nei nuovi componenti
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

---

## 8. Design System

### Regole colori
- **Zero colori hardcoded** nei componenti — i colori brand usano CSS custom properties
- Le variabili base sono definite in `styles.css` tramite `:root`
- I componenti usano le variabili (`var(--brand-primary)`) o classi Tailwind mappate alle variabili

### Variabili CSS (definite in `styles.css`)
```css
:root {
  --brand-primary: #4f46e5;      /* indigo-600 — colore principale azioni/CTA */
  --brand-primary-hover: #4338ca; /* indigo-700 — hover */
  --brand-primary-light: #e0e7ff; /* indigo-100 — sfondi leggeri */
  --brand-surface: #ffffff;       /* sfondo card */
  --brand-surface-glass: rgba(255, 255, 255, 0.6); /* glassmorphism */
  --brand-text: #1e293b;          /* slate-800 — testo principale */
  --brand-text-muted: #64748b;    /* slate-500 — testo secondario */
  --brand-accent: #f59e0b;        /* amber-500 — stati attenzione */
  --brand-success: #10b981;       /* emerald-500 — stati positivi */
  --brand-danger: #ef4444;        /* red-500 — stati critici */
}
```

### Linguaggio visivo
- **Glassmorphism**: `backdrop-blur`, `bg-white/60`, `border-white` — usato su card, overlay, form auth
- **Rounded corners**: `rounded-2xl` / `rounded-3xl` su tutti i contenitori
- **Ombre morbide**: `shadow-sm` / `shadow-md`, mai `shadow-lg` su elementi piccoli

### ThemeService (Fase 13)
Pianificato dopo Fase 11. Al login, il service legge i dati del tenant dall'API e inietta le variabili via `document.documentElement.style.setProperty()`. Fino a quel momento, le variabili `:root` servono come default.

---

## 9. Git  Workflow e Comandi

### Workflow con Branch (metodo consigliato)

```
main            (stabile, solo roba funzionante)
               \                                   /
feature/login    (lavori qui in sicurezza)
```

**Regola pratica:** `main` contiene solo codice funzionante e approvato.  
Ogni nuova feature/pagina  nuovo branch  quando sei soddisfatto  merge su main.

---

### Flusso tipico

```bash
# 1. Crea un branch e spostati su di esso
git switch -c feature/nome-feature

# 2. Lavori normalmente, fai commit sul branch
git add .
git commit -m "feat: descrizione cosa hai fatto"

# 3. Pusha il branch su GitHub (prima volta)
git push -u origin feature/nome-feature
# le volte successive basta:
git push

# 4. Quando sei soddisfatto, torna su main e fai il merge
git switch main
git merge feature/nome-feature

# 5. Pusha main aggiornato su GitHub
git push origin main

# 6. (Opzionale) Elimina il branch dopo il merge
git branch -d feature/nome-feature            # elimina in locale
git push origin --delete feature/nome-feature # elimina su GitHub
```

---

### Comandi utili da sapere

```bash
#  STATO 
git status                        # vedi file modificati/staged
git log --oneline                 # cronologia commit compatta
git log --oneline --graph --all   # grafico di tutti i branch

#  BRANCH 
git branch                        # lista branch locali (* = branch attuale)
git branch -a                     # lista branch locali + remoti
git switch nome-branch            # cambia branch
git switch -c nome-branch         # crea e cambia branch
git branch -d nome-branch         # elimina branch (solo se già mergiato)
git branch -D nome-branch         # elimina branch FORZATO (anche se non mergiato)

#  COMMIT 
git add .                         # aggiunge tutto al prossimo commit
git add src/app/pages/auth/       # aggiunge solo una cartella specifica
git commit -m "messaggio"         # crea il commit
git commit --amend -m "nuovo msg" # correggi il messaggio dell'ULTIMO commit
                                  #  solo se non hai ancora fatto push!

#  SINCRONIZZAZIONE REMOTO 
git push                          # pusha branch corrente
git push -u origin nome-branch    # prima push di un branch nuovo
git pull                          # scarica + integra aggiornamenti dal remoto
git fetch                         # scarica aggiornamenti SENZA integrarli

#  ANNULLARE MODIFICHE 
git restore nome-file             # annulla modifiche NON staged su un file
git restore .                     # annulla TUTTE le modifiche non staged
git restore --staged nome-file    # rimuove file dallo staging (mantiene le modifiche)
git reset --soft HEAD~1           # annulla l'ULTIMO commit, mantieni le modifiche staged
git reset --hard HEAD~1           # annulla l'ULTIMO commit + CANCELLA le modifiche
                                  #  reset --hard è irreversibile!

#  MERGE & REBASE 
git merge nome-branch             # unisce nome-branch nel branch corrente
git rebase main                   # riscrive i commit del branch sopra main
                                  # (più pulito di merge, ma da usare con cautela)

#  STASH (nascondi modifiche temporaneamente) 
git stash                         # mette da parte le modifiche correnti
git stash pop                     # ripristina le modifiche messe da parte
git stash list                    # lista degli stash salvati
```

---

### Convenzione nomi branch

```
feature/nome-feature     nuova funzionalità  (es. feature/reset-password)
fix/nome-bug             correzione bug       (es. fix/auth-redirect)
refactor/nome            refactoring          (es. refactor/chat-component)
chore/nome               configurazione/setup (es. chore/update-deps)
```

### Convenzione messaggi commit

```
feat: aggiunta pagina reset-password
fix: corretto redirect dopo login
refactor: chat-component usa @Input/@Output
chore: aggiornato project-context.md
```
