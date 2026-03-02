# 📑 Nexapulse: Versão 2.0 (Antigo [NexaFlow](https://github.com/guilhermegodoydev/crm-arquivado)) — Totalmente reconstruído

Este sistema de CRM é o resultado de uma refatoração estratégica de uma versão anterior (V1). O projeto foi reconstruído do zero para solucionar gargalos de arquitetura, inconsistência de dados e falta de foco no MVP que atrasavam o desenvolvimento original.

[🔗 Acesse o Nexapulse Aqui](https://nexapulse.netlify.app/)

---

## 🔐 Credenciais de Demonstração
Para testar as funcionalidades de gerenciamento e as políticas de segurança (RLS):
- **E-mail**: ``fabio@nexus.com``
- **Senha**: ``fgomes123``

---

## 🧠 Por que o Reboot? (V1 vs V2)
A transição da V1 para a V2 foi motivada por três aprendizados fundamentais de engenharia e gestão de produto:

1 - **Arquitetura e Manutenibilidade:** Na V1, a estrutura de pastas clássica gerava acoplamento excessivo e dependências circulares, tornando o debug lento e complexo.
  - **Solução na V2:** Implementação do **Feature-Sliced Design (FSD)**, garantindo que cada funcionalidade seja independente, fácil de localizar e escalar sem efeitos colaterais.

2 - **Consistência de Estado vs. Persistência Manual:** A V1 utilizava um simulador de servidor no localStorage, o que gerava bugs de sincronização e estados inconsistentes.
  - **Solução na V2:** Migração para **Supabase (BaaS)** e **TanStack Query (React Query)**. Delegar o gerenciamento de cache, estados de erro e persistência para ferramentas robustas eliminou falhas manuais e aumentou a produtividade drasticamente.

3 - **Foco no MVP e Definição de Escopo:** A V1 sofria com o "inchaço" de funcionalidades sem propósito claro, resultando em muitas features incompletas.
  - **Solução na V2:** Definição rigorosa de um **MVP funcional**. Cada feature na V2 foi planejada com um propósito claro de negócio, priorizando a entrega de um produto polido e pronto para produção em vez de um protótipo sobrecarregado.

---

## 🏗️ Arquitetura: Feature-Sliced Design (FSD)
Organização modular para separar preocupações de forma clara:

- **App**: Configurações globais, providers e roteamento.
- **Pages**: Composição das telas do sistema.
- **Widgets**: Blocos "inteligentes" que combinam múltiplas funcionalidades.
- **Entities**: Lógica de negócio e schemas (User, Company).
- **Shared**: UI reutilizável, hooks genéricos e instâncias de API.

---

## 🛠️ Stack Tecnológica & Diferenciais

- **React + Vite**: Performance e rapidez.
- **Supabase (PostgreSQL)**: Persistência real e **Row Level Security (RLS)** para segurança no nível do banco.
- **TanStack Query**: Cache inteligente e sincronização de estado servidor-cliente.
- **Zod**: Validação de dados e integridade de tipos em runtime.
- **React Router**: Navegação baseada em *Loaders e Hydrate Fallbacks*.
- **Tailwind CSS**: Estilização responsiva e utilitária.

---

## 🚀 Funcionalidades Atuais

- **Autenticação Reativa**: Login seguro e proteção de rotas.
- **Gestão de Empresas (CRUD)**: Fluxo completo com validações rigorosas.
- **Busca Otimizada**: Filtros debounced para economia de recursos.
- **Segurança Multitenant**: Usuários só acessam dados da sua própria organização via RLS.
- **UX Profissional**: Feedback visual com Skeletons e Splash Screens.

---

## 📈 Próximos Passos (Roadmap)

- **Módulo de Contatos:** Cadastro de múltiplos contatos vinculados a uma única empresa, permitindo a gestão individualizada de stakeholders.
- **Histórico de Anotações:** Sistema de logs e notas temporais para cada empresa, facilitando o acompanhamento de interações e contextos de negociação.
- **Gestão de Contratos:** Upload e vinculação de documentos contratuais aos registros das empresas, com controle de status e datas de vigência.
- **Pipeline de Vendas:** Visualização em formato Kanban para movimentar as empresas entre diferentes estágios do funil comercial.
