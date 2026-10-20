import type { Difficulty, TopicId } from './common'

/** Uma trilha de conteúdo (ex.: Citologia, Genética). */
export interface Topic {
  id: TopicId
  title: string
  slug: string
  description: string
  longDescription: string
  difficulty: Difficulty
  /** Ícone Lucide usado como marcador visual da trilha. */
  icon: string
  /** Classes Tailwind de gradiente aplicadas ao card da trilha. */
  accent: string
  /** Ilustração SVG em `public/illustrations`. */
  illustration: string
  color: string
  keywords: string[]
}

export type LessonBlockType =
  | 'texto'
  | 'objetivos'
  | 'exemplo'
  | 'conceitos'
  | 'resumo'
  | 'diagrama'
  | 'tabela'
  | 'curiosidade'

export interface LessonBlock {
  id: string
  type: LessonBlockType
  title: string
  /** Parágrafos do bloco (texto simples). */
  paragraphs?: string[]
  /** Listas com marcador (objetivos, conceitos). */
  items?: string[]
  /** Tabela opcional para blocos do tipo `tabela`. */
  table?: {
    headers: string[]
    rows: string[][]
  }
  /** Chave da ilustração SVG inline usada em blocos `diagrama`. */
  diagram?: DiagramKey
  caption?: string
  callout?: 'info' | 'dica' | 'atencao'
}

/** Ilustrações SVG em código, compartilhadas pelas aulas. */
export type DiagramKey =
  | 'celula-animal'
  | 'celula-vegetal'
  | 'mitose-fases'
  | 'dna-dupla-helix'
  | 'mendel-cruzamento'
  | 'ciclo-krebs'
  | 'ecossistema'
  | 'cadeia-alimentar'
  | 'sistema-circulatorio'
  | 'nefron'
  | 'foton-pigmentos'
  | 'classificacao-seraes'

/** Uma aula completa dentro de uma trilha. */
export interface Lesson {
  id: string
  topicId: TopicId
  title: string
  slug: string
  summary: string
  /** Objectives displayed as "Objetivos de aprendizagem". */
  objectives: string[]
  /** Blocos de conteúdo didático na ordem de leitura. */
  blocks: LessonBlock[]
  /** Conceitos-chave para revisão rápida. */
  keyConcepts: string[]
  /** Resumo final da aula. */
  summaryPoints: string[]
  /** Ids das questões do quiz final da aula. */
  quizQuestionIds: string[]
  /** Tempo estimado de leitura, em minutos. */
  estimatedMinutes: number
  difficulty: Difficulty
  /** Tags para busca e recomendação. */
  tags: string[]
  /** Práticas ou atividades complementares sugeridas. */
  relatedLab?: string
}
