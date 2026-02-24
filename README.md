# Ticketing System

Questo progetto è un portale di ticketing sviluppato in Angular 21.

## Fasi del Progetto

### ✅ Completate
- **Fase 1** — Struttura cartelle e file vuoti
- **Fase 2** — Modelli TypeScript (`ticket`, `user`, `feedback` ecc.)
- **Fase 3** — Routing + pagine placeholder + lazy loading
- **Fase 4** — Auth Custom JWT (Service, Guard, Interceptor, Environments puliti)

### 🔄 In corso
- **Fase 5** — UI Login e Mock Data (Form login, salvataggio token, mock services)

### ⏳ Da fare
- **Fase 6** — UI pagine (`home`, `cases`, `ticket`, `feedback`)
- **Fase 7** — Componenti shared (`button`, `toast`, `modal`, `overlay-container`)
- **Fase 8** — Overlay pattern (`overlay.service` + flusso chat→ticket→feedback)
- **Fase 9** — Integrazione API reale D365 (sostituisce i mock)
- **Fase 10** — Chat + Knowledge Base (AI)
- **Fase 11** — Rifinitura (validazioni, errori, performance)

---

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.1.2.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
