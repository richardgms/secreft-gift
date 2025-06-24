import { Photo, Track, GallerySection, Playlist, Letter, TimelineEvent } from '@/types';

// Dados das fotos da galeria
export const galleryPhotos: Photo[] = [
  {
    id: '1',
    src: '/images/galeria/1.jpg',
    alt: 'Primeiro momento especial',
    caption: 'Um dos nossos momentos mais especiais juntos 💕',
    date: '2025-05-24',
    location: 'Nosso cantinho especial',
    tags: ['amor', 'momentos-especiais'],
  },
  {
    id: '2',
    src: '/images/galeria/2.jpg',
    alt: 'Segundo momento inesquecível',
    caption: 'Quando o tempo para e só existimos nós dois ✨',
    date: '2025-03-05',
    location: 'Lugar do coração',
    tags: ['romântico', 'amor'],
  },
  {
    id: '3',
    src: '/images/galeria/3.jpg',
    alt: 'Terceiro momento mágico',
    caption: 'Cada sorriso seu ilumina meu mundo 🌟',
    date: '2024-12-23',
    location: 'Nossos momentos',
    tags: ['felicidade', 'sorriso'],
  },
  {
    id: '4',
    src: '/images/galeria/4.png',
    alt: 'Quarto momento de pura felicidade',
    caption: 'Quando descobri que você é minha pessoa 💖',
    date: '2024-12-25',
    location: 'Descobrindo o amor',
    tags: ['descoberta', 'amor-verdadeiro'],
  },
  {
    id: '5',
    src: '/images/galeria/5.jpg',
    alt: 'Quinto momento de cumplicidade',
    caption: 'O melhor presente da vida foi ter você comigo 🎁❤️',
    date: '2025-04-19',
    location: 'Nosso lar',
    tags: ['cumplicidade', 'família', 'presente'],
  },
  {
    id: '6',
    src: '/images/galeria/6.jpg',
    alt: 'Sexto momento de amor eterno',
    caption: 'Cada foto nossa conta uma história de amor infinito 📸💕',
    date: '2025-05-03',
    location: 'Nossos registros',
    tags: ['memórias', 'história-de-amor', 'infinito'],
  },
];

// Seção da galeria
export const gallerySections: GallerySection[] = [
  {
    id: 'momentos-especiais',
    title: 'Nossos Momentos Especiais',
    photos: galleryPhotos,
  },
];

// Dados para o carousel da galeria
export const carouselSlides = galleryPhotos.map((photo, index) => {
  const titles = [
    'Você me faz o homem mais feliz do mundo',
    'Nós no seu lugar preferido', 
    'O primeiro natal',
    'Pôr do sol no Cruzeiro',
    'Nós dois combinandinhos',
    'Nós dois combinandinhos de branco'
  ];

  const descriptions = [
    'Obrigado por cada sorriso roubado',
    'Se você pudesse morava lá',
    'As duas coisas que amo, você e o Natal 🌟',
    'Só não tão bonito quanto seus olhos',
    'Eu amo você de vestido assim. Sério.',
    'Nós dois e açaí, tem como dar errado?'
  ];
  
  return {
    title: titles[index] || 'Memória Especial',
    button: 'Ver Memória',
    src: photo.src,
    description: descriptions[index] || photo.caption,
  };
});

// Playlist de músicas (baseado nos arquivos disponíveis)
export const musicTracks: Track[] = [
  {
    id: '1',
    title: 'Aliança',
    artist: 'Tribalistas',
    album: 'Tribalistas',
    src: '/music/playlist/[SPOTDOWNLOADER.COM] Aliança.mp3',
    cover: '/images/music-covers/default.jpg',
    duration: 280,
    description: 'Nossa aliança de amor eterno 💍',
  },
  {
    id: '2',
    title: 'Quando Bate Aquela Saudade',
    artist: 'Rubel',
    album: 'Saudade',
    src: '/music/playlist/[SPOTDOWNLOADER.COM] Quando Bate Aquela Saudade.mp3',
    cover: '/images/music-covers/default.jpg',
    duration: 300,
    description: 'Para quando você não está aqui 💔',
  },
  {
    id: '3',
    title: 'A Cera',
    artist: 'Artista',
    album: 'Álbum',
    src: '/music/playlist/[SPOTDOWNLOADER.COM] A Cera.mp3',
    cover: '/images/music-covers/default.jpg',
    duration: 280,
    description: 'Uma melodia que derrete o coração 🕯️',
  },
  {
    id: '4',
    title: 'A Droga do Amor',
    artist: 'Lulu Santos',
    album: 'Clássicos',
    src: '/music/playlist/[SPOTDOWNLOADER.COM] A Droga do Amor.mp3',
    cover: '/images/music-covers/default.jpg',
    duration: 270,
    description: 'Viciado no seu amor 💊❤️',
  },
  {
    id: '5',
    title: 'Ai Calica',
    artist: 'Artista',
    album: 'Álbum',
    src: '/music/playlist/[SPOTDOWNLOADER.COM] Ai Calica.mp3',
    cover: '/images/music-covers/default.jpg',
    duration: 200,
    description: 'Uma música que sempre traz sorrisos 😊',
  },
  {
    id: '6',
    title: 'Ai, Amor',
    artist: 'Artista',
    album: 'Romântico',
    src: '/music/playlist/[SPOTDOWNLOADER.COM] Ai, Amor.mp3',
    cover: '/images/music-covers/default.jpg',
    duration: 250,
    description: 'Ai, amor... que saudade 💕',
  },
  {
    id: '7',
    title: 'Ainda Bem',
    artist: 'Marisa Monte',
    album: 'Infinito Particular',
    src: '/music/playlist/[SPOTDOWNLOADER.COM] Ainda Bem.mp3',
    cover: '/images/music-covers/default.jpg',
    duration: 260,
    description: 'Ainda bem que você existe 🌟',
  },
  {
    id: '8',
    title: 'Amado',
    artist: 'Artista',
    album: 'Álbum do Amor',
    src: '/music/playlist/[SPOTDOWNLOADER.COM] Amado.mp3',
    cover: '/images/music-covers/default.jpg',
    duration: 270,
    description: 'Meu amado, minha vida 💖',
  },
  {
    id: '9',
    title: 'Amanhecer',
    artist: 'Artista',
    album: 'Novo Dia',
    src: '/music/playlist/[SPOTDOWNLOADER.COM] Amanhecer.mp3',
    cover: '/images/music-covers/default.jpg',
    duration: 240,
    description: 'Cada amanhecer é mais bonito com você 🌅',
  },
  {
    id: '10',
    title: 'Aqueles Olhos',
    artist: 'Artista',
    album: 'Olhares',
    src: '/music/playlist/[SPOTDOWNLOADER.COM] Aqueles Olhos.mp3',
    cover: '/images/music-covers/default.jpg',
    duration: 260,
    description: 'Seus olhos que me hipnotizam 👁️✨',
  },
  {
    id: '11',
    title: 'Can\'t Help Falling in Love',
    artist: 'Elvis Presley',
    album: 'Clássicos',
    src: '/music/playlist/[SPOTDOWNLOADER.COM] Can\'t Help Falling in Love.mp3',
    cover: '/images/music-covers/default.jpg',
    duration: 180,
    description: 'Não consigo evitar me apaixonar por você 💘',
  },
  {
    id: '12',
    title: 'Cataflor',
    artist: 'Artista',
    album: 'Ao Vivo',
    src: '/music/playlist/[SPOTDOWNLOADER.COM] Cataflor - Ao Vivo.mp3',
    cover: '/images/music-covers/default.jpg',
    duration: 220,
    description: 'Cataflor ao vivo, só para você 🎤',
  },
  {
    id: '13',
    title: 'Céu Azul',
    artist: 'Charlie Brown Jr.',
    album: 'Clássicos',
    src: '/music/playlist/[SPOTDOWNLOADER.COM] Céu Azul.mp3',
    cover: '/images/music-covers/default.jpg',
    duration: 230,
    description: 'Você é meu céu azul ☁️💙',
  },
  {
    id: '14',
    title: 'Cheiro De Amor',
    artist: 'Artista',
    album: 'Romântico',
    src: '/music/playlist/[SPOTDOWNLOADER.COM] Cheiro De Amor.mp3',
    cover: '/images/music-covers/default.jpg',
    duration: 200,
    description: 'O cheiro do nosso amor 🌹',
  },
  {
    id: '15',
    title: 'Cor De Marte',
    artist: 'Artista',
    album: 'Espacial',
    src: '/music/playlist/[SPOTDOWNLOADER.COM] Cor De Marte.mp3',
    cover: '/images/music-covers/default.jpg',
    duration: 220,
    description: 'Nossa cor especial 🔴',
  },
  {
    id: '16',
    title: 'Delírios',
    artist: 'Artista',
    album: 'Sonhos',
    src: '/music/playlist/[SPOTDOWNLOADER.COM] Delírios.mp3',
    cover: '/images/music-covers/default.jpg',
    duration: 190,
    description: 'Delírios de amor 💭💕',
  },
  {
    id: '17',
    title: 'Dona do Meu Pensamento',
    artist: 'Artista',
    album: 'Pensamentos',
    src: '/music/playlist/[SPOTDOWNLOADER.COM] Dona do Meu Pensamento.mp3',
    cover: '/images/music-covers/default.jpg',
    duration: 270,
    description: 'Você é dona dos meus pensamentos 💭👑',
  },
  {
    id: '18',
    title: 'É Você',
    artist: 'Artista',
    album: 'Remaster 2004',
    src: '/music/playlist/[SPOTDOWNLOADER.COM] É Você - 2004 Digital Remaster.mp3',
    cover: '/images/music-covers/default.jpg',
    duration: 200,
    description: 'É você, sempre foi você 💖',
  },
  {
    id: '19',
    title: 'Essa Eu Fiz Pro Nosso Amor',
    artist: 'Artista',
    album: 'Nosso Amor',
    src: '/music/playlist/[SPOTDOWNLOADER.COM] Essa Eu Fiz Pro Nosso Amor.mp3',
    cover: '/images/music-covers/default.jpg',
    duration: 220,
    description: 'Feita especialmente para nós dois 🎵❤️',
  },
  {
    id: '20',
    title: 'Eternamente',
    artist: 'Artista',
    album: 'Eterno',
    src: '/music/playlist/[SPOTDOWNLOADER.COM] Eternamente.mp3',
    cover: '/images/music-covers/default.jpg',
    duration: 280,
    description: 'Eternamente seus, eternamente meus ♾️',
  },
  {
    id: '21',
    title: 'Eu Amo Você',
    artist: 'Artista',
    album: 'Declaração',
    src: '/music/playlist/[SPOTDOWNLOADER.COM] Eu Amo Você.mp3',
    cover: '/images/music-covers/default.jpg',
    duration: 185,
    description: 'As três palavras mais importantes 💖',
  },
  {
    id: '22',
    title: 'Gostar Só Dela',
    artist: 'Artista',
    album: 'Exclusivo',
    src: '/music/playlist/[SPOTDOWNLOADER.COM] Gostar Só Dela.mp3',
    cover: '/images/music-covers/default.jpg',
    duration: 240,
    description: 'Só gosto de você, mais ninguém 👑',
  },
  {
    id: '23',
    title: 'Grão de Areia',
    artist: 'Artista',
    album: 'Pequenas Coisas',
    src: '/music/playlist/[SPOTDOWNLOADER.COM] Grão de Areia.mp3',
    cover: '/images/music-covers/default.jpg',
    duration: 250,
    description: 'Cada grão de areia conta nossa história 🏖️',
  },
  {
    id: '24',
    title: 'Lisboa',
    artist: 'Artista',
    album: 'Viagens',
    src: '/music/playlist/[SPOTDOWNLOADER.COM] Lisboa.mp3',
    cover: '/images/music-covers/default.jpg',
    duration: 245,
    description: 'Lisboa, cidade do nosso coração 🇵🇹',
  },
  {
    id: '25',
    title: 'Mania De Você',
    artist: 'Rita Lee',
    album: 'Clássicos',
    src: '/music/playlist/[SPOTDOWNLOADER.COM] Mania De Você.mp3',
    cover: '/images/music-covers/default.jpg',
    duration: 320,
    description: 'Tenho mania de você 😍',
  },
  {
    id: '26',
    title: 'Me Encontra',
    artist: 'Artista',
    album: 'Encontros',
    src: '/music/playlist/[SPOTDOWNLOADER.COM] Me Encontra.mp3',
    cover: '/images/music-covers/default.jpg',
    duration: 240,
    description: 'Você sempre me encontra 🔍💕',
  },
  {
    id: '27',
    title: 'Me Namora',
    artist: 'Artista',
    album: 'Namoro',
    src: '/music/playlist/[SPOTDOWNLOADER.COM] Me Namora.mp3',
    cover: '/images/music-covers/default.jpg',
    duration: 310,
    description: 'O pedido mais doce que já fiz 💑',
  },
  {
    id: '28',
    title: 'My Kind of Woman',
    artist: 'Mac DeMarco',
    album: '2',
    src: '/music/playlist/[SPOTDOWNLOADER.COM] My Kind of Woman.mp3',
    cover: '/images/music-covers/default.jpg',
    duration: 230,
    description: 'You are definitely my kind of woman 💕',
  },
  {
    id: '29',
    title: 'Não Quero Dinheiro',
    artist: 'Tim Maia',
    album: 'Só Quero Amar',
    src: '/music/playlist/[SPOTDOWNLOADER.COM] Não Quero Dinheiro (Só Quero Amar).mp3',
    cover: '/images/music-covers/default.jpg',
    duration: 180,
    description: 'Só quero amar você 💰❌❤️✅',
  },
  {
    id: '30',
    title: 'O Vagabundo e a Dama',
    artist: 'Artista',
    album: 'Histórias',
    src: '/music/playlist/[SPOTDOWNLOADER.COM] O Vagabundo e a Dama.mp3',
    cover: '/images/music-covers/default.jpg',
    duration: 350,
    description: 'Nossa história de amor 👑🌹',
  },
  {
    id: '31',
    title: 'Oceano',
    artist: 'Djavan',
    album: 'Profundo',
    src: '/music/playlist/[SPOTDOWNLOADER.COM] Oceano.mp3',
    cover: '/images/music-covers/default.jpg',
    duration: 270,
    description: 'Meu amor por você é profundo como o oceano 🌊',
  },
  {
    id: '32',
    title: 'Os Anjos Cantam',
    artist: 'Artista',
    album: 'Celestial',
    src: '/music/playlist/[SPOTDOWNLOADER.COM] Os Anjos Cantam.mp3',
    cover: '/images/music-covers/default.jpg',
    duration: 230,
    description: 'Os anjos cantam quando você sorri 😇🎵',
  },
  {
    id: '33',
    title: 'Palavras No Corpo',
    artist: 'Artista',
    album: 'Íntimo',
    src: '/music/playlist/[SPOTDOWNLOADER.COM] Palavras No Corpo.mp3',
    cover: '/images/music-covers/default.jpg',
    duration: 275,
    description: 'Palavras escritas no coração 💌',
  },
  {
    id: '34',
    title: 'Partilhar',
    artist: 'Artista',
    album: 'Compartilhar',
    src: '/music/playlist/[SPOTDOWNLOADER.COM] Partilhar.mp3',
    cover: '/images/music-covers/default.jpg',
    duration: 470,
    description: 'Partilhar a vida com você 🤝💕',
  },
  {
    id: '35',
    title: 'Planos',
    artist: 'Artista',
    album: 'Futuro',
    src: '/music/playlist/[SPOTDOWNLOADER.COM] Planos.mp3',
    cover: '/images/music-covers/default.jpg',
    duration: 250,
    description: 'Todos os meus planos incluem você 📋❤️',
  },
  {
    id: '36',
    title: 'Pra Você',
    artist: 'Artista',
    album: 'Especial',
    src: '/music/playlist/[SPOTDOWNLOADER.COM] Pra Você.mp3',
    cover: '/images/music-covers/default.jpg',
    duration: 195,
    description: 'Tudo que faço é pra você ❤️',
  },
  {
    id: '37',
    title: 'Pra Você Guardei O Amor',
    artist: 'Artista',
    album: 'Guardado',
    src: '/music/playlist/[SPOTDOWNLOADER.COM] Pra Você Guardei O Amor.mp3',
    cover: '/images/music-covers/default.jpg',
    duration: 380,
    description: 'Guardei todo meu amor para você 💖🔒',
  },
  {
    id: '38',
    title: 'Rosas e Rimas',
    artist: 'Artista',
    album: 'Poético',
    src: '/music/playlist/[SPOTDOWNLOADER.COM] Rosas e Rimas.mp3',
    cover: '/images/music-covers/default.jpg',
    duration: 185,
    description: 'Rosas e rimas para você 🌹📝',
  },
  {
    id: '39',
    title: 'Sunshine',
    artist: 'Artista',
    album: 'Internacional',
    src: '/music/playlist/[SPOTDOWNLOADER.COM] Sunshine.mp3',
    cover: '/images/music-covers/default.jpg',
    duration: 210,
    description: 'You are my sunshine ☀️',
  },
  {
    id: '40',
    title: 'Tangerina',
    artist: 'Artista',
    album: 'Ao Vivo',
    src: '/music/playlist/[SPOTDOWNLOADER.COM] Tangerina - Ao Vivo.mp3',
    cover: '/images/music-covers/default.jpg',
    duration: 260,
    description: 'Doce como você, minha tangerina 🍊',
  },
  {
    id: '41',
    title: 'Te Amar Demais',
    artist: 'Artista',
    album: 'Coração',
    src: '/music/playlist/[SPOTDOWNLOADER.COM] Te Amar Demais.mp3',
    cover: '/images/music-covers/default.jpg',
    duration: 200,
    description: 'Impossível não te amar demais 💖',
  },
  {
    id: '42',
    title: 'Última Noite',
    artist: 'Artista',
    album: 'Noturno',
    src: '/music/playlist/[SPOTDOWNLOADER.COM] Última Noite.mp3',
    cover: '/images/music-covers/default.jpg',
    duration: 130,
    description: 'Como se fosse nossa última noite 🌙',
  },
  {
    id: '43',
    title: 'Um Amor Puro',
    artist: 'Djavan',
    album: 'Clássicos',
    src: '/music/playlist/[SPOTDOWNLOADER.COM] Um Amor Puro.mp3',
    cover: '/images/music-covers/default.jpg',
    duration: 280,
    description: 'Define exatamente o que sinto por você',
  },
  {
    id: '44',
    title: 'Vem Ser Minha',
    artist: 'Artista',
    album: 'Álbum do Amor',
    src: '/music/playlist/[SPOTDOWNLOADER.COM] Vem Ser Minha.mp3',
    cover: '/images/music-covers/default.jpg',
    duration: 220,
    description: 'O convite mais especial que já fiz ❤️',
  },
  {
    id: '45',
    title: 'Vilarejo',
    artist: 'Marisa Monte',
    album: 'Universo ao Meu Redor',
    src: '/music/playlist/[SPOTDOWNLOADER.COM] Vilarejo.mp3',
    cover: '/images/music-covers/default.jpg',
    duration: 240,
    description: 'Nossa canção de amor e simplicidade',
  },
  {
    id: '46',
    title: 'Xuxuzinho',
    artist: 'Artista',
    album: 'Álbum do Amor',
    src: '/music/playlist/[SPOTDOWNLOADER.COM] Xuxuzinho.mp3',
    cover: '/images/music-covers/default.jpg',
    duration: 180,
    description: 'Uma música que sempre me lembra de você 💕',
  },
];

// Playlist principal
export const mainPlaylist: Playlist = {
  id: 'nossa-playlist',
  name: 'Nossa Playlist do Coração 💕',
  tracks: musicTracks,
  isActive: true,
};

// Data de início do relacionamento
export const relationshipStartDate = '2024-12-15'; // Você pode ajustar esta data

// Cartinhas de amor
export const loveLetters: Letter[] = [
  {
    id: '1',
    type: 'love',
    title: 'Meu Coração É Seu',
    content: `Ainda existe alguma dúvida?

Meu amor, desde o dia em que eu te conheci, uma coisa posso afirmar sem medo, o meu coração é teu, e apenas teu.

Não há mais ninguém no mundo que tenha feito meu coração sorrir tanto quanto você fez. Tenho tanto orgulho de ser teu namorado, amo ficar ao seu lado, agarradinho, poder te chamar de minha, viver essa vida "sombria" em paz ao seu ladinho.

Obrigado por todas as coisas que já vivemos juntos, é uma honra dividir e compartilhar a vida com você, e mesmo se eu não quisesse, eu não poderia escolher outra coisa, porque meu coração é seu.`,
    date: '2024-12-01',
    envelope: {
      color: '#e94560',
      seal: '💕'
    },
    availableAt: '2025-06-23T21:12:24.000Z'
  },
  {
    id: '2',
    type: 'memory',
    title: 'Você',
    content: `Lembra do nosso primeiro encontro?

Eu estava tão nervoso que quase tropecei na sua frente! Mas quando você sorriu, todas as minhas preocupações desapareceram. Foi naquele momento que soube que havia algo especial acontecendo.

Conversamos por horas como se nos conhecêssemos há anos. Cada palavra sua era uma descoberta, cada gesto um encanto novo. Quando a noite terminou, eu já sabia que queria muitas outras noites assim ao seu lado.

Essa memória é uma das minhas favoritas. O início de tudo. O primeiro capítulo da nossa história de amor.

Obrigado por ter me dado uma chance naquele dia.`,
    date: '2024-10-20',
    envelope: {
      color: '#f5d76e',
      seal: '⭐'
    },
    availableAt: '2025-06-24T21:12:24.000Z'
  },
  {
    id: '3',
    type: 'future',
    title: 'Nossos Sonhos Juntos',
    content: `Quando penso no futuro, você está em cada plano.

Imagino nós dois numa casinha aconchegante, acordando juntos todos os dias. Você mexendo na cozinha enquanto eu tento ajudar (e provavelmente atrapalhando). Nossas manhãs de domingo preguiçosas, assistindo filmes no sofá.

Sonho com nossas viagens pelo mundo, conhecendo lugares novos de mãos dadas. Quero ver seus olhos brilharem com cada pôr do sol que assistirmos juntos.

Vejo um futuro cheio de amor, risadas, algumas brigas bobas (que terminarão em abraços), e muita, muita felicidade.

Obrigado por sonhar comigo.`,
    date: '2024-11-15',
    envelope: {
      color: '#9333ea',
      seal: '✨'
    },
    availableAt: '2025-06-25T21:12:24.000Z'
  },
  {
    id: '4',
    type: 'special',
    title: 'Por Que Te Amo?',
    content: `Te amo porque...

...você me faz rir até quando estou triste
...seus abraços curam qualquer dia ruim
...você é forte quando precisa ser e doce quando escolhe ser
...sua paixão pelas coisas que ama é contagiante
...você me aceita como eu sou, com todos os meus defeitos
...seus sonhos se tornaram meus sonhos também
...você trouxe cores para a minha vida
...cada dia ao seu lado é uma nova aventura

Mas principalmente, te amo simplesmente porque você é você. Autêntica, maravilhosa, única.

Você é minha pessoa.`,
    date: '2024-12-10',
    envelope: {
      color: '#10b981',
      seal: '💚'
    },
    availableAt: '2025-06-26T21:12:24.000Z'
  }
];

// Timeline do relacionamento
export const timelineEvents: TimelineEvent[] = [
  {
    id: '1',
    title: 'Primeiro Encontro',
    description: 'O dia em que nossas vidas se cruzaram e tudo começou ✨',
    date: '2024-10-15',
    type: 'meeting',
    icon: '💕',
    location: 'Café do Centro',
    photos: ['/images/timeline/primeiro-encontro.jpg']
  },
  {
    id: '2',
    title: 'Primeiro Beijo',
    description: 'O momento mágico que selou nosso destino juntos 💋',
    date: '2024-10-22',
    type: 'milestone',
    icon: '💋',
    location: 'Parque da Cidade'
  },
  {
    id: '3',
    title: 'Namoro Oficial',
    description: 'O "sim" mais bonito que já ouvi na vida! Agora somos oficialmente nós dois contra o mundo 👫',
    date: '2024-11-01',
    type: 'milestone',
    icon: '💑',
    location: 'Nossa mesa favorita no restaurante'
  },
  {
    id: '4',
    title: 'Primeira Viagem Juntos',
    description: 'Nossa primeira aventura como casal! Três dias de pura felicidade e descobertas 🏖️',
    date: '2024-11-20',
    type: 'travel',
    icon: '✈️',
    location: 'Praia do Paraíso',
    photos: ['/images/timeline/primeira-viagem.jpg']
  },
  {
    id: '5',
    title: 'Natal Juntos',
    description: 'Nosso primeiro Natal como casal! A magia da época mais especial do ano ficou ainda mais bonita ao seu lado 🎄',
    date: '2024-12-25',
    type: 'special',
    icon: '🎄',
    location: 'Casa da Família'
  },
  {
    id: '6',
    title: 'Museu Flutuante',
    description: 'Criei este museu especial para você, para guardar para sempre todos os nossos momentos mais preciosos 💖',
    date: '2025-01-19',
    type: 'special',
    icon: '🏛️',
    location: 'No meu coração e agora na internet!'
  }
];

// Frases românticas para elementos aleatórios
export const romanticQuotes = [
  "Você é a música mais bonita que meu coração já ouviu 🎵",
  "Em cada foto nossa, vejo nossa história se escrevendo 📸",
  "Cada dia com você é uma nova página no nosso livro de amor 📖",
  "Você transformou minha vida em uma sinfonia de alegria 🎼",
  "Nosso amor é a obra de arte mais linda do mundo 🎨",
  "Com você, cada momento é uma memória preciosa ✨",
]; 