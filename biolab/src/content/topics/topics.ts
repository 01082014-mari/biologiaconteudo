import type { Topic, TopicId } from '@/types'

/**
 * As dez trilhas de conteúdo da plataforma BioLab.
 *
 * Cada trilha agrupa aulas, questões e flashcards relacionados a um
 * grande tema de Biologia Básica.
 */
export const TOPICS: Topic[] = [
  {
    id: 'citologia',
    title: 'Citologia',
    slug: 'citologia',
    description: 'A célula como unidade fundamental da vida: membranas, organelas e ciclo celular.',
    longDescription:
      'Citologia é o estudo das células. Nesta trilha você vai entender como a célula organiza seu espaço interno, como as organelas trocam energia e materiais, e como o ciclo celular permite que um organismo cresça, se divida e se renove.',
    difficulty: 'facil',
    icon: 'Cell',
    accent: 'from-blue-500 to-blue-700',
    illustration: '/illustrations/citologia.svg',
    color: '#1d4ed8',
    keywords: ['célula', 'membrana', 'organela', 'mitose', 'citoplasma'],
  },
  {
    id: 'genetica',
    title: 'Genética',
    slug: 'genetica',
    description: 'Da DNA à herança: genes, alelos, segregação mendeliana e expressão gênica.',
    longDescription:
      'Genética explica como a informação hereditária é armazenada, copiada e transmitida. Você vai percorrer a estrutura do DNA, entender o dogma central e dominar as leis de Mendel para resolver problemas de herança.',
    difficulty: 'medio',
    icon: 'Dna',
    accent: 'from-violet-500 to-purple-800',
    illustration: '/illustrations/genetica.svg',
    color: '#6d28d9',
    keywords: ['DNA', 'gene', 'alelo', 'mendel', 'herança'],
  },
  {
    id: 'ecologia',
    title: 'Ecologia',
    slug: 'ecologia',
    description: 'Relações entre seres vivos e o ambiente: energia, ciclos e impacto humano.',
    longDescription:
      'Ecologia estuda como os seres vivos se relacionam e distribuem-se no ambiente. A trilha aborda níveis de organização, cadeias alimentares, fluxo de energia, ciclos de matéria e os impactos humanos sobre os ecossistemas.',
    difficulty: 'medio',
    icon: 'Leaf',
    accent: 'from-yellow-400 to-amber-600',
    illustration: '/illustrations/ecologia.svg',
    color: '#a16207',
    keywords: ['ecossistema', 'cadeia alimentar', 'produtor', 'bioma', 'ciclo'],
  },
  {
    id: 'corpo-humano',
    title: 'Corpo Humano',
    slug: 'corpo-humano',
    description: 'Sistemas do corpo humano: homeostase, respiração, excreção e nervoso.',
    longDescription:
      'Explore como o corpo humano mantém o equilíbrio interno. Você vai conhecer os sistemas de transporte, respiração, excreção e coordenação, entendendo como cada um contribui para a homeostase.',
    difficulty: 'medio',
    icon: 'HeartPulse',
    accent: 'from-rose-500 to-red-700',
    illustration: '/illustrations/corpo-humano.svg',
    color: '#be123c',
    keywords: ['homeostase', 'sangue', 'pulmão', 'rim', 'neurônio'],
  },
  {
    id: 'evolucao',
    title: 'Evolução',
    slug: 'evolucao',
    description: 'Seleção natural, adaptação, especiação e evidências da evolução.',
    longDescription:
      'A evolução explica a diversidade da vida como resultado de processos históricos. Esta trilha trabalha seleção natural, deriva genética, tipos de especiação, registros fósseis e anatomia comparada.',
    difficulty: 'medio',
    icon: 'TrendingUp',
    accent: 'from-amber-500 to-orange-700',
    illustration: '/illustrations/evolucao.svg',
    color: '#b45309',
    keywords: ['seleção natural', 'adaptação', 'especiação', 'fóssil', 'darwin'],
  },
  {
    id: 'botanica',
    title: 'Botânica',
    slug: 'botanica',
    description: 'Plantas: anatomia, fotossíntese, respiração, transporte e reprodução.',
    longDescription:
      'Botânica estuda os vegetales. Descubra tissues e órgãos das plantas, o mecanismo da fotossíntese, avasculares, fototropismo e a reprodução das angiospermas.',
    difficulty: 'facil',
    icon: 'Trees',
    accent: 'from-sky-400 to-cyan-700',
    illustration: '/illustrations/botanica.svg',
    color: '#0e7490',
    keywords: ['planta', 'fotossíntese', 'clorofila', 'raiz', 'transpiração'],
  },
  {
    id: 'zoologia',
    title: 'Zoologia',
    slug: 'zoologia',
    description: 'Animais: invertebrados, vertebrados, comportamento e adaptação.',
    longDescription:
      'Zoologia cobre a diversidade animal. Compare os grupos de invertebrados e vertebrados, entenda a locomoção, a alimentação e as relações comportamentais entre eles.',
    difficulty: 'facil',
    icon: 'PawPrint',
    accent: 'from-sky-500 to-blue-700',
    illustration: '/illustrations/zoologia.svg',
    color: '#0369a1',
    keywords: ['animal', 'vertebrado', 'invertebrado', 'simetria', 'habitat'],
  },
  {
    id: 'microbiologia',
    title: 'Microbiologia',
    slug: 'microbiologia',
    description: 'Bactérias, virus, fungos e protozoários: estrutura, função e importância.',
    longDescription:
      'Microbiologia aborda os organismos microscópicos. Conheça a estrutura bacteriana, o ciclo de vida dos vírus, a fermentação e o papel dos micro-organismos na saúde e no ambiente.',
    difficulty: 'medio',
    icon: 'Bug',
    accent: 'from-fuchsia-500 to-purple-700',
    illustration: '/illustrations/microbiologia.svg',
    color: '#a21caf',
    keywords: ['bactéria', 'vírus', 'fungo', 'protozoário', 'fermentação'],
  },
  {
    id: 'bioquimica',
    title: 'Bioquímica',
    slug: 'bioquimica',
    description: 'Biomoléculas, enzimas, metabolismo e respiração celular.',
    longDescription:
      'Bioquímica conecta a química à Biologia. Estude as biomoléculas, a estrutura das enzimas, o transporte de elétrons, a glicólise e o papel do ATP no metabolismo.',
    difficulty: 'dificil',
    icon: 'FlaskConical',
    accent: 'from-teal-500 to-cyan-700',
    illustration: '/illustrations/bioquimica.svg',
    color: '#0f766e',
    keywords: ['enzima', 'ATP', 'glicólise', 'proteína', 'lipídio'],
  },
  {
    id: 'classificacao',
    title: 'Classificação dos Seres Vivos',
    slug: 'classificacao',
    description: 'Taxonomia, nomenclatura binomial e os domínios da vida.',
    longDescription:
      'Como a Biologia organiza a vida? Conheça os critérios de classificação, a nomenclatura binomial de Lineu, a hierarquia taxonômica e a proposta dos três domínios.',
    difficulty: 'facil',
    icon: 'Layers',
    accent: 'from-indigo-500 to-violet-800',
    illustration: '/illustrations/classificacao.svg',
    color: '#4338ca',
    keywords: ['taxonomia', 'espécie', 'binominal', 'domínio', 'reino'],
  },
]

/** Índice rápido por id de trilha. */
export const TOPIC_BY_ID: Record<TopicId, Topic> = TOPICS.reduce(
  (acc, topic) => {
    acc[topic.id] = topic
    return acc
  },
  {} as Record<TopicId, Topic>,
)

/** Função auxiliar para obter o título de uma trilha. */
export function getTopicTitle(topicId: TopicId): string {
  return TOPIC_BY_ID[topicId]?.title ?? 'Geral'
}
