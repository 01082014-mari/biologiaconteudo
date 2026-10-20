import type { Lesson } from '@/types'

/**
 * Trilha de Citologia — quatro aulas completas.
 *
 * As blocks renderizam o conteúdo didático no leitor de aulas.
 */
export const CITOLOGY_LESSONS: Lesson[] = [
  {
    id: 'cit-01',
    topicId: 'citologia',
    title: 'A célula e a teoria celular',
    slug: 'a-celula-e-a-teoria-celular',
    summary:
      'Entenda por que todos os seres vivos são formados por células, como a teoria celular nasceu e quais são os limites de aplicação do modelo.',
    objectives: [
      'Definir célula segundo a teoria celular moderna.',
      'Diferenciar células procarióticas de eucarióticas.',
      'Relacionar Shape-Maker-Talker: forma, função e informação.',
      'Identificar as organelas presentes em células eucarióticas.',
    ],
    blocks: [
      {
        id: 'cit-01-b1',
        type: 'texto',
        title: 'O que é uma célula?',
        paragraphs: [
          'Uma célula é a menor unidade capaz de realizar de forma autônoma as funções da vida: nutrir-se, crescer, responder a estímulos, reproduzir-se e manter sua organização interna. Robert Hooke, em 1665, foi o primeiro a observar células, ao examinar uma cortiça com um microscópio rudimentar. Ele observou pequenas cavidades vazias e as chamou de "células" — termo que, em latim, significa "pequenas câmaras".',
          'A teoria celular, formulada por Matthias Schleiden em 1838 e completada por Theodor Schwann em 1839, generalizou uma ideia simples: todos os seres vivos são compostos por células, e toda célula provém de outra célula pré-existente. Rudolf Virchow resumiu isso em 1855 com a frase "omnis cellula e cellula", que significa "toda célula vem de uma célula".',
          'Hoje sabemos que existem exceções importantes à regra: há sistemas vivos acelulares, como os vírus, que não são considerados células por não terem organização própria e dependerem de uma célula hospedeira para se reproduzir. A teoria celular, portanto, continua sendo a base da Biologia moderna, mas sua aplicação exige essas ressalvas.',
        ],
      },
      {
        id: 'cit-01-b2',
        type: 'tabela',
        title: 'Células procarióticas x eucarióticas',
        table: {
          headers: ['Critério', 'Procariótica', 'Eucariótica'],
          rows: [
            ['Núcleo', 'Ausente — sem membrana nuclear', 'Presente — núcleo delimitado'],
            ['Material genético', 'Molécula circular de DNA no citoplasma', 'Linear, dentro do núcleo'],
            ['Organelas membranosas', 'Ausentes', 'Presentes (mitocôndrias, RE, Golgi…)'],
            ['Tamanho típico', '0,1 a 5 µm', '10 a 100 µm'],
            ['Exemplos', 'Bactérias, arqueas', 'Animais, plantas, fungos, protistas'],
          ],
        },
      },
      {
        id: 'cit-01-b3',
        type: 'diagrama',
        title: 'Anatomia comparada da célula',
        diagram: 'celula-animal',
        caption:
          'Esquema de uma célula animal eucariótica. Clique no laboratório virtual para explorar cada organela interativamente.',
      },
      {
        id: 'cit-01-b4',
        type: 'texto',
        title: 'Três propriedades que definem uma célula',
        paragraphs: [
          'Uma célula viva pode ser descrita por três eixos complementares. O primeiro é a forma: a estrutura e a organização do citoplasma determinam a aparência da célula. O segundo é a função: as organelas são máquinas especializadas que executam tarefas específicas — a mitocôndria produz ATP, o ribossomo sintetiza proteínas, o lisossomo digere resíduos. O terceiro é a informação: o material genético presente no núcleo (ou no citoplasma, nos procariotas) contém as instruções para construir e operar essas máquinas.',
          'A relação entre forma e função aparece com clareza em células como o neurônio, que possui prolongamentos longos para transmitir impulsos a longa distância, e o glóbulo vermelho maduro, que tem forma de disco para aumentar a área de troca de gases. Conhecer a função de uma organela é, na prática, saber interpretá-la.',
        ],
      },
      {
        id: 'cit-01-b5',
        type: 'curiosidade',
        title: 'Curiocidade: o maior e o menor',
        paragraphs: [
          'A maior célula do corpo humano é o ovócito, com cerca de 120 micrômetros de diâmetro — tamanho similar ao de uma linha de ponto final. Já a menor célula do corpo humano é o espermatozoide, com cerca de 50 micrômetros de comprimento e menos de 1 micrômetro de largura em sua cabeça. Ambas são células excepcionais dentro do organismo.',
        ],
        callout: 'info',
      },
      {
        id: 'cit-01-b6',
        type: 'resumo',
        title: 'Resumo da aula',
        items: [
          'Célula é a unidade fundamental e autônoma dos seres vivos.',
          'A teoria celular sustenta que todo ser vivo é formado por células e que toda célula deriva de outra célula.',
          'Vírus são acelulares e ficam fora do alcance da teoria celular.',
          'Células procarióticas não têm núcleo nem organelas membranosas; eucarióticas têm ambos.',
          'Forma, função e informação são eixos que organizam a leitura de qualquer célula.',
        ],
      },
    ],
    keyConcepts: [
      'Teoria celular (Schleiden e Schwann)',
      'Procarioto x eucarioto',
      'Organela celular',
      'Biosfera e níveis de organização',
      'Acarição (vírus)',
    ],
    summaryPoints: [
      'Célula: menor unidade com vida própria.',
      'Núcleo ausente nas procarióticas, presente nas eucarióticas.',
      'Vírus são acelulares.',
    ],
    quizQuestionIds: ['q-cit-01', 'q-cit-02', 'q-cit-03', 'q-cit-04', 'q-cit-05'],
    estimatedMinutes: 11,
    difficulty: 'facil',
    tags: ['célula', 'teoria celular', 'procarioto', 'eucarioto'],
    relatedLab: 'celula-animal',
  },
  {
    id: 'cit-02',
    topicId: 'citologia',
    title: 'Membrana plasmática e transporte de substâncias',
    slug: 'membrana-plasmatica-e-transporte',
    summary:
      'Como a membrana regula a entrada e a saída de substâncias, e o que diferencia transporte passivo de transporte ativo.',
    objectives: [
      'Descrever a estrutura fluida da membrana plasmática.',
      'Explicar a permeabilidade seletiva.',
      'Diferenciar difusão simples, difusão facilitada, osmose e transporte ativo.',
      'Relacionar o transporte ativo com a energia da ATP e com a bomba de sódio e potássio.',
    ],
    blocks: [
      {
        id: 'cit-02-b1',
        type: 'texto',
        title: 'Uma barreira e, ao mesmo tempo, uma_INTERFACE',
        paragraphs: [
          'A membrana plasmática separa o interior da célula do meio externo, mas não é uma parede impassável. É uma estrutura fluida, composta majoritariamente por fosfolipídios e proteínas, que funciona como uma barreira seletiva: deixa passar algumas substâncias mais facilmente que outras.',
          'O modelo aceito hoje é o "modelo do mosaico fluido", proposto por Singer e Nicolson em 1972. Nele, a membrana é uma bicamada de fosfolipídios — cujas cabeças polares ficam voltadas para fora e para dentro, e cujas caudas hidrofóbicas se encostam — com proteínas dispersas como mosaicos. Parte dessas proteínas está apenas na face interna ou externa; outras são transmembrana, atravessando a bicamada inteira.',
          'A bicamada se comporta como uma barreira quase impermeável a íons e a moléculas polares grandes. Moléculas pequenas e apolares, como oxigênio e dióxido de carbono, atravessam por difusão simples. Glicose e íons precisam de proteínas transportadoras. Água, apesar de ser polar, atravessa em parte pela via_special das aquaporinas e também por osmose.',
        ],
      },
      {
        id: 'cit-02-b2',
        type: 'tabela',
        title: 'Comparando as vias de transporte',
        table: {
          headers: ['Via', 'Energia', 'Proteína envolvida', 'Exemplo'],
          rows: [
            ['Difusão simples', 'Não exige', 'Não', 'O₂, CO₂, água (parcial)'],
            ['Difusão facilitada', 'Não exige', 'Sim (canal ou carreador)', 'Glicose, íons'],
            ['Osmose', 'Não exige', 'Não (ou aquaporina)', 'Água'],
            ['Transporte ativo primário', 'Exige ATP', 'Sim (bomba)', 'Na⁺/K⁺-ATPase'],
            ['Transporte ativo secundário', 'Usa gradiente de Na⁺', 'Sim (cotransportador)', 'Absorção de glicose no intestino'],
          ],
        },
      },
      {
        id: 'cit-02-b3',
        type: 'texto',
        title: 'Osmose e tonicidade',
        paragraphs: [
          'Osmose é o movimento de água através de uma membrana semipermeável, do meio menos concentrado em solutos para o mais concentrado. É um processo passivo, que consome energia indireta do gradiente de concentração.',
          'Quando uma célula está em um meio isotônico, há equilíbrio entre entrada e saída de água. Em meio hipotônico, a água entra na célula: ela fica turgida e pode romper a membrana — esse phenomenon chama-se lise, ou hemólise quando o caso envolve hemácias. Em meio hipertônico, a água sai: a célula murcha, encolhe e pode morrer por plasmólise.',
        ],
        callout: 'dica',
      },
      {
        id: 'cit-02-b4',
        type: 'diagrama',
        title: 'Cadeia de transporte de gases',
        diagram: 'sistema-circulatorio',
        caption:
          'O transporte de gases entre pulmões e tecidos depende da tensão parcial dos gases e da hemoglobina.',
      },
      {
        id: 'cit-02-b5',
        type: 'exemplo',
        title: 'Exemplo prático: por que não morremos de edema',
        paragraphs: [
          'Em classrooms de histologia, células placed em solução hipertônica perderam água e seriam destruídas. No corpo, o mesmo equilíbrio é mantido por um sistema de osmose que inclui a albumina plasmática e a pressão oncótica do plasma, além da regulation de água pelos rins e do hormônio antidiurético (ADH).',
          'Quando a albumina escapa do capilar para o interstício, a pressão oncótica local aumenta, o que faz mais água entrar no interstício e provoca edema. É um exemplo clínico direto de que transporte de água e tonicidade não são detalhes acadêmicos: eles determinam o volume de líquido nos compartimentos do corpo.',
        ],
      },
      {
        id: 'cit-02-b6',
        type: 'resumo',
        title: 'Resumo da aula',
        items: [
          'A membrana é fluida (modelo do mosaico fluido) e permeavelmente seletiva.',
          'Difusão simples e osmose são passivos; a osmose move água de hypotônico para hipertônico.',
          'Difusão facilitada usa proteínas carreadoras ou canais e não gasta ATP.',
          'Transporte ativo primário gasta ATP diretamente; o secundário usa o gradiente de Na⁺.',
          'A bomba Na⁺/K⁺ mantém o potencial de membrana e o volume celular.',
        ],
      },
    ],
    keyConcepts: [
      'Modelo do mosaico fluido',
      'Permeabilidade seletiva',
      'Osmose e tonicidade',
      'Bomba de sódio e potássio',
      'Bicamada lipídica',
    ],
    summaryPoints: [
      'Modelo do mosaico fluido (Singer e Nicolson, 1972).',
      'Difusão e osmose são passivas.',
      'Transporte ativo primário consome ATP.',
    ],
    quizQuestionIds: ['q-cit-06', 'q-cit-07', 'q-cit-08', 'q-cit-09', 'q-cit-10'],
    estimatedMinutes: 13,
    difficulty: 'facil',
    tags: ['membrana', 'osmose', 'difusão', 'transporte ativo', 'ATP'],
    relatedLab: 'celula-animal',
  },
  {
    id: 'cit-03',
    topicId: 'citologia',
    title: 'Organelas e respiração celular',
    slug: 'organelas-e-respiracao-celular',
    summary:
      'Tour completo pelas organelas eucarióticas, com foco no caminho da glicose até o ATP dentro da mitocôndria.',
    objectives: [
      'Identificar a função de cada organela apresentada.',
      'Descrever as três etapas da respiração celular.',
      'Explicar a produção de ATP pela fosforilação oxidativa.',
      'Comparar respiração aeróbia e fermentação.',
    ],
    blocks: [
      {
        id: 'cit-03-b1',
        type: 'texto',
        title: 'A célula como uma fábrica organizada',
        paragraphs: [
          'Uma célula eucariótica é um ambiente de fábrica com compartimentos especializados. O núcleo guarda o material genético e controla as atividades. O retículo endoplasmático rugoso, coberto de ribossomos, sintetiza proteínas destinadas à secreção ou a membranas; o retículo endoplasmático liso atua na detoxificação e na síntese de lipídios. O complexo de Golgi modifica, classifica e empacota essas proteínas.',
          'Os lisossomos funcionam como o sistema digestivo interno: contêm enzimas hidrolíticas que degradam macromoléculas, organelas gastas ethouseiro pathogens. Os peroxissomos quebram ácidos graxos muito compridos e geram peróxido de hidrogênio, neutralizado pela catalase. O citoesqueleto, formado por microfilamentos, microtúbulos e filamentos intermediários, dá forma, mantém a posição dos orgânulos e participa do movimento celular.',
        ],
      },
      {
        id: 'cit-03-b2',
        type: 'diagrama',
        title: 'Fluxo da respiração celular',
        diagram: 'ciclo-krebs',
        caption:
          'Glicólise no citoplasma, ciclo de Krebs na matriz mitocondrial e cadeia respiratória na membrana interna.',
      },
      {
        id: 'cit-03-b3',
        type: 'texto',
        title: 'As três etapas da respiração',
        paragraphs: [
          'A respiração celular aeróbia quebra a glicose para liberar a energia armazenada em suas ligações. A glicólise acontece no citoplasma: uma molécula de glicose é transformada em duas de piruvato, com produção líquida de 2 ATP e 2 NADH. Essa etapa não exige oxigênio.',
          'O piruvato entra na mitocôndria e é convertido em acetil-CoA, que alimenta o ciclo de Krebs (ciclo do ácido cítrico), na matriz. O ciclo libera CO₂, produz NADH e FADH₂ e gera 2 ATP por glicose. O papel real do ciclo é carregar os transportadores de elétrons: sem NADH e FADH₂, a cadeia respiratória não teria o que oxidar.',
          'Por fim, NADH e FADH₂ entregam seus elétrons para a cadeia respiratória, na membrana interna da mitocôndria. Os elétrons percorrem uma série de proteínas até o oxigênio, que é o aceptor final de elétrons e forma água. A energia liberada bombeia prótons para o espaço intermembranoso, criando um gradiente que a ATP sintase utiliza para produzir ATP — a fosforilação oxidativa. O saldo da respiração aeróbia é de cerca de 30 a 32 ATP por glicose.',
        ],
      },
      {
        id: 'cit-03-b4',
        type: 'tabela',
        title: 'Respiração aeróbia x fermentação',
        table: {
          headers: ['Critério', 'Respiração aeróbia', 'Fermentação'],
          rows: [
            ['Local', 'Citoplasma e mitocôndria', 'Citoplasma'],
            ['Oxigênio', 'Necessário como aceptor final', 'Não utilizado'],
            ['Produtos finais', 'CO₂, H₂O e ATP', 'Etanol ou ácido lático + ATP'],
            ['ATP por glicose', 'Cerca de 30 a 32', '2'],
            ['Exemplo biológico', 'Células da maior parte dos eucariotas', 'Músculo sob esforço intenso, leveduras'],
          ],
        },
      },
      {
        id: 'cit-03-b5',
        type: 'exemplo',
        title: 'Exemplo prático: a fermentação no pão e na cerveja',
        paragraphs: [
          'O pão cresce por causa da fermentação. A levedura Saccharomyces cerevisiae converte o açúcar da massa em etanol e dióxido de carbono. O gás fica retido pelas proteínas do trigo e infla a massa; o etanol evapora durante o forno. Na cerveja, o mesmo CO₂, retido no líquido em fermentação, produz a espuma e a carbonatação.',
          'Em animais, a fermentação lática permite que o músculo continue produzindo ATP quando o oxigênio escasseia em exercícios intensos, gerando lactato e causando a sensação de queimação muscular. Essa situação mostra que uma via metabólica "menos eficiente" ainda pode ser a solução mais rápida quando o tempo é escasso.',
        ],
      },
      {
        id: 'cit-03-b6',
        type: 'resumo',
        title: 'Resumo da aula',
        items: [
          'Cada organela executa uma tarefa específica dentro da célula.',
          'A respiração tem três etapas: glicólise, ciclo de Krebs e fosforilação oxidativa.',
          'O oxigênio é o aceptor final de elétrons da cadeia respiratória.',
          'A fermentação ocorre sem oxigênio e rende apenas 2 ATP por glicose.',
          'A mitocôndria é autossuficiente: possui DNA e ribossomos próprios.',
        ],
      },
    ],
    keyConcepts: [
      'Mitocôndria e cadeia respiratória',
      'Glicólise',
      'Ciclo de Krebs',
      'ATP e fosforilação oxidativa',
      'Fermentação',
    ],
    summaryPoints: [
      'Três etapas: glicólise, Krebs e fosforilação oxidativa.',
      'Oxigênio é o aceptor final de elétrons.',
      'Fermentação sem oxigênio rende 2 ATP.',
    ],
    quizQuestionIds: ['q-cit-11', 'q-cit-12', 'q-cit-13', 'q-cit-14', 'q-cit-15'],
    estimatedMinutes: 14,
    difficulty: 'medio',
    tags: ['mitocôndria', 'ATP', 'respiração', 'glicólise', 'Krebs'],
    relatedLab: 'celula-animal',
  },
  {
    id: 'cit-04',
    topicId: 'citologia',
    title: 'Ciclo celular, mitose e divisão celular',
    slug: 'ciclo-celular-mitose-e-divisao',
    summary:
      'Como uma célula se prepara para se dividir, o que acontece em cada fase da mitose e por que a meiose produz quatro células geneticamente diferentes.',
    objectives: [
      'Descrever as fases do ciclo celular (G1, S, G2 e M).',
      'Identificar as fases da mitose e o que ocorre em cada uma.',
      'Explicar a duplicação dos cromossomos na fase S.',
      'Diferenciar mitose, meiose I e meiose II quanto ao número de divisões e ao resultado genético.',
    ],
    blocks: [
      {
        id: 'cit-04-b1',
        type: 'texto',
        title: 'O ciclo de vida de uma célula',
        paragraphs: [
          'Uma célula que se divide não é uma célula que "nasce" do nada: ela passa por um ciclo bem programado, chamado ciclo celular. Esse ciclo tem quatro etapas: a fase G1, de crescimento e atividade intensa, com produção de proteínas e organelas; a fase S, em que o DNA é replicado e cada cromossomo ganha uma cópia idêntica; a fase G2, de preparação, com checagem do DNA e produção das proteínas necessárias para a divisão; e a fase M, a mitose, seguida de citocinese.',
          'A fase S é o ponto de commitment mais importante: é quando a duplicação do material genético acontece, de modo que cada célula filha receba um conjunto completo de cromossomos. Se o DNA estiver danificado, a célula pode ser detida no checkpoint G2 para reparo ou, se o dano for irreversível, entrar em apoptose — uma "morte celular programada" que evita a propagação de mutações.',
        ],
      },
      {
        id: 'cit-04-b2',
        type: 'diagrama',
        title: 'As fases da mitose',
        diagram: 'mitose-fases',
        caption:
          'Prófase → Metáfase → Anáfase → Telófase. A interfase ocupa a maior parte do ciclo celular.',
      },
      {
        id: 'cit-04-b3',
        type: 'tabela',
        title: 'O que acontece em cada fase',
        table: {
          headers: ['Fase', 'Nucleo', 'Cromossomos', 'Citoplasma'],
          rows: [
            ['Prófase', 'Envelope nuclear se dissolve', 'Condensam e ficam visíveis', 'Citosqueleto se reorganiza'],
            ['Metáfase', 'Ausente', 'Alinham na placa metafásica', 'Fibras de fusão ligam aos centrômeros'],
            ['Anáfase', 'Ausente', 'Cromátides irmãs se separam', 'Se deslocam para polos opostos'],
            ['Telófase', 'Seis reenvolve', 'Descondensam', 'Citoquinese forma duas células'],
          ],
        },
      },
      {
        id: 'cit-04-b4',
        type: 'texto',
        title: 'Mitose e meiose: números que explicam a diferença',
        paragraphs: [
          'A mitose produz duas células-filhas geneticamente idênticas à célula-mãe, com o mesmo número de cromossomos. É o mecanismo de crescimento, de renovação de tecidos e de reprodução assexuada.',
          'A meiose, que ocorre apenas na formação de gametas, consiste em duas divisões sucessivas (meiose I e meiose II) e produz quatro células haploides, com metade dos cromossomos da célula original. A grande novidade é o crossing-over, que ocorre na prófase I: segmentos de cromátides não-irmãs trocam de lugar, gerando novas combinações de alelos. Na anáfase I, os cromossomos homólogos se separam, de forma independente, o que produz a segunda fonte de variabilidade — a segregação independente dos pares de cromossomos.',
        ],
        callout: 'atencao',
      },
      {
        id: 'cit-04-b5',
        type: 'exemplo',
        title: 'Exemplo prático: por que a tipagem sanguínea exige compatibilidade',
        paragraphs: [
          'O sistema ABO é determinado por um único gene com três alelos: Iᴬ, Iᴮ e i. O fenótipo depende da combinação: IᴬIᴮ é AB, Iᴬi é A, Iᴮi é B e ii é O. Em uma transfusão, o doador de sangue tipo O pode doar para qualquer um, porque suas hemácias não carregam antígenos A nem B. O doador tipo AB só pode receber, pois seu plasma não contém anticorpos anti-A nem anti-B.',
          'Esse exemplo didático mostra dois conceitos da aula em ação: a dominância não completa entre Iᴬ e Iᴮ (codominância) e o papel da mitose na produção de hemácias, que acontece continuamente na medula óssea para compensar a vida útil de cerca de 120 dias de cada glóbulo vermelho.',
        ],
      },
      {
        id: 'cit-04-b6',
        type: 'resumo',
        title: 'Resumo da aula',
        items: [
          'O ciclo celular tem G1, S, G2 e M.',
          'A duplicação do DNA ocorre na fase S.',
          'Mitose: prófase, metáfase, anáfase e telófase.',
          'Meiose: duas divisões, quatro células haploides e recombinação.',
          'Apoptose elimina células com dano irreparável no DNA.',
        ],
      },
    ],
    keyConcepts: [
      'Interfase e fase S',
      'Mitose e citocinese',
      'Meiose e crossing-over',
      'Apoptose',
      'Segregação independente',
    ],
    summaryPoints: [
      'G1 → S → G2 → M.',
      'Mitose gera 2 células idênticas; meiose gera 4 haploides.',
      'Crossing-over aumenta a variabilidade genética.',
    ],
    quizQuestionIds: ['q-cit-16', 'q-cit-17', 'q-cit-18', 'q-cit-19', 'q-cit-20'],
    estimatedMinutes: 14,
    difficulty: 'medio',
    tags: ['ciclo celular', 'mitose', 'meiose', 'cromossomo', 'apoptose'],
    relatedLab: 'celula-animal',
  },
]
