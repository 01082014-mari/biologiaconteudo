# BioLab 🧬

> **Explore, aprenda e evolua na Biologia.**

Plataforma didática de reforço de **Biologia Básica** — uma Progressive Web App instalável, que funciona **offline**, sem cadastro e sem dependência de servidores.

O BioLab reúne, em um só lugar: trilhas de conteúdo, **14 aulas completas**, um banco de **100 questões corrigidas e comentadas**, **simulados cronometrados** personalizáveis, **50 flashcards** com revisão espaçada, **4 laboratórios virtuais** interativos e um sistema de **XP, níveis e conquistas**.

Feito com **HTML, CSS e JavaScript** puros — sem framework, sem build obrigatório, sem CDN em tempo de execução.

---

## 📸 O que existe na plataforma

| Seção | Descrição |
| --- | --- |
| **Painel** | Boas-vindas, botão "Continuar estudando", resumo de progresso (aulas, questões, acertos, XP, nível), meta diária, sequência de dias, assuntos recomendados, revisões pendentes e gráfico de evolução do desempenho. |
| **Biblioteca** | 10 trilhas (Citologia, Genética, Ecologia, Corpo Humano, Evolução, Botânica, Zoologia, Microbiologia, Bioquímica e Classificação dos Seres Vivos), cada uma com descrição, dificuldade, ilustração própria, número de aulas e progresso. |
| **Leitor de aula** | Objetivos de aprendizagem, blocos didáticos (texto, exemplos, conceitos, tabelas, diagramas SVG, caixas de curiosidade), conceitos-chave, resumo, quiz de 5 questões e conclusão da aula. |
| **Central de Exercícios** | Filtros por assunto, dificuldade, tipo de questão e busca textual; correção automática; explicação do conceito; sugestão de aula relacionada ao errar; histórico de tentativas. |
| **Simulados** | Montagem personalizada (assuntos, 5/10/20/30 questões, dificuldade mista/fácil/média/difícil, cronômetro opcional), aplicação questão a questão com navegação livre, aviso de tempo, resultado com nota, acertos, erros, tempo, correção comentada, desempenho por assunto e recomendações. |
| **Flashcards** | 50 cartões com frente e verso, avaliação em 4 níveis (Errei, Difícil, Bom, Fácil) e agendamento automático da próxima revisão por repetição espaçada (SM-2 simplificado). |
| **Laboratório Virtual** | 4 experiências: Célula Animal interativa, Genética Mendeliana (quadro de Punnett com probabilidades), Fotossíntese (modelo simplificado) e Cadeia Alimentar (montagem e validação). |
| **Meu Progresso** | Evolução dos acertos, desempenho por assunto, tempo de estudo, simulados realizados, flashcards revisados, conteúdos mais difíceis, sequências de dias, conquistas e recomendações personalizadas. |
| **Configurações** | Tema claro/escuro/sistema, tamanho do texto, redução de animações, meta diária, questões por rodada, exportação e importação de progresso em JSON e exclusão de dados locais. |

---

## 🚀 Começando

O projeto é **estático**. Não há build nem dependências de produção.

```bash
# Servidor local de desenvolvimento (http://localhost:5173)
npm run dev
```

Qualquer servidor de arquivos estáticos também funciona:

```bash
python3 -m http.server 5173
npx serve .
```

> ⚠️ Para testar o *service worker* (modo offline e instalação), é preciso servir por `http://localhost` ou `https://` — abrir o `index.html` direto pelo sistema de arquivos (`file://`) desativa a PWA.

### Scripts

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Sobe o servidor local na porta 5173. |
| `npm test` | Executa a suíte de testes (Node Test Runner, sem dependências). |
| `npm run test:smoke` | Renderiza todas as telas em um DOM simulado e valida a saída. |
| `npm run lint` | Verifica estilo e erros comuns com o ESLint. |
| `npm run check:content` | Detecta artefatos de texto e termos fora do português no material didático. |
| `npm run check:data` | Valida a integridade do conteúdo (gabaritos, referências, ids duplicados). |
| `npm run check:render` | Renderiza todas as telas e detecta valores quebrados no HTML gerado. |
| `npm run icons` / `npm run illustrations` | Regera os ícones PNG e as ilustrações SVG. |
| `npm run validate` | Executa todas as verificações em sequência. |

O `npm run dev` não precisa de `npm install`. Para `lint` e `test:smoke`, instale as dependências de desenvolvimento:

```bash
npm install
```

---

## 🧠 Conteúdo didático

**10 trilhas** · **14 aulas completas** · **100 questões** · **50 flashcards** · **16 conquistas**

- **Aulas** — cada uma com objetivos de aprendizagem, explicações, exemplos práticos, diagramas SVG originais, conceitos-chave, resumo e quiz de 5 questões. Distribuídas entre Citologia (4), Genética (3), Ecologia (3) e Corpo Humano (4).
- **Questões** — 72 de múltipla escolha, 20 de verdadeiro ou falso e 8 de associação, todas com gabarito e explicação do conceito, referências cruzadas com as aulas relacionadas e distribuição por dificuldade.
- **Flashcards** — 50 tarjetas cobrindo Citologia, Genética, Ecologia e Corpo Humano, prontos para revisão espaçada.

O material é autoral, foi redigido para o estudante e passa por um verificador automático (`npm run check:content`) que rejeita marcadores de texto, artefatos de codificação e termos em inglês.

---

## 🎮 Gamificação

- **XP** por ação: aula concluída (40), quiz de aula (15 a 25), questão respondida (4), simulado concluído (25 a 70), flashcard revisado (3), laboratório concluído (25) e meta diária (25).
- **12 níveis**, de *Iniciante* a *Guardião do Conhecimento*.
- **16 conquistas**, incluindo Primeira Aula, Explorador de Células, Mestre da Genética, Guardião da Natureza, 100 Questões Respondidas e 7 Dias de Estudos.
- **Meta diária de XP**, **sequência de dias estudados** e recompensas por progresso.

> O XP é creditado **uma única vez por referência** (`aula:cit-01`, `simulado:<id>`, `questão:<id>`…). Recarregar a página, reabrir um resultado ou revisitar a tela inicial nunca duplica pontos.

---

## 📱 PWA

- **Web App Manifest** com nome, cores, ícones, atalhos e modo `standalone`.
- **Ícones** de 192×192, 512×512, `maskable` de 512×512 e `apple-touch-icon`, gerados a partir do logotipo SVG.
- **Service worker** com pré-cache dos recursos essenciais, *fallback* de navegação para o `index.html` e cache em tempo de execução — a plataforma abre **offline** após a primeira visita.
- Aviso de **nova versão** disponível quando o service worker é atualizado.
- Botão **Instalar** (via `beforeinstallprompt`) nas laterais compatíveis.
- Nenhuma dependência de CDN para o funcionamento essencial.

---

## 🗂️ Estrutura do projeto

```text
.
├── index.html                 # entrada da aplicação
├── manifest.webmanifest       # manifesto da PWA
├── sw.js                      # service worker
├── offline.html               # página usada quando não há rede
├── css/
│   ├── base.css               # tokens, reset, tipografia, temas
│   ├── layout.css             # shell, sidebar, topbar, navegação móvel
│   └── components.css         # botões, cards, quiz, flashcards, gráficos…
├── js/
│   ├── app.js                 # shell, roteador por hash, tema, instalação
│   ├── lib/
│   │   ├── icons.js           # ícones SVG embutidos + logotipo
│   │   ├── utils.js           # utilidades (aleatoriedade determinística, formatação)
│   │   ├── dom.js             # DOM, eventos, toasts, diálogos
│   │   ├── store.js           # persistência em localStorage + export/import
│   │   ├── grading.js         # correção de questões e cálculo de notas
│   │   ├── srs.js             # repetição espaçada
│   │   ├── xp.js              # XP, níveis e conquistas
│   │   ├── exam.js            # geração de simulados
│   │   ├── progress.js        # agregação de progresso e recomendações
│   │   ├── actions.js         # ações de negócio (mutações de estado)
│   │   └── charts.js          # gráficos SVG próprios
│   ├── data/
│   │   ├── topics.js          # as 10 trilhas
│   │   ├── lessons.js         # as 14 aulas
│   │   ├── questions.js       # índice do banco + filtros
│   │   ├── questions-*.js     # banco por área
│   │   ├── flashcards.js      # 50 cartões
│   │   └── achievements.js    # 16 conquistas
│   └── views/                 # uma tela por seção
├── icons/                     # ícones da PWA (PNG + SVG)
├── illustrations/             # ilustrações das trilhas (SVG)
├── scripts/                   # servidor, validações e geradores
├── tests/                     # suíte de testes
└── package.json             # scripts do projeto
```

---

## 🧪 Testes

```bash
npm test          # 101 testes unitários e de integração
npm run test:smoke # renderização de todas as telas em DOM simulado
```

Cobertura dos testes:

| Arquivo | Foco |
| --- | --- |
| `tests/grading.test.js` | Correção dos três tipos de questão, cálculo de nota, desempenho por assunto, embaralhamento com gabarito coerente. |
| `tests/srs.test.js` | Agendamento por repetição espaçada, limites de facilidade, cartões vencidos, resumo do baralho. |
| `tests/xp.test.js` | Tabela de níveis, progresso dentro do nível, XP sem duplicidade, avaliação de conquistas. |
| `tests/exam.test.js` | Montagem de simulados, filtros, ausência de repetição, aviso de falta de questões, reprodutibilidade por seed. |
| `tests/progress.test.js` | Sequência de dias, retrato de progresso, estatísticas por assunto, recomendações. |
| `tests/store.test.js` | Persistência, exportação, importação com validação, recuperação de estado corrompido. |
| `tests/actions.test.js` | Conclusão de aulas, quizzes, tentativas, simulados, flashcards e laboratórios — incluindo a garantia de **XP único**. |
| `tests/content.test.js` | Integridade do material: trilhas, aulas, questões, flashcards, conquistas e referências cruzadas. |
| `tests/smoke.mjs` | Renderização das 13 rotas da aplicação e verificação do conteúdo exibido. |

---

## ♿ Acessibilidade

- Navegação por teclado em toda a interface, com foco visível e *skip link* para o conteúdo principal.
- Estrutura semântica (`header`, `nav`, `main`, `section`, `article`, `aside`) e rótulos ARIA nos componentes interativos.
- Contraste adequado nos temas claro e escuro.
- `aria-live` nos avisos e no cartão de nível.
- Respeito à preferência de movimento reduzido do sistema, com opção adicional nas configurações.
- Mensagens de erro claras, estados vazios úteis e confirmação antes de ações destrutivas.

---

## ☁️ Publicação no GitHub Pages

O repositório está pronto para publicação: como o projeto é estático, basta servir a raiz do repositório.

1. No GitHub, abra **Settings → Pages**.
2. Em **Build and deployment**, escolha **Deploy from a branch**.
3. Selecione a branch `main` e a pasta `/ (root)`, e salve.

A página ficará disponível em `https://01082014-mari.github.io/biologiaconteudo/`.

Pelo terminal:

```bash
# Publicar
git add -A
git commit -m "BioLab: plataforma PWA de Biologia Básica"
git push origin main

# Conferir o status da publicação
gh api repos/01082014-mari/biologiaconteudo/pages
```

> ⚠️ O `sw.js` faz pré-cache com caminhos absolutos (`/css/...`). Em uma publicação em subpasta
> (`/biologiaconteudo/`), ajuste o `start_url`, o `scope` e a lista `PRECACHE_URLS` do service worker
> para incluir o prefixo, ou mova o site para um domínio próprio.

---

## 🔒 Privacidade

Todo o progresso fica salvo **apenas no navegador** deste dispositivo, em `localStorage`. Nenhum dado é enviado para servidores, e não há cadastro nem login. O estudante pode exportar o progresso em JSON, importá-lo em outro dispositivo ou apagá-lo a qualquer momento pela página de configurações.

---

## 📝 Notas

- As ilustrações das trilhas e os ícones da aplicação são **SVG autorais**, gerados pelos scripts em `scripts/`.
- O modelo de fotossíntese do laboratório é **educacional e simplificado**, identificado como tal na própria interface.
- A plataforma é **100% estática**: não há etapa de build nem dependência de produção. O que está no repositório é exatamente o que é publicado.

## 📄 Licença

MIT.
