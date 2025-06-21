import { Photo, Track, GallerySection, Playlist, Letter, TimelineEvent } from '@/types';

// Dados das fotos da galeria
export const galleryPhotos: Photo[] = [
  {
    id: '1',
    src: '/images/galeria/1.jpg',
    alt: 'Primeiro momento especial',
    caption: 'Um dos nossos momentos mais especiais juntos 💕',
    date: '2024-01-15',
    location: 'Nosso cantinho especial',
    tags: ['amor', 'momentos-especiais'],
  },
  {
    id: '2',
    src: '/images/galeria/2.jpg',
    alt: 'Segundo momento inesquecível',
    caption: 'Quando o tempo para e só existimos nós dois ✨',
    date: '2024-02-14',
    location: 'Lugar do coração',
    tags: ['romântico', 'amor'],
  },
  {
    id: '3',
    src: '/images/galeria/3.jpg',
    alt: 'Terceiro momento mágico',
    caption: 'Cada sorriso seu ilumina meu mundo 🌟',
    date: '2024-03-10',
    location: 'Nossos momentos',
    tags: ['felicidade', 'sorriso'],
  },
  {
    id: '4',
    src: '/images/galeria/4.png',
    alt: 'Quarto momento de pura felicidade',
    caption: 'Quando descobri que você é minha pessoa 💖',
    date: '2024-04-20',
    location: 'Descobrindo o amor',
    tags: ['descoberta', 'amor-verdadeiro'],
  },
  {
    id: '5',
    src: '/images/galeria/5.jpg',
    alt: 'Quinto momento de cumplicidade',
    caption: 'O melhor presente da vida foi ter você comigo 🎁❤️',
    date: '2024-05-25',
    location: 'Nosso lar',
    tags: ['cumplicidade', 'família', 'presente'],
  },
  {
    id: '6',
    src: '/images/galeria/6.jpg',
    alt: 'Sexto momento de amor eterno',
    caption: 'Cada foto nossa conta uma história de amor infinito 📸💕',
    date: '2024-06-30',
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
    'Primeiro Amor',
    'Momento Eterno', 
    'Sorriso Iluminado',
    'Descoberta',
    'Nosso Lar',
    'Amor Infinito'
  ];
  
  return {
    title: titles[index] || 'Memória Especial',
    button: 'Ver Memória',
    src: photo.src,
    description: photo.caption,
  };
});

// Playlist de músicas (baseado nos arquivos disponíveis)
export const musicTracks: Track[] = [
  {
    id: '1',
    title: 'Quando Bate Aquela Saudade',
    artist: 'Rubel',
    album: 'Saudade',
    src: '/music/playlist/[SPOTDOWNLOADER.COM] Quando Bate Aquela Saudade.mp3',
    cover: '/images/music-covers/default.jpg',
    duration: 300,
    description: 'Para quando você não está aqui 💔',
  },
  {
    id: '2',
    title: 'Xuxuzinho',
    artist: 'Artista',
    album: 'Álbum do Amor',
    src: '/music/playlist/[SPOTDOWNLOADER.COM] Xuxuzinho.mp3',
    cover: '/images/music-covers/default.jpg',
    duration: 180,
    description: 'Uma música que sempre me lembra de você 💕',
  },
  {
    id: '3',
    title: 'Vilarejo',
    artist: 'Marisa Monte',
    album: 'Universo ao Meu Redor',
    src: '/music/playlist/[SPOTDOWNLOADER.COM] Vilarejo.mp3',
    cover: '/images/music-covers/default.jpg',
    duration: 240,
    description: 'Nossa canção de amor e simplicidade',
  },
  {
    id: '4',
    title: 'Vem Ser Minha',
    artist: 'Artista',
    album: 'Álbum do Amor',
    src: '/music/playlist/[SPOTDOWNLOADER.COM] Vem Ser Minha.mp3',
    cover: '/images/music-covers/default.jpg',
    duration: 220,
    description: 'O convite mais especial que já fiz ❤️',
  },
  {
    id: '5',
    title: 'Um Amor Puro',
    artist: 'Djavan',
    album: 'Clássicos',
    src: '/music/playlist/[SPOTDOWNLOADER.COM] Um Amor Puro.mp3',
    cover: '/images/music-covers/default.jpg',
    duration: 280,
    description: 'Define exatamente o que sinto por você',
  },
  {
    id: '6',
    title: 'Te Amar Demais',
    artist: 'Artista',
    album: 'Coração',
    src: '/music/playlist/[SPOTDOWNLOADER.COM] Te Amar Demais.mp3',
    cover: '/images/music-covers/default.jpg',
    duration: 200,
    description: 'Impossível não te amar demais 💖',
  },
  {
    id: '7',
    title: 'Tangerina',
    artist: 'Artista',
    album: 'Ao Vivo',
    src: '/music/playlist/[SPOTDOWNLOADER.COM] Tangerina - Ao Vivo.mp3',
    cover: '/images/music-covers/default.jpg',
    duration: 260,
    description: 'Doce como você, minha tangerina 🍊',
  },
  {
    id: '8',
    title: 'Sunshine',
    artist: 'Artista',
    album: 'Internacional',
    src: '/music/playlist/[SPOTDOWNLOADER.COM] Sunshine.mp3',
    cover: '/images/music-covers/default.jpg',
    duration: 210,
    description: 'You are my sunshine ☀️',
  },
  {
    id: '9',
    title: 'Pra Você',
    artist: 'Artista',
    album: 'Especial',
    src: '/music/playlist/[SPOTDOWNLOADER.COM] Pra Você.mp3',
    cover: '/images/music-covers/default.jpg',
    duration: 195,
    description: 'Tudo que faço é pra você ❤️',
  },
  {
    id: '10',
    title: 'My Kind of Woman',
    artist: 'Mac DeMarco',
    album: '2',
    src: '/music/playlist/[SPOTDOWNLOADER.COM] My Kind of Woman.mp3',
    cover: '/images/music-covers/default.jpg',
    duration: 230,
    description: 'You are definitely my kind of woman 💕',
  },
  {
    id: '11',
    title: 'Oceano',
    artist: 'Artista',
    album: 'Profundo',
    src: '/music/playlist/[SPOTDOWNLOADER.COM] Oceano.mp3',
    cover: '/images/music-covers/default.jpg',
    duration: 270,
    description: 'Meu amor por você é profundo como o oceano 🌊',
  },
  {
    id: '12',
    title: 'Eu Amo Você',
    artist: 'Artista',
    album: 'Declaração',
    src: '/music/playlist/[SPOTDOWNLOADER.COM] Eu Amo Você.mp3',
    cover: '/images/music-covers/default.jpg',
    duration: 185,
    description: 'As três palavras mais importantes 💖',
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
    content: `Minha querida Mayanne,

Quando te vejo, o mundo para. Seus olhos são como estrelas que iluminam minha noite mais escura. Cada sorriso seu é uma melodia que meu coração aprende de cor.

Você chegou na minha vida como um presente inesperado, transformando dias comuns em momentos mágicos. Seu jeito de ser, sua risada, até mesmo o modo como você franze a testa quando está concentrada... tudo em você me faz apaixonar mais e mais a cada dia.

Não sei o que fiz para merecer alguém tão especial quanto você, mas prometo cuidar desse amor com todo carinho que ele merece.

Te amo mais que palavras podem expressar.`,
    date: '2024-12-01',
    envelope: {
      color: '#e94560',
      seal: '💕'
    }
  },
  {
    id: '2',
    type: 'memory',
    title: 'Nosso Primeiro Encontro',
    content: `Lembra do nosso primeiro encontro?

Eu estava tão nervoso que quase tropecei na sua frente! Mas quando você sorriu, todas as minhas preocupações desapareceram. Foi naquele momento que soube que havia algo especial acontecendo.

Conversamos por horas como se nos conhecêssemos há anos. Cada palavra sua era uma descoberta, cada gesto um encanto novo. Quando a noite terminou, eu já sabia que queria muitas outras noites assim ao seu lado.

Essa memória é uma das minhas favoritas. O início de tudo. O primeiro capítulo da nossa história de amor.

Obrigado por ter me dado uma chance naquele dia.`,
    date: '2024-10-20',
    envelope: {
      color: '#f5d76e',
      seal: '⭐'
    }
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
    }
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
    }
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