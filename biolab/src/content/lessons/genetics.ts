import type { Lesson } from '@/types'

/** Trilha de Genética — três aulas completas. */
export const GENETICS_LESSONS: Lesson[] = [
  {
    id: 'gen-01',
    topicId: 'genetica',
    title: 'Genes, DNA e o dogma central',
    slug: 'genes-dna-e-o-dogma-central',
    summary:
      'A estrutura da dupla hélice, a organização dos genes no cromossomo e o caminho da informação do DNA até a proteína.',
    objectives: [
      'Descrever a estrutura do DNA e a regra de pareamento de bases.',
      'Diferenciar gene, alelo, genótipo e fenótipo.',
      'Explicar as três etapas do dogma central da Biologia Molecular.',
      'Relacionar a estrutura do DNA com a multiplicação das células.',
    ],
    blocks: [
      {
        id: 'gen-01-b1',
        type: 'texto',
        title: 'A dupla hélice',
        paragraphs: [
          'O ácido desoxirribonucleico (DNA) é um polímero de nucleotídeos formado por três componentes: um grupo fosfato, uma pentose — a desoxirribose — e uma base nitrogenada. Existem quatro bases: adenina (A), timina (T), guanina (G) e citosina (C). Adenina e timina pertencem ao grupo das purinas e guanina e citosina ao das pirimidinas.',
          'Em 1953, Rosalind Franklin e Maurice Wilkins produziram difratogramas de raios X que permitiram a James Watson e Francis Crick propor o modelo de dupla hélice. A estrutura explica os dados: as bases se pareiam de forma específica — adenina com timina por duas ligações de hidrogênio, guanina com citosina por três —, e as fitas se enrolam em torno do mesmo eixo.',
          'A ordem em que essas bases se distribuem ao longo do DNA é a informação biológica. Duas sequências com o mesmo número de bases, mas em ordens diferentes, codificam coisas completamente distintas. Essa é a razão pela qual a duplicação do DNA precisa ser fiel: um erro de pareamento pode virar mutação.',
        ],
      },
      {
        id: 'gen-01-b2',
        type: 'diagrama',
        title: 'Anatomia do DNA',
        diagram: 'dna-dupla-helix',
        caption:
          'Dupla hélice com bases complementares unidas por ligações de hidrogênio e fitas de açúcar-fosfato por fora.',
      },
      {
        id: 'gen-01-b3',
        type: 'texto',
        title: 'Gene, alelo, genótipo e fenótipo',
        paragraphs: [
          'Um gene é um segmento de DNA que contém a informação para produzir uma proteína funcional. Cada gene existe no organismo em duas variantes, chamadas alelos: um herdado do pai e outro da mãe. O conjunto de alelos que um indivíduo possui para determinado gene é o seu genótipo; a característica observável que resulta da ação dos genes,_dp de forma conjunta com o ambiente, é o fenótipo.',
          'Quando os dois alelos de um gene são iguais, o indivíduo é homozigoto; quando são diferentes, é heterozigoto. Um alelo pode dominar o outro no fenótipo (dominante) ou os dois podem se expressar simultaneamente (codominante), como acontece com o sistema ABO discussed em Citologia.',
        ],
        callout: 'dica',
      },
      {
        id: 'gen-01-b4',
        type: 'tabela',
        title: 'As três etapas do dogma central',
        table: {
          headers: ['Etapa', 'Onde ocorre', 'O que acontece'],
          rows: [
            ['Replicação', 'Núcleo', 'O DNA é duplicado antes da divisão celular'],
            ['Transcrição', 'Núcleo', 'Uma fita de DNA é copiada em RNA mensageiro'],
            ['Tradução', 'Citoplasma (ribossomo)', 'O RNA mensageiro é lido para montar uma proteína'],
          ],
        },
      },
      {
        id: 'gen-01-b5',
        type: 'texto',
        title: 'A ordem dos genes no genoma',
        paragraphs: [
          'Os genes não ocupam posições aleatórias no cromossomo. No organismo humano, por exemplo, os genes que codificam proteínas encontram-se agrupados, e existem regiões de DNA repetitivo, com função ainda pouco compreendida. A ordem dos genes importa para a regulação: genes vizinhos podem ser ativados ou desativados em conjunto, e a proximidade entre um gene e um elemento regulador é um mecanismo importante de controle da expressão.',
        ],
      },
      {
        id: 'gen-01-b6',
        type: 'exemplo',
        title: 'Exemplo prático: a receita e a cópia',
        paragraphs: [
          'Uma analogia útil: o DNA é o livro de receitas da célula; o RNA mensageiro é a fotocópia de uma única receita; a proteína é o prato pronto. A transcrição produz uma cópia de trabalho descartável, e a tradução executa a receita. Se o livro suffers um erro de digitação na receita, todas as cópias seguintes carregarão o erro — é assim que funcionam as mutações.',
          'Essa analogia também explica por que certas mutações não têm efeito: se a alteração ocorre na região não codificante, ou muda um códon para outro que especifica o mesmo aminoácido, a proteína permanece idêntica. Mutações neutras acumulam e são utilizadas em estudos de evolução para estimar tempo de divergência entre espécies.',
        ],
      },
      {
        id: 'gen-01-b7',
        type: 'resumo',
        title: 'Resumo da aula',
        items: [
          'DNA é polímero de nucleotídeos: fosfato, desoxirribose e base nitrogenada.',
          'A e T pareiam com duas ligações de hidrogênio; G e C com três.',
          'Gene = trecho de DNA; alelo = variante do gene.',
          'Dogma central: replicação, transcrição e tradução.',
          'Fenótipo resulta da interação entre genótipo e ambiente.',
        ],
      },
    ],
    keyConcepts: [
      'Dupla hélice e pareamento de bases',
      'Gene e alelo',
      'Genótipo e fenótipo',
      'Dogma central da Biologia Molecular',
      'Número de cromossomos e haplótipo',
    ],
    summaryPoints: [
      'A com T, G com C.',
      'Replicação → transcrição → tradução.',
      'Homozigoto: alelos iguais; heterozigoto: alelos diferentes.',
    ],
    quizQuestionIds: ['q-gen-01', 'q-gen-02', 'q-gen-03', 'q-gen-04', 'q-gen-05'],
    estimatedMinutes: 13,
    difficulty: 'medio',
    tags: ['DNA', 'gene', 'alelo', 'transcrição', 'tradução'],
    relatedLab: 'mendel',
  },
  {
    id: 'gen-02',
    topicId: 'genetica',
    title: 'Leis de Mendel e herança mendeliana',
    slug: 'leis-de-mendel-e-heranca-mendeliana',
    summary:
      'As três leis de Mendel na prática: cruzamentos, quadro de Punnett, probabilidades fenotípicas e casos de não mendeliana.',
    objectives: [
      'Enunciar as três leis de Mendel.',
      'Construir e interpretar um quadro de Punnett.',
      'Calcular probabilidades genotípicas e fenotípicas.',
      'Identificar herdanças autossômicas recessivas, dominante e ligada ao X.',
    ],
    blocks: [
      {
        id: 'gen-02-b1',
        type: 'texto',
        title: 'O experimento com ervilhas',
        paragraphs: [
          'Gregor Mendel observou ervilhas na horta do mosteiro de Brno, na atual República Tcheca, durante cerca de oito anos de experimentos controlados. Ele escolheu a ervilha por um motivo prático: as flores são autopolinizáveis, mas também é possível cruzá-las manualmente com pinças, de modo que se controle com precisão o parental envolvido. Além disso, a semente possui caracteres de fácil observação, como cor (verde ou amarela) e forma (lisa ou enrugada).',
          'Mendel começou com plantas de linhagem pura, generates umani geração F1 e, a partir dos cruzamentos, acompanhou as gerações F2 e F3. O controle da polinização foi o que permitiu quantificar a herança com rigor estatístico — sem ele, seria impossível distinguir um padrão mendeliano de uma tendência casual.',
        ],
      },
      {
        id: 'gen-02-b2',
        type: 'texto',
        title: 'As três leis',
        paragraphs: [
          'A primeira lei, ou lei da segregação, afirma que os dois alelos de um gene se separam durante a formação dos gametas, de modo que cada gameta recebe apenas um deles. Na segunda lei, lei da segregação independente, os pares de geneslocated em cromossomos diferentes se distribuem independentemente uns dos outros durante a meiose. A terceira lei, lei da dominância, estabelece que, na presença de um alelo dominante, o fenótipo recessivo não se manifesta — o concepto de dominância é a base do conceito de genótipo.',
          'A consequência prática mais importante da herança mendeliana é a proporção 3:1 observada na geração F2 de um monohibridismo: três descendentes com fenótipo dominante para cada um com fenótipo recessivo. Essa proporção não é uma contagem rígida em cada família pequena — é uma tendência estatística que se confirma quando se analisam muitos descendentes.',
        ],
      },
      {
        id: 'gen-02-b3',
        type: 'diagrama',
        title: 'Cruzamento monohíbrido',
        diagram: 'mendel-cruzamento',
        caption:
          'Cruzamento Aa × Aa. O quadro de Punnett dá as quatro combinações equiprováveis: 1 AA, 2 Aa, 1 aa.',
      },
      {
        id: 'gen-02-b4',
        type: 'texto',
        title: 'Como usar o quadro de Punnett',
        paragraphs: [
          'O quadro de Punnett é uma grade de duas colunas e duas linhas. Na parte superior, colocam-se os gametas de um progenitor; na lateral, os do outro. Cada célula da interseção representa um zigoto possível. Para um monohibridismo AA × Aa, o quadro fica assim:',
        ],
        callout: 'info',
      },
      {
        id: 'gen-02-b5',
        type: 'tabela',
        title: 'Padrões de herança mais comuns',
        table: {
          headers: ['Padrão', 'Exemplo', 'Observação'],
          rows: [
            ['Autossômica dominante', 'Polidactilia, braquidactilia', 'Acomete a cada geração; heterozigoto afetado'],
            ['Autossômica recessiva', 'Fibrose cística, fenilcetonúria', 'Pais carriers normais podem ter filho afetado'],
            ['Ligada ao X recessiva', 'Hemofilia, daltonismo', 'Acomete mais meninos; o cruzamento pode gerar portadoras'],
            ['Dominante ligada ao X', 'Raquitismo hipofosfatêmico', 'Rara; não transmite de pai para filho'],
            ['Multifactorial', 'Altura, pressão arterial', 'Depende de muitos genes e do ambiente'],
          ],
        },
      },
      {
        id: 'gen-02-b6',
        type: 'exemplo',
        title: 'Exemplo prático: daltonismo e a herança ligada ao X',
        paragraphs: [
          'O daltonismo para vermelho e verde é causado por uma mutação recessiva no gene que codifica o cones tipo L, no cromossomo X. Como o homem tem apenas um X, basta uma cópia do alelo defeituoso para manifestar a condição. A mulher, com dois X, precisa de duas cópias defeituosas.',
          'Se uma mulher portadora (XᴺXᵈ) casa com um homem de visão normal (XᴺY), a descendência tem 50% de chance de ser portadora (filhas), 25% de chance de ser filha com daltonismo, 25% de chance de ser filho com daltonismo e 25% de chance de ser filho de visão normal. O baixo número de casos de filhos com daltonismo se explica porque o pai transmite seu X apenas às filhas.',
        ],
      },
      {
        id: 'gen-02-b7',
        type: 'resumo',
        title: 'Resumo da aula',
        items: [
          'Mendel controleou a polinização e trabalhou com linhagens puras.',
          'Leis: segregação, segregação independente e dominância.',
          'Monohibridismo F2: 3:1 fenotípico; 1:2:1 genotípico.',
          'Ligada ao X recessiva.',
          'O quadro de Punnett enumera as combinações possíveis.',
        ],
      },
    ],
    keyConcepts: [
      'Leis de Mendel',
      'Quadro de Punnett',
      'Dominância e codominância',
      'Genes ligados ao X',
      'Probabilidade fenotípica',
    ],
    summaryPoints: [
      'F2 de monohibridismo: 3:1 fenótipo, 1:2:1 genótipo.',
      'Segregação independente exige genes em cromossomos diferentes.',
      'Herança ligada ao X tem padrão distinto.',
    ],
    quizQuestionIds: ['q-gen-06', 'q-gen-07', 'q-gen-08', 'q-gen-09', 'q-gen-10'],
    estimatedMinutes: 15,
    difficulty: 'medio',
    tags: ['mendel', 'Punnett', 'herança', 'cruzamento', 'probabilidade'],
    relatedLab: 'mendel',
  },
  {
    id: 'gen-03',
    topicId: 'genetica',
    title: 'Genética molecular: splicing, mutações e expressão gênica',
    slug: 'genetica-molecular-splicing-e-mutacoes',
    summary:
      'Do RNA mensageiro maduro às mutações: como o gene é processado e como pequenas alterações no DNA mudam fenótipos e doenças.',
    objectives: [
      'Explicar o papel dos exons e introns no processamento do RNA.',
      'Classificar mutações pontuais, de inserção e de deleção.',
      'Diferenciar mutação germinativa e somática.',
      'Relacionar a regulação da expressão gênica com fenótipos distintos.',
    ],
    blocks: [
      {
        id: 'gen-03-b1',
        type: 'texto',
        title: 'Do pré-RNA ao RNA maduro',
        paragraphs: [
          'O transcrito primário de um gene eucariótico — o pré-RNA mensageiro — contém tanto exons (sequências que permanecem no RNA maduro) quanto introns (sequências removidas). A retirada dos introns é feita pelo espliceossomo, um conjunto de proteínas e RNAs que reconhece as regiões de splice na extremidade de cada intron e realiza a excisão e a religação das partes codificadoras.',
          'Além da remoção de introns, o pré-RNA passa por modifications: adição de um chapéu de 7-metilguanosina na extremidade 5′, poliadenilação na extremidade 3′ e edição de editing em alguns transcritos. Todas essas alterações protegem o RNA da degradação, ajudam na exportação do núcleo e aumentam a eficiência da tradução.',
        ],
      },
      {
        id: 'gen-03-b2',
        type: 'texto',
        title: 'Tipos de mutação',
        paragraphs: [
          'Uma mutação é qualquer alteração na sequência de DNA. As mutações pontuais trocam um único par de bases. Quando a troca é silenciosa, o codão alterado codifica o mesmo aminoácido e o fenótipo não muda; quando é missense, produz um aminoácido diferente; e quando é nonsense, cria um códon de parada prematuro, encurtando a proteína.',
          'Inserções e deleções de bases provocam o deslocamento da leitura ("frameshift"). Se o número de bases inseridas ou removidas for múltiplo de três, a leitura é preservada a jusante do evento; caso contrário, todo o restante da sequência é lido em outra moldura, muitas vezes gerando uma proteína disfuncional. A deleção de três bases, por exemplo, remove um aminoácido e costuma ter efeito mais leve.',
        ],
        callout: 'atencao',
      },
      {
        id: 'gen-03-b3',
        type: 'tabela',
        title: 'Estrutura do códon e o efeito das mutações',
        table: {
          headers: ['Tipo', 'O que muda', 'Efeito típico'],
          rows: [
            ['Silenciosa', 'Códon equivalente', 'Nenhum fenótipo observável'],
            ['Missense', 'Aminoácido trocado', 'Pode ser neutro ou grave'],
            ['Nonsense', 'Codon de parada criado', 'Proteína truncada'],
            ['Frameshift (+1/−1)', 'Leitura deslocada', 'Geralmente grave'],
            ['Inserção/deleção de 3 bases', 'Um aminoácido a menos', 'Efeito geralmente moderado'],
          ],
        },
      },
      {
        id: 'gen-03-b4',
        type: 'texto',
        title: 'Germinativa ou somática?',
        paragraphs: [
          'Uma mutação germinativa ocorre em uma célula germinativa — gameta ou precursora — e pode ser transmitida à descendência. Uma mutação somática ocorre em uma célula do corpo e afeta apenas o organismo que a carrega, podendo gerar manchas na pele ou áreas de descoloração. Tumores, na maior parte dos casos, têm origem em mutações somáticas acumuladas ao longo da vida.',
          'A distinção é ética e clinicamente decisiva: mutações germinativas podem ser transmitidas, enquanto as somáticas não são herdadas. Esse é o motivo pelo qual agentes mutagênicos, como a radiação ionizante e certos produtos químicos, exigem precauções específicas para gestantes.',
        ],
      },
      {
        id: 'gen-03-b5',
        type: 'texto',
        title: 'Regulação da expressão gênica',
        paragraphs: [
          'Nem todos os genes são expressos ao mesmo tempo, e em todas as células. O controle ocorre em vários níveis: fatores de transcrição se ligam a regiões reguladoras do DNA e aumentam ou diminuem a transcrição; modificações epigenéticas, como a metilação do DNA e a acetilação das histonas, alteram o acesso ao material genético; e o próprio RNA mensageiro pode ser degradado antes de ser traduzido.',
          'Esse controle é decisivo para a diferenciação celular. Um neurônio e um hepatócito têm praticamente o mesmo genoma, mas expressam conjuntos de genes diferentes, e é por isso que suas formas e funções se diferenciam sem que o DNA se altere.',
        ],
      },
      {
        id: 'gen-03-b6',
        type: 'exemplo',
        title: 'Exemplo prático: a anemia falciforme',
        paragraphs: [
          'A anemia falciforme é causada por uma mutação pontual no gene da beta-globina: a substituição do ácido glutâmico pela valina no códon 6 da proteína. Uma única base trocada altera a forma da hemoglobina, que passa a polimerizar em condições de baixa tensão de oxigênio, deformando o glóbulo vermelho em forma de foice.',
          'O fenótipo varia com a dosagem de alelos: homozigotos desenvolvem a doença; heterozigotos apresentam apenas uma fração de células falciformes e, em geral, vivem bem — a condição é chamada de anemia falciforme heterocítica. O alelo falciforme, em frequência elevada em regiões com-malária histórica, confere vantagem contra a malária, um exemplo clássico de seleção balanceadora.',
        ],
      },
      {
        id: 'gen-03-b7',
        type: 'resumo',
        title: 'Resumo da aula',
        items: [
          'Exons permanecem; introns são removidos pelo espliceossomo.',
          'Mutações: silenciosa, missense, nonsense e frameshift.',
          'Germinativas são herdáveis; somáticas afetam apenas o indivíduo.',
          'Regulação gênica ocorre em múltiplos níveis.',
          'Uma única base trocada pode causar doença grave (anemia falciforme).',
        ],
      },
    ],
    keyConcepts: [
      'Spliceossomo e introns',
      'Mutação silenciosa, missense e nonsense',
      'Frameshift',
      'Mutação germinativa e somática',
      'Regulação da expressão gênica',
    ],
    summaryPoints: [
      'Éxons permanecem, introns são removidos.',
      'Germinativa herda-se; somática não.',
      'Regulação gênica diferencia células com o mesmo DNA.',
    ],
    quizQuestionIds: ['q-gen-11', 'q-gen-12', 'q-gen-13', 'q-gen-14', 'q-gen-15'],
    estimatedMinutes: 14,
    difficulty: 'dificil',
    tags: ['splicing', 'mutação', 'éxon', 'intron', 'expressão gênica'],
    relatedLab: 'mendel',
  },
]
