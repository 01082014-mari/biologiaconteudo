import type { Lesson } from '@/types'

/** Trilha de Ecologia — três aulas completas. */
export const ECOLOGY_LESSONS: Lesson[] = [
  {
    id: 'eco-01',
    topicId: 'ecologia',
    title: 'População, comunidade e ecossistema',
    slug: 'populacao-comunidade-e-ecossistema',
    summary:
      'Os níveis de organização da vida: do indivíduo ao bioma, e os fatores que definem o tamanho de uma população.',
    objectives: [
      'Diferenciar população, comunidade, ecossistema e bioma.',
      'Identificar os fatores que regulam o crescimento populacional.',
      'Aplicar o modelo de crescimento exponencial e logístico.',
      'Explicar a relação entre capacidade de suporte e recursos.',
    ],
    blocks: [
      {
        id: 'eco-01-b1',
        type: 'texto',
        title: 'A vida organizada em níveis',
        paragraphs: [
          'Um indivíduo é um único organismo. Uma população é o conjunto de organismos da mesma espécie que ocupam a mesma área e interagem entre si — compartilham recursos e cruzam, de modo que formam uma unidade reprodutiva. Uma comunidade é o conjunto de todas as populações de diferentes espécies que habitam a mesma região. O ecossistema acrescenta o componente abiótico: o conjunto de fatores físicos e químicos — luz, temperatura, água, solo, vento — com os quais os seres vivos interagem.',
          'Acima do ecossistema estão o bioma, conjunto de ecossistemas com vegetação e fauna semelhantes, distribuídos por regiões de clima parecido, e a biosfera, o total de todos os organismos do planeta.',
        ],
      },
      {
        id: 'eco-01-b2',
        type: 'diagrama',
        title: 'Organização dos níveis de vida',
        diagram: 'ecossistema',
        caption:
          'Do indivíduo à biosfera, cada nível inclui o anterior e acrescenta novas interações.',
      },
      {
        id: 'eco-01-b3',
        type: 'texto',
        title: 'O que limita o crescimento de uma população?',
        paragraphs: [
          'Em condições ideais — alimento e espaço ilimitados, ausência de predadores e de doença — uma população cresceria exponencialmente, dobrando de tamanho a cada intervalo de tempo. Esse cenário raramente se verifica na natureza.',
          'A saída do crescimento exponencial é descrita pelo modelo logístico, em que o crescimento desacelera à medida que a população se aproxima da capacidade de suporte (K), o número máximo de indivíduos que o ambiente pode sustentar indefinidamente. Quando o tamanho populacional se aproxima de K, a taxa de crescimento tende a zero, e a população estabiliza.',
          'Esse limite é definido por recursos — alimento, água, espaço — e é ampliado ou reduzido por fatores bióticos como predação, parasitismo e doença. As populações humanas, ao contrário das demais, conseguem ultrapassar a capacidade de suporte graças à inovação tecnológica, o que acelera seu crescimento.',
        ],
        callout: 'info',
      },
      {
        id: 'eco-01-b4',
        type: 'tabela',
        title: 'Fatores que afetam o tamanho populacional',
        table: {
          headers: ['Fator', 'Tipo', 'Exemplo de efeito'],
          rows: [
            ['Natalidade', 'Biótico', 'Aumenta a população'],
            ['Mortalidade', 'Biótico', 'Reduz a população'],
            ['Imigração', 'Biótico', 'Aumenta a população'],
            ['Emigração', 'Biótico', 'Reduz a população'],
            ['Alimento e espaço', 'Abiótico', 'Define a capacidade de suporte'],
            ['Temperatura e chuva', 'Abiótico', 'Condiciona a sobrevivência'],
          ],
        },
      },
      {
        id: 'eco-01-b5',
        type: 'exemplo',
        title: 'Exemplo prático: a curva populacional do lobo na Serra da Mesa Verde',
        paragraphs: [
          'A reintrodução do lobo na Serra da Mesa Verde, no Colorado, é um caso clássico de regulação populacional. Ao voltar, o lobo passou a prear alces e cervos, reduzindo a pressão de herbivoria sobre a vegetação. Com menos plantas sendo comidas, a regeneração das árvores de rio e de freixos aumentou, o que afetou toda a teia alimentar local.',
          'O caso ilustra o conceito de efeito em cascata: a mudança em um único trof nível se propaga para os demais. Também mostra por que o número total de indivíduos de uma espécie não basta para avaliar a saúde de uma população — importa a estrutura etária e a distribuição espacial.',
        ],
      },
      {
        id: 'eco-01-b6',
        type: 'resumo',
        title: 'Resumo da aula',
        items: [
          'População: indivíduos da mesma espécie na mesma área.',
          'Comunidade: populações de diferentes espécies na mesma área.',
          'Ecossistema: comunidade + fatores abióticos.',
          'Modelo logístico: crescimento desacelera até a capacidade de suporte K.',
          'Natalidade, mortalidade, imigração e emigração alteram o tamanho populacional.',
        ],
      },
    ],
    keyConcepts: [
      'População e comunidade',
      'Ecossistema e bioma',
      'Capacidade de suporte (K)',
      'Crescimento exponencial e logístico',
      'Natalidade, mortalidade, imigração e emigração',
    ],
    summaryPoints: [
      'População = mesmosuelingues espécie, mesma área.',
      'K limita o crescimento populacional.',
      'Efeito em cascata: mudar um trof nível altera o ecossistema inteiro.',
    ],
    quizQuestionIds: ['q-eco-01', 'q-eco-02', 'q-eco-03', 'q-eco-04', 'q-eco-05'],
    estimatedMinutes: 12,
    difficulty: 'medio',
    tags: ['população', 'ecossistema', 'comunidade', 'capacidade de suporte', 'bioma'],
    relatedLab: 'cadeia-alimentar',
  },
  {
    id: 'eco-02',
    topicId: 'ecologia',
    title: 'Cadeias e teias alimentar',
    slug: 'cadeias-e-teias-alimentar',
    summary:
      'Quem come quem: níveis tróficos, cadeias simples, teias complexas, ciclo do carbono e o impacto dos decompositores.',
    objectives: [
      'Identificar produtores, consumidores e decompositores.',
      'Diferenciar cadeia alimentar de teia alimentar.',
      'Relacionar fluxo de energia eLevels tróficos.',
      'Explicar o papel da matéria orgânica no solo.',
    ],
    blocks: [
      {
        id: 'eco-02-b1',
        type: 'texto',
        title: 'Os elos da cadeia',
        paragraphs: [
          'Uma cadeia alimentar descreve quem se alimenta de quem em uma sequência linear. No primeiro nível estão os produtores, organismos que fabricam a própria matéria orgânica por fotossíntese ou quimiossíntese — plantas, algas e cianobactérias na maior parte dos casos. O segundo nível reúne os consumidores primários, herbívoros que se alimentam dos produtores. O terceiro, os consumidores secundários, alimentam-se dos primários. Assim, a cadeia avança até os decompositores — fungos e bactérias — que quebram restos e devolvem os nutrientes ao solo.',
          'Na prática, os ecossistemas reais são teias alimentares: várias cadeias se cruzam, e um organismo pode ocupar mais de um nível trófico. Um gavião que come uma cobra que come um rato que come capim ocupa, no mesmo meal, o terceiro e o quarto níveis.',
        ],
      },
      {
        id: 'eco-02-b2',
        type: 'diagrama',
        title: 'Cadeia alimentar típica',
        diagram: 'cadeia-alimentar',
        caption:
          'Produtor → consumidor primário → consumidor secundário → decompositor.',
      },
      {
        id: 'eco-02-b3',
        type: 'texto',
        title: 'Energia em uma direção, matéria em duas',
        paragraphs: [
          'O fluxo de energia em um ecossistema é unidirecional. A energia solar é captada pelos produtores, transformada em energia química e passa de um nível trófico ao seguinte. A cada transferência, cerca de 90% da energia se dissipa como calor — por isso existe um número limitado de níveis tróficos em uma cadeia.',
          'Já a matéria é cíclica: os elementos químicos circulam entre os seres vivos e o meio abiótico. O carbono, por exemplo, sai da atmosfera na forma de CO₂, entra nos produtores por fotossíntese, percorre a cadeia alimentar e retorna à atmosfera pela respiração e pela decomposição. O nitrogênio faz um percurso semelhante, graças às bactérias fixadoras e nitrificantes, e o fósforo circula apenas entre rochas, solo, plantas e animais.',
        ],
        callout: 'dica',
      },
      {
        id: 'eco-02-b4',
        type: 'tabela',
        title: 'Cadeia e teia alimentar',
        table: {
          headers: ['Aspecto', 'Cadeia alimentar', 'Teia alimentar'],
          rows: [
            ['Estrutura', 'Sequência linear', 'Rede de interconexões'],
            ['Exemplo', 'Capim →(coelho) →(raposa)', 'Capim serve a coelhos, insetos e cervos'],
            ['Realismo', 'Simplificação didática', 'Representação da natureza'],
            ['Estabilidade', 'Menor estabilidade', 'Maior estabilidade e resiliência'],
          ],
        },
      },
      {
        id: 'eco-02-b5',
        type: 'exemplo',
        title: 'Exemplo prático: a praga dos gatos nas ilhas',
        paragraphs: [
          'A introdução de gatos domesticados em ilhas oceânicas produziu efeitos em cascata: aumentou a população de ratos, que passaram a se alimentar de aves que normalmente controlavam insetos. Com menos aves predadoras, a população de insetos explodiu, devorando as aves marinhas e seus ovos. A teia inteira foi desestabilizada, afetando inclusive a polinização e a saúde dos recifes.',
          'O caso mostra que remover uma espécie-chave de uma teia não afeta apenas os organismos diretamente ligados a ela: o efeito se propaga em ondas. Por isso a introdução de espécies exógenas é avaliada com tanto cuidado em ilhas, onde os ecossistemas são simples e têm poucos mecanismos de compensação.',
        ],
      },
      {
        id: 'eco-02-b6',
        type: 'resumo',
        title: 'Resumo da aula',
        items: [
          'Produtores, consumidores (primários, secundários) e decompositores.',
          'Teia alimentar representa a rede real de relações.',
          'Energia flui em uma direção; a matéria circula em ciclos.',
          'Cerca de 90% da energia se perde como calor em cada nível.',
          'Decompositores devolvem nutrientes ao solo.',
        ],
      },
    ],
    keyConcepts: [
      'Níveis tróficos',
      'Produtor, consumidor e decomposidor',
      'Teia alimentar',
      'Fluxo de energia unidirecional',
      'Ciclo do carbono',
    ],
    summaryPoints: [
      'Energia flui em uma direção.',
      'Matéria circula em ciclos.',
      'Teias são mais estáveis que cadeias.',
    ],
    quizQuestionIds: ['q-eco-06', 'q-eco-07', 'q-eco-08', 'q-eco-09', 'q-eco-10'],
    estimatedMinutes: 12,
    difficulty: 'medio',
    tags: ['cadeia alimentar', 'teia', 'produtor', 'decompositor', 'carbono'],
    relatedLab: 'cadeia-alimentar',
  },
  {
    id: 'eco-03',
    topicId: 'ecologia',
    title: 'Fluxo de energia, ciclos biogeoquímicos e impacto humano',
    slug: 'fluxo-de-energia-ciclos-e-impacto-humano',
    summary:
      'Produtividade primária, ciclos de matéria,-acidificação, efeito estufa, eutrofização e perda de biodiversidade.',
    objectives: [
      'Definir produtividade primária bruta e líquida.',
      'Descrever o ciclo do nitrogênio.',
      'Explicar o efeito estufa e a acidificação dos oceanos.',
      'Relacionar ações humanas à perda de biodiversidade.',
    ],
    blocks: [
      {
        id: 'eco-03-b1',
        type: 'texto',
        title: 'Quanto a natureza produz?',
        paragraphs: [
          'Produtividade primária bruta é a quantidade total de matéria orgânica produzida pelos organismos autotróficos por unidade de tempo e área. A produtividade primária líquida descontou disso o próprio consumo da respiração, sendo, portanto, a energia disponível para os consumidores. Em escala global, a produtividade primária líquida terrestre é estimada em cerca de 60 bilhões de toneladas de matéria orgânica por ano.',
          'Essa produção se distribui de forma desigual: as florestas tropicais úmidas e os estuários são os ecossistemas mais produtivos do planeta, enquanto desertos e oceanos abertos apresentam valores baixos. Curiosamente, o oceano aberto, com sua enorme extensão, contribui com uma parcela expressiva da produção global de fitoplâncton.',
        ],
      },
      {
        id: 'eco-03-b2',
        type: 'texto',
        title: 'O ciclo do nitrogênio',
        paragraphs: [
          'O nitrogênio constitui 78% da atmosfera, mas a maioria das formas não pode ser usada diretamente pelos organismos. O processo que torna o nitrogênio disponível é a fixação, realizada por bactérias — incluindo as simbioticamente associadas às raízes de leguminosas —, que convertem N₂ em amônia.',
          'A amônia é transformada em nitrito e depois em nitrato pelas bactérias nitrificantes. As plantas absorvem nitrato do solo; os animais obtêm nitrogênio ao se alimentarem. Ao morrerem, os organismos são decompostos, liberando amônia, que pode voltar ao solo por ammonificação ou seguir para a atmosfera por nitrificação desnitrificante. Uma fração volta por fixação atmosférica, completando o ciclo.',
        ],
        callout: 'info',
      },
      {
        id: 'eco-03-b3',
        type: 'tabela',
        title: 'Principais problemas ambientais de origem antrópica',
        table: {
          headers: ['Problema', 'Mecanismo', 'Consequência'],
          rows: [
            ['Efeito estufa ampliado', 'Aumento de CO₂ e CH₄ na atmosfera', 'Aquecimento global e eventos extremos'],
            ['Chuva ácida', 'SO₂ e NOₓ formam ácidos na atmosfera', 'Dano à vegetação, aos solos e às construções'],
            ['Acidificação dos oceanos', 'Absorção de CO₂ atmosférico', 'Corais e conchas fragilizados'],
            ['Eutrofização', 'Excesso de nutrientes (N e P)', 'Proliferação de algas e hipóxia'],
            ['Perda de biodiversidade', 'Destruição de habitat e sobrecaça', 'Extinções e perda de serviços ecossistêmicos'],
          ],
        },
      },
      {
        id: 'eco-03-b4',
        type: 'texto',
        title: 'O efeito estufa em linguagem simples',
        paragraphs: [
          'A atmosfera retém naturalmente parte da radiação infravermelha emitida pela superfície terrestre, o que mantém a temperatura média do planeta em valores compatíveis com a vida. Gases de efeito estufa — dióxido de carbono, metano, óxido nitroso, vapor d’água — são os responsáveis por essa retenção.',
          'O problema não é a existência do efeito estufa, mas sua intensificação. A queima de combustíveis fósseis e o desmatamento aumentam a concentração de CO₂, o que amplia a retenção de calor. Essa energia extra demora décadas a ser dissipada pelo oceano, o que explica por que a temperatura já se modifica mesmo após a redução das emissões.',
        ],
      },
      {
        id: 'eco-03-b5',
        type: 'exemplo',
        title: 'Exemplo prático: o caso dos recifes de corais',
        paragraphs: [
          'O recife de corais é um ecossistema extraordinariamente produtivo: as zooxantelas, algas simbióticas presentes nos corais, realizam fotossíntese e fornecem de 70% a 90% do alimento do animal hospedeiro. Por isso, a saúde dos corais depende diretamente da saúde do fitoplâncton e da temperatura da água.',
          'Quando a água aquece, as zooxantelas são expulsas dos corais, que ficam brancos — o fenômeno do branqueamento. Sem fotossíntese, o coral para de crescer e pode morrer. Se a temperatura se normaliza rápido o suficiente, o coral pode se recuperar; se a anomalia persiste, ele morre e o recife passa por uma fase de dominância de algas, com perda da biodiversidade associada.',
        ],
      },
      {
        id: 'eco-03-b6',
        type: 'resumo',
        title: 'Resumo da aula',
        items: [
          'PPB é a produção total; PPN é a produção líquida disponível.',
          'Fixação, nitrificação, denitrificação e ammonificação fecham o ciclo do nitrogênio.',
          'O efeito estufa é natural; o problema é a intensificação.',
          'Eutrofização provoca proliferação de algas e queda de oxigênio.',
          'A perda de biodiversidade reduz serviços ecossistêmicos essenciais.',
        ],
      },
    ],
    keyConcepts: [
      'Produtividade primária bruta e líquida',
      'Ciclo do nitrogênio',
      'Efeito estufa',
      'Eutrofização',
      'Biodiversidade',
    ],
    summaryPoints: [
      'PPN = PPB − respiração dos autotróficos.',
      'Fixação do nitrogênio é feita por bactérias.',
      'A acidificação dos oceanos ########### corais.',
    ],
    quizQuestionIds: ['q-eco-11', 'q-eco-12', 'q-eco-13', 'q-eco-14', 'q-eco-15'],
    estimatedMinutes: 13,
    difficulty: 'medio',
    tags: ['produtividade', 'nitrogênio', 'efeito estufa', 'eutrofização', 'biodiversidade'],
    relatedLab: 'fotossintese',
  },
]
