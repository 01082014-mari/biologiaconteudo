
/* ----------------------------------------------------------------
 * Citologia
 * ---------------------------------------------------------------- */

/**
 * Trilha de Citologia — quatro aulas completas.
 *
 * As blocks renderizam o conteúdo didático no leitor de aulas.
 */
export const CITOLOGY_LESSONS = [
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

/* ----------------------------------------------------------------
 * Genética
 * ---------------------------------------------------------------- */

export const GENETICS_LESSONS = [
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

/* ----------------------------------------------------------------
 * Ecologia
 * ---------------------------------------------------------------- */

export const ECOLOGY_LESSONS = [
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

/* ----------------------------------------------------------------
 * Corpo Humano
 * ---------------------------------------------------------------- */

export const HUMAN_LESSONS = [
  {
    id: 'hum-01',
    topicId: 'corpo-humano',
    title: 'Homeostase e sistema circulatório',
    slug: 'homeostase-e-sistema-circulatorio',
    summary:
      'Como o corpo mantém o equilíbrio interno e como o coração e o sangue distribuem oxigênio e nutrientes a cada célula.',
    objectives: [
      'Definir homeostase e identificar seus componentes.',
      'Descrever a anatomia do coração e o ciclo cardíaco.',
      'Diferenciar circulação pulmonar e sistêmica.',
      'Explicar a função dos componentes do sangue.',
    ],
    blocks: [
      {
        id: 'hum-01-b1',
        type: 'texto',
        title: 'O conceito de homeostase',
        paragraphs: [
          'Homeostase é a capacidade de um organismo manter uma variável interna relativamente constante apesar das mudanças do meio externo. O termo vem do grego: homo, igual, e stasis, estabilidade. Claude Bernard propôs o conceito no século XIX, e Walter Cannon o consolidou na década de 1930.',
          'Toda situação de homeostase envolve três elementos: uma variável a ser regulada (a temperatura corporal, o pH, a glicose), sensores que detectam o valor atual e um centro de controle que compara esse valor com um valor de referência, chamado set point. A resposta corretiva é disparada por efetores — glândulas, músculos, órgãos — até que a variável volte à faixa desejada.',
          'A faixa de tolerância não é um ponto fixo: a temperatura corporal varia ao longo do dia, e o valor de referência muda, por exemplo, durante a noite. A precisão do sistema explica por que pequenas variações não significam que o organismo esteja doente.',
        ],
        callout: 'info',
      },
      {
        id: 'hum-01-b2',
        type: 'texto',
        title: 'O coração: uma bomba de duas câmaras',
        paragraphs: [
          'O coração humano é um músculo estriado involuntário dividido em quatro câmaras: dois átrios, que recebem o sangue, e dois ventrículos, que o bombeiam. O lado direito deals com a sangue pobre em oxigênio e o envia aos pulmões; o esquerdo recebe o sangue rico em oxigênio e o distribui ao corpo.',
          'A circulação é dupla: a circulação menor, ou pulmonar, leva o sangue do ventrículo direito aos pulmões e traz de volta ao átrio esquerdo; a circulação maior, ou sistêmica, parte do ventrículo esquerdo, entrega sangue ao corpo e retorna ao átrio direito. Cada ciclo completa uma ida e volta, e o coração bombeia cerca de 5 litros de sangue por minuto em repouso.',
          'As válvulas atrioventriculares (tricúspide e mitral) evitam o refluxo de sangue dos ventrículos para os átrios; as válvulas semilunares (aórtica e pulmonar) impedem o retorno do sangue para o ventrículo. A contração coordenada das câmaras e o fechamento das válvulas produzem os dois ruídos característicos do batimento cardíaco: "toc" e "tá".',
        ],
      },
      {
        id: 'hum-01-b3',
        type: 'diagrama',
        title: 'Circulação pulmonar e sistêmica',
        diagram: 'sistema-circulatorio',
        caption:
          'O coração funciona como duas bombas em paralelo, ligadas em série.',
      },
      {
        id: 'hum-01-b4',
        type: 'tabela',
        title: 'Componentes do sangue',
        table: {
          headers: ['Componente', 'Proporção', 'Função principal'],
          rows: [
            ['Plasma', '55%', 'Transporte de substâncias, hormônios e calor'],
            ['Hematias', '44%', 'Transporte de O₂ e CO₂ pela hemoglobina'],
            ['Leucócitos', '1%', 'Defesa imunológica'],
            ['Plaquetas', '0,5%', 'Coagulação e reparo de vasos'],
          ],
        },
      },
      {
        id: 'hum-01-b5',
        type: 'texto',
        title: 'Artérias, veias e capilares',
        paragraphs: [
          'As artérias levam o sangue do coração para os tecidos; as veias trazem o sangue de volta. A distinção não depende do conteúdo de oxigênio, mas do sentido do fluxo. As artérias têm paredes grossas e elásticas, que suportam a pressão elevada da ejeção ventricular. As veias têm paredes finas e dispõem de válvulas que impedem o refluxo, já que o sangue percorre contra a gravidade.',
          'Os capilares são os vasos de troca: suas paredes são formadas por uma única camada de células endoteliais, o que permite a difusão de oxigênio, nutrientes e resíduos. A troca de gases acontece aqui, e não nos pulmões ou nos tecidos — os pulmões e as células são as extremidades do percurso.',
        ],
      },
      {
        id: 'hum-01-b6',
        type: 'exemplo',
        title: 'Exemplo prático: por que sentir frio aumenta os batimentos',
        paragraphs: [
          'Quando a temperatura da pele cai, os termorreceptores enviam sinais ao hipotálamo, que ativa respostas vasomotoras e metabólicas. Vasos cutâneos se contraem, reduzindo a perda de calor pela pele, e o metabolismo aumenta, produzindo mais calor. Esse ajuste exige mais oxigênio, o que aumenta a frequência cardíaca e a ventilação pulmonar.',
          'É um exemplo didático de homeostase com feedback negativo: a variação da temperatura é detectada, o centro de controle responde, e a resposta é na direção oposta à perturbação original. O/antRogers oposto seria o feedback positivo, que amplifica a variação — como acontece na coagulação.',
        ],
      },
      {
        id: 'hum-01-b7',
        type: 'resumo',
        title: 'Resumo da aula',
        items: [
          'Homeostase: variável, sensor, centro de controle e efetor.',
          'Coração com duas aurículas e dois ventrículos.',
          'Circulação dupla: pulmonar e sistêmica.',
          'Capilares são os locais reais de troca de gases.',
          'Artérias saem do coração; veias voltam ao coração.',
        ],
      },
    ],
    keyConcepts: [
      'Homeostase e feedback negativo',
      'Ciclo cardíaco e válvulas',
      'Circulação pulmonar e sistêmica',
      'Componentes do sangue',
      'Troca de gases em capilares',
    ],
    summaryPoints: [
      'Homeostase mantém variáveis internas constantes.',
      'O coração bombeia cerca de 5 L/min em repouso.',
      'Troca de gases ocorre nos capilares.',
    ],
    quizQuestionIds: ['q-hum-01', 'q-hum-02', 'q-hum-03', 'q-hum-04', 'q-hum-05'],
    estimatedMinutes: 14,
    difficulty: 'medio',
    tags: ['homeostase', 'coração', 'sangue', 'circulação', 'capilares'],
    relatedLab: 'fotossintese',
  },
  {
    id: 'hum-02',
    topicId: 'corpo-humano',
    title: 'Sistema respiratório e trocas gasosas',
    slug: 'sistema-respiratorio-e-trocas-gasosas',
    summary:
      'Da inspiração à difusão alveolar: mecanismos de ventilação, transporte de gases e a_curva de dissociação da hemoglobina.',
    objectives: [
      'Descrever a via aérea e a estrutura do pulmão.',
      'Explicar a mecânica da ventilação pulmonar.',
      'Descrever a difusão alveolar e os fatores que a afetam.',
      'Explicar o papel da hemoglobina e da curva de dissociação.',
    ],
    blocks: [
      {
        id: 'hum-02-b1',
        type: 'texto',
        title: 'A via respiratória',
        paragraphs: [
          'O ar percorre um caminho definido: narinas, cavidade nasal, faringe, laringe, traqueia, brônquios, bronquíolos e, ao final, alvéolos. Cada trecho tem função própria. A cavidade nasal umedece, aquece e filtra o ar; a faringe e a laringe conduzem o ar e protegem a via aérea; a traqueia é sustentada por cartilagens em forma de anel, que impedem seu colapso durante a inspiração; os brônquios ramificam-se até os bronquíolos terminais, que terminam nos alvéolos.',
          'Nos alvéolos, o ar é trazido a uma interface delgada com uma área enorme. Um adulto possui cerca de 300 milhões de alvéolos, cuja superfície somada equivale a cerca de 70 metros quadrados — quase o tamanho de uma quadra de vôlei. Essa área enorme compensa a baixa espessura da barreira alveolocapilar.',
        ],
        callout: 'dica',
      },
      {
        id: 'hum-02-b2',
        type: 'texto',
        title: 'Ventilação: o mecanismo da respiração',
        paragraphs: [
          'A ventilação é um processo ativo, que consome energia. Na inspiração, o diafragma, um músculo em forma de cúpula, contrai e desce, aumentando o volume da cavidade torácica. Pela Lei de Boyle, a redução da volume aumenta a pressão dentro dos pulmões abaixo da atmosférica, e o ar é atraído para dentro. Na expiração, o diafragma relaxa e sobe de forma passiva, e o ar é expulso.',
          'O volume de ar inspirado ou expirado durante uma respiração normal é o volume corrente, cerca de 500 mililitros. No fim de uma expiração normal resta o volume residual. A capacidade vital é a soma do volume corrente com os volumes inspiratório e expiratório de reserva.',
        ],
      },
      {
        id: 'hum-02-b3',
        type: 'texto',
        title: 'Difusão alveolar e transporte de gases',
        paragraphs: [
          'A troca de gases segue o princípio de Dalton: os gases se deslocam do meio com maior pressão parcial para o de menor pressão parcial. No alvéolo, a pressão parcial de oxigênio é alta e a de dióxido de carbono é baixa; no sangue capilar que chega do corpo, ocorre o contrário. Assim, oxigênio entra no sangue e dióxido de carbono sai.',
          'O transporte de oxigênio ocorre quase todo por hemoglobina: cerca de 98% do O₂ é carregado por essa proteína eritrocitária. O CO₂ é transportado de três formas: dissolvido no plasma, ligado à hemoglobina (como carbamino-hemoglobina) e, sobretudo, na forma de bicarbonato, que corresponde a cerca de 70% do total.',
        ],
      },
      {
        id: 'hum-02-b4',
        type: 'diagrama',
        title: 'Troca de gases nos alvéolos',
        diagram: 'sistema-circulatorio',
        caption:
          'Barreira alveolocapilar: ar, membrana alveolar, membrana capilar e sangue.',
      },
      {
        id: 'hum-02-b5',
        type: 'tabela',
        title: 'Fatores que afetam a difusão alveolar',
        table: {
          headers: ['Fator', 'Efeito', 'Exemplo clínico'],
          rows: [
            ['Espessura da barreira', 'Aumentar reduz a difusão', 'Fibrose pulmonar'],
            ['Área de superfície', 'Aumentar favorece a difusão', 'Emfisema reduz a área'],
            ['Gradiente de pressão', 'Maior gradiente aumenta a difusão', 'Exercício em altitude'],
            ['Ventilação', 'Aumentar eleva o O₂ alveolar', 'Hiperventilação'],
            ['Perfusão', 'Ajusta o sangue que chega', 'Embolia pulmonar reduz a perfusão'],
          ],
        },
      },
      {
        id: 'hum-02-b6',
        type: 'exemplo',
        title: 'Exemplo prático: a curva de dissociação da hemoglobina',
        paragraphs: [
          'A hemoglobina tem afinidade pelo oxigênio que aumenta com a concentração de O₂ e diminui com a presença de CO₂ e de ácido — os dois últimos fatores aumentam em tecidos metabolicamente ativos. O resultado é uma curva em forma de "S".',
          'No alvéolo, com muito oxigênio e pouco CO₂, a hemoglobina fica saturada. Nos tecidos, onde o O₂ é consumido e o CO₂ se acumula, a afinidade cai e o oxigênio é liberado. Essa resposta garante a liberação de oxigênio justamente onde ele é necessário, e é um dos exemplos mais elegantes de homeostase no corpo.',
        ],
      },
      {
        id: 'hum-02-b7',
        type: 'resumo',
        title: 'Resumo da aula',
        items: [
          'Alvéolos: ~300 milhões, ~70 m² de área.',
          'Inspiração: o diafragma contrai e desce.',
          'Oxigênio trafegado 98% pela hemoglobina.',
          'Troca por difusão segundo o princípio de Dalton.',
          'Curva em S da hemoglobina favorece a liberação de O₂ nos tecidos.',
        ],
      },
    ],
    keyConcepts: [
      'Ventilação pulmonar e diafragma',
      'Alvéolos e barreira alveolocapilar',
      'Princípio de Dalton',
      'Hemoglobina e curva de dissociação',
      'Transporte de CO₂',
    ],
    summaryPoints: [
      'Superfície alveolar total ≈ 70 m².',
      'Inspiração é ativa; expiração em repouso é passiva.',
      'CO₂ viaja sobretudo como bicarbonato.',
    ],
    quizQuestionIds: ['q-hum-06', 'q-hum-07', 'q-hum-08', 'q-hum-09', 'q-hum-10'],
    estimatedMinutes: 14,
    difficulty: 'medio',
    tags: ['pulmão', 'alvéolo', 'hemoglobina', 'ventilação', 'gases'],
    relatedLab: 'fotossintese',
  },
  {
    id: 'hum-03',
    topicId: 'corpo-humano',
    title: 'Sistema excretor e osmorregulação',
    slug: 'sistema-excretor-e-osmorregulacao',
    summary:
      'Como os rins filtram o sangue, formam a urina e regulam o equilíbrio de água, sais e pH do organismo.',
    objectives: [
      'Identificar os órgãos do sistema excretor.',
      'Descrever as etapas da formação da urina.',
      'Explicar o papel do néfron e da alça de Henle.',
      'Relacionar o hormônio antidiurético à osmorregulação.',
    ],
    blocks: [
      {
        id: 'hum-03-b1',
        type: 'texto',
        title: 'As vias de excreção',
        paragraphs: [
          'O sistema excretor humano é formado principalmente pelos dois rins, que filtram o sangue e produzem a urina. A urina é eliminada por ureteres, bexiga e uretra. Além dos rins, há outras vias de excreção: os pulmões eliminam CO₂ e vapor d’água, a pele elimina suor, o fígado elimina bilirrubina e o intestino elimina resíduos da digestão.',
          'Excretar não é a mesma coisa que eliminar restos da digestão. A principal função do sistema excretor é regular a composição do meio interno, removendo excesso de água, sais e resíduos metabólicos, e retendo o que é necessário.',
        ],
      },
      {
        id: 'hum-03-b2',
        type: 'diagrama',
        title: 'Estrutura do néfron',
        diagram: 'nefron',
        caption:
          'Glomerulo, Bowmann, túbulo contornado proximal, alça de Henle e túbulo contornado distal.',
      },
      {
        id: 'hum-03-b3',
        type: 'texto',
        title: 'As três etapas da formação da urina',
        paragraphs: [
          'A filtração glomerular acontece no glomérulo de Malpighi, onde a pressão do sangue força a filtração do plasma para a cápsula de Bowman. O filtrado é similar ao plasma, mas sem proteínas e hemácias, que ficam retidas no sangue. Um Filters passes cerca de 180 litros por dia para os túbulos.',
          'A reabsorção tubular recupera do filtrado a maior parte do que é útil: cerca de 99% da água e do sódio, além de glicose, aminoácidos e íons. Essa recuperação é ativa e consome ATP. O que sobra é ajustado pela secreção tubular, que adiciona ao filtrado substâncias como íons hidrogênio, potássio e amônia, e pela excreção de resíduos.',
          'Na alça de Henle, um mecanismo de contracorrente establece um gradiente osmótico na medula renal, que permite concentrar a urina. Quanto maior a concentração de solutos na medula, maior a água que pode ser reabsorvida do filtrado.',
        ],
        callout: 'info',
      },
      {
        id: 'hum-03-b4',
        type: 'tabela',
        title: 'Mecanismos de regulação renal',
        table: {
          headers: ['Mecanismo', 'Agente', 'Efeito na urina'],
          rows: [
            ['Osmorregulação', 'ADH (vasopressina)', 'Aumenta a reabsorção de água; urina concentrada'],
            ['Regulação de Na⁺', 'Aldosterona', 'Aumenta a reabsorção de sódio; volume de sangue sobe'],
            ['Regulação de K⁺', 'Aldosterona', 'Aumenta a excreção de potássio'],
            ['Regulação do pH', 'Renina e hormônios', 'Excreção de H⁺ e retenção de bicarbonato'],
          ],
        },
      },
      {
        id: 'hum-03-b5',
        type: 'exemplo',
        title: 'Exemplo prático: por que a urina fica escura na desidratação',
        paragraphs: [
          'Em um dia de calor intenso, o corpo perde muita água pelo suor. A pressão osmótica do plasma aumenta, o hipotálamo detecta o aumento e libera ADH da neuro-hipófise. O ADH faz com que os túbulos coletores absorvam mais água, e a alça de Henle opera em seu máximo, concentrando a urina. O resultado é uma urina mais escura, em menor volume.',
          'Se o déficit de água persistir, a pressão arterial cai e o rim libera renina, iniciando o sistema renina-angiotensina-aldosterona, que aumenta a retenção de sódio e, com ele, de água. É um exemplo completo de homeostase com múltiplos níveis de resposta.',
        ],
      },
      {
        id: 'hum-03-b6',
        type: 'resumo',
        title: 'Resumo da aula',
        items: [
          'Rins, ureteres, bexiga e uretra formam o sistema excretor.',
          'Filtração glomerular, reabsorção e secreção tubular.',
          'Cerca de 180 L de filtrado por dia; 99% da água é reabsorvida.',
          'ADH concentra a urina; aldosterona retém sódio.',
          'Excreção regula o meio interno, não apenas remove restos.',
        ],
      },
    ],
    keyConcepts: [
      'Nefron e glomerulo de Malpighi',
      'Filtração, reabsorção e secreção tubular',
      'Alça de Henle e gradiente osmótico',
      'ADH e aldosterona',
      'Sistema renina-angiotensina',
    ],
    summaryPoints: [
      '180 L de filtrado por dia; ~1,5 L de urina.',
      'ADH aumenta a reabsorção de água.',
      'Reabsorção tubular consome ATP.',
    ],
    quizQuestionIds: ['q-hum-11', 'q-hum-12', 'q-hum-13', 'q-hum-14', 'q-hum-15'],
    estimatedMinutes: 13,
    difficulty: 'medio',
    tags: ['rim', 'néfron', 'urina', 'ADH', 'osmorregulação'],
    relatedLab: 'fotossintese',
  },
  {
    id: 'hum-04',
    topicId: 'corpo-humano',
    title: 'Sistema nervoso e sistema endócrino',
    slug: 'sistema-nervoso-e-endocrino',
    summary:
      'Como o corpo coordena respostas rápidas e lentas: neurônios, sinapses, hormônios e o papel do hipotálamo.',
    objectives: [
      'Descrever a estrutura básica de um neurônio.',
      'Explicar a transmissão sináptica e o papel dos neurotransmissores.',
      'Diferenciar sistema nervoso e sistema endócrino.',
      'Descrever o papel do hipotálamo e da hipófise.',
    ],
    blocks: [
      {
        id: 'hum-04-b1',
        type: 'texto',
        title: 'O neurônio',
        paragraphs: [
          'O neurônio é a unidade funcional do sistema nervoso. Ele é formado por um corpo celular, que contém o núcleo e o complexo de Golgi; dendritos, que recebem sinais; e um axônio, que conduz o impulso nervoso. Alguns neurônios, como os da substância branca, têm axônios envoltos por mielina, o que acelera a condução do impulso em saltos, os chamados nodos de Ranvier.',
          'A velocidade de condução depende do diâmetro do axônio e da presença de mielina. Axônios mais calibrosos conduzem impulsos mais rápido, e a mielina pode aumentar a velocidade em mais de dez vezes em comparação com um axônio sem mielina de mesmo diâmetro.',
        ],
      },
      {
        id: 'hum-04-b2',
        type: 'texto',
        title: 'A sinapse',
        paragraphs: [
          'A sinapse é a região de contato entre dois neurônios. Quando o impulso nervoso chega à terminação do axônio, dispara a entrada de íons cálcio, que induzem a liberação de neurotransmissores nas vesículas sinápticas. Esses transmissores se ligam a receptores da membrana do neurônio seguinte.',
          'Um neurotransmissor pode ter efeito estimulante (excitatório) ou inibitório, dependendo do receptor. A acetilcolina, por exemplo, é excitatória nas junções neuromusculares, onde provoca a contração do músculo esquelético, e inibitória no coração, onde desacelera o batimento. Isso mostra que o efeito depende do receptor, e não apenas da molécula.',
        ],
        callout: 'dica',
      },
      {
        id: 'hum-04-b3',
        type: 'tabela',
        title: 'Sistema nervoso e sistema endócrino',
        table: {
          headers: ['Aspecto', 'Sistema nervoso', 'Sistema endócrino'],
          rows: [
            ['Via de comunicação', 'Nervos e sinapses', 'Hormônios pelo sangue'],
            ['Velocidade', 'Muito rápida (ms)', 'Lenta (segundos a dias)'],
            ['Duração do efeito', 'Curta', 'Prolongada'],
            ['Alvo', 'Músculos e glândulas específicas', 'Glândulas e tecidos difusos'],
            ['Exemplo', 'Reflexo de retirada da mão', 'Crescimento, puberdade, metabolismo'],
          ],
        },
      },
      {
        id: 'hum-04-b4',
        type: 'texto',
        title: 'Hipotálamo e hipófise: o elo entre os dois sistemas',
        paragraphs: [
          'O hipotálamo é uma pequena região do cérebro que funciona como um centro de integração. Ele recebe informações do sistema nervoso e do meio interno, e produz hormônios releases que regulam a hipófise, a glândula mais importante do sistema endócrino.',
          'A hipófise tem duas porções: a adeno-hipófise, que produz hormistemas como o hormônio do crescimento (GH), a tireotrofina (TSH), a adrenocorticotrófico (ACTH) e as gonadotrofinas; e a neuro-hipófise, que armazena e libera ADH e oxitocina, sintetizados no hipotálamo. Por essa ligação, o hipotálamo integra o controle nervoso e o hormonal.',
        ],
      },
      {
        id: 'hum-04-b5',
        type: 'exemplo',
        title: 'Exemplo prático: o reflexo e a resposta hormonal diante do medo',
        paragraphs: [
          'Ao ver um animal atravessando a rua, uma pessoa se afasta em frações de segundo: o cérebro envia o sinal aos músculos antes mesmo de a pessoa ter consciência do que aconteceu. Esse arco reflexo é do sistema nervoso somático.',
          'Ao mesmo tempo, a amígdala ativa a medula adrenal, que libera adrenalina. O coração acelera, as vias aéreas se dilatam e o fígado libera glicose. Essa resposta, mais lenta e duradoura, é do sistema endócrino. As duas atuações juntas preparam o organismo para uma situação de emergência.',
        ],
      },
      {
        id: 'hum-04-b6',
        type: 'resumo',
        title: 'Resumo da aula',
        items: [
          'Neurônio: dendritos, corpo celular e axônio.',
          'Mielina acelera a condução do impulso.',
          'Sinapses usam neurotransmissores; efeito depende do receptor.',
          'Nervoso: rápido e curto. Endócrino: lento e prolongado.',
          'Hipotálamo integra os dois sistemas e regula a hipófise.',
        ],
      },
    ],
    keyConcepts: [
      'Neurônio e mielina',
      'Sinapse e neurotransmissores',
      'Hipotálamo e hipófise',
      'Sistema nervoso e endócrino',
      'Arco reflexo',
    ],
    summaryPoints: [
      'Mielina acelera a condução em até 10x.',
      'Hipotálamo é o elo entre nervoso e endócrino.',
      'Resposta nervosa é rápida e curta; hormonal é lenta e longa.',
    ],
    quizQuestionIds: ['q-hum-16', 'q-hum-17', 'q-hum-18', 'q-hum-19', 'q-hum-20'],
    estimatedMinutes: 14,
    difficulty: 'medio',
    tags: ['neurônio', 'sinapse', 'hormônio', 'hipotálamo', 'hipófise'],
    relatedLab: 'mendel',
  },
]

/** Todas as aulas disponíveis na plataforma, indexadas por id. */
export const ALL_LESSONS = [
  ...CITOLOGY_LESSONS,
  ...GENETICS_LESSONS,
  ...ECOLOGY_LESSONS,
  ...HUMAN_LESSONS,
]

export const LESSON_BY_ID = ALL_LESSONS.reduce((acc, lesson) => {
  acc[lesson.id] = lesson
  return acc
}, {})

/** Todas as aulas de uma trilha, na ordem em que devem ser estudadas. */
export function getLessonsByTopic(topicId) {
  return ALL_LESSONS.filter((lesson) => lesson.topicId === topicId)
}

/** Aulas relacionadas (mesma trilha, excluindo a atual). */
export function getRelatedLessons(lessonId, limit = 3) {
  const lesson = LESSON_BY_ID[lessonId]
  if (!lesson) return []
  return getLessonsByTopic(lesson.topicId)
    .filter((item) => item.id !== lessonId)
    .slice(0, limit)
}

/** Próxima aula não concluída — usada pelo botão "Continuar estudando". */
export function getNextLesson(completedIds = []) {
  const completed = new Set(completedIds)
  return ALL_LESSONS.find((lesson) => !completed.has(lesson.id)) ?? ALL_LESSONS[0] ?? null
}
