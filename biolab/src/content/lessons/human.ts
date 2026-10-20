import type { Lesson } from '@/types'

/** Trilha de Corpo Humano — quatro aulas completas. */
export const HUMAN_LESSONS: Lesson[] = [
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
