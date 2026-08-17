# Playwright TS Framework

Framework de automação de testes end-to-end, construído com [Playwright](https://playwright.dev) e TypeScript, seguindo o padrão **Page Object Model (POM)**.

## Estrutura do projeto

```
.
├── config/
│   └── environments/        # Variáveis por ambiente (dev, staging, prod)
├── src/
│   ├── config/               # Carregamento e validação de configuração (env.config.ts)
│   ├── pages/                 # Page Objects (base.page.ts + páginas específicas)
│   ├── fixtures/              # Fixtures customizadas do Playwright Test
│   ├── utils/                 # Utilitários (logger, helpers)
│   └── types/                 # Tipos e contratos compartilhados
├── tests/
│   ├── ui/                    # Testes de interface
│   └── api/                   # Testes de API
├── playwright.config.ts
└── tsconfig.json
```

## Arquitetura

- **`src/pages/base.page.ts`** — classe base com ações comuns (`click`, `fill`, `waitForVisible`, ...). Toda página nova deve estender `BasePage`.
- **`src/pages/example.page.ts`** — modelo de referência mostrando como criar um novo Page Object. Duplique este arquivo para páginas reais.
- **`src/fixtures/base.fixtures.ts`** — estende o `test` do Playwright injetando os Page Objects como fixtures, evitando instanciar páginas manualmente em cada spec.
- **`src/config/env.config.ts`** — ponto único de configuração. Lê `ENV` para decidir qual arquivo em `config/environments/` carregar e expõe um objeto `config` tipado (`baseURL`, `apiURL`, `timeout`, `credentials`, ...).

## Pré-requisitos

- Node.js 20+
- npm

## Instalação

```bash
npm install
npx playwright install
```

## Configuração de ambiente

1. Copie o arquivo de ambiente desejado:

```bash
cp config/environments/.env.dev.example config/environments/.env.dev
```

2. Copie o `.env.example` para `.env` e defina qual ambiente usar:

```bash
cp .env.example .env
```

3. Preencha as variáveis necessárias (`BASE_URL`, credenciais, etc.) nos arquivos criados. Esses arquivos são ignorados pelo git.

## Executando os testes

```bash
npm test                 # roda todos os projetos (chromium, firefox, webkit)
npm run test:headed      # com navegador visível
npm run test:ui          # UI mode do Playwright
npm run test:chromium    # apenas Chromium
npm run report           # abre o último relatório HTML
```

## Qualidade de código

```bash
npm run lint             # ESLint
npm run format           # Prettier
```

## Convenções

- Um Page Object por arquivo, nomeado `*.page.ts`, sempre estendendo `BasePage`.
- Testes de UI em `tests/ui`, testes de API em `tests/api`.
- Nenhuma URL, credencial ou segredo deve ser commitado — use os arquivos `.env`.
- Locators seguem a ordem de prioridade recomendada pelo Playwright: `getByRole` > `getByLabel` > `getByText` > `getByTestId`.
