# BioLab — versão React (em desenvolvimento)

Esta pasta guarda a **versão React + TypeScript** da plataforma BioLab,
desenvolvida em paralelo à PWA estática que está na raiz do repositório.

> **A versão publicada é a PWA estática da raiz do repositório**
> (HTML, CSS e JavaScript puros, sem etapa de build). Esta pasta é o
> esqueleto do rework em React e ainda não está pronta para publicação.

## Estado atual

| Item | Situação |
| --- | --- |
| Tipos TypeScript do domínio | ✅ Pronto (`src/types/`) |
| Conteúdo didático (aulas, questões, tópicos) | ✅ Pronto (`src/content/`) |
| Ícones da PWA e manifesto | ✅ Pronto (`manifest.json`, `foto192.png`, `foto512.png`, `sw.js`) |
| Componentes, telas e rotas | ⏳ Em desenvolvimento |

## Como rodar (local)

```bash
npm install
npm run dev
```

## Próximos passos

1. Implementar o design system e o layout (sidebar, navegação móvel, temas).
2. Configurar o IndexedDB com Dexie e os repositórios de persistência.
3. Desenvolver as telas: painel, biblioteca, leitor de aula, exercícios,
   simulados, flashcards, laboratório, progresso e configurações.
4. Completar os testes com Vitest e React Testing Library.

O conteúdo didático é compartilhado com a PWA estática — os dois projetos
usam as mesmas aulas, questões e flashcards.
