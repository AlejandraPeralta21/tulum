/**
 * KARAOKE TULUM - Central Storage Management Module
 * Almacenamiento exclusivo LocalStorage (SPA) con catálogo premium ampliado (85+ canciones),
 * 14 categorías visuales, base de datos de artistas destacados y descripciones originales.
 */

const STORAGE_KEYS = {
    SONGS: 'tulum_songs',
    CATEGORIES: 'tulum_categories',
    ARTISTS: 'tulum_artists',
    FAVORITES: 'tulum_favorites',
    RESERVATIONS: 'tulum_reservations',
    LOGS: 'tulum_bitacoras',
    SETTINGS: 'tulum_settings',
    USER: 'tulum_user',
    INITIALIZED: 'tulum_initialized_v3'
};

// 14 Categorías Musicales Oficiales
const SEED_CATEGORIES = [
    {
        id: 'cat-romanticas',
        nombre: 'Románticas',
        descripcion: 'Letras apasionadas y melodías para dedicar al amor de tu vida',
        icono: 'heart',
        color: '#FF4FA3',
        imagen: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&auto=format&fit=crop&q=80',
        subcategorias: ['Amor eterno', 'Declaraciones', 'Íntimas', 'Despecho suave']
    },
    {
        id: 'cat-baladas',
        nombre: 'Baladas',
        descripcion: 'Poesía lírica, potencia vocal y emoción desbordada',
        icono: 'mic',
        color: '#A855F7',
        imagen: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
        subcategorias: ['Baladas en español', 'Crescendo vocal', 'Acústicas', 'Grandes clásicos']
    },
    {
        id: 'cat-pop',
        nombre: 'Pop latino',
        descripcion: 'Coros contagiosos, ritmo bailable y energía festiva',
        icono: 'flame',
        color: '#D8B978',
        imagen: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80',
        subcategorias: ['Latin Pop 2000s', 'Pop bailable', 'Radio Hits', 'Pop en español']
    },
    {
        id: 'cat-rancheras',
        nombre: 'Rancheras',
        descripcion: 'Mariachi tradicional, tequila y orgullo mexicano en vivo',
        icono: 'sombrero',
        color: '#F0D9A0',
        imagen: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=80',
        subcategorias: ['Mariachi de gala', 'Cantina y bohemia', 'Norteño clásico', 'Corridos del alma']
    },
    {
        id: 'cat-cumbia',
        nombre: 'Cumbia',
        descripcion: 'El sabor tropical irresistible para encender la pista',
        icono: 'music',
        color: '#387BFF',
        imagen: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80',
        subcategorias: ['Cumbia sonidera', 'Cumbia texana', 'Cumbia romántica', 'Fiesta tropical']
    },
    {
        id: 'cat-salsa',
        nombre: 'Salsa',
        descripcion: 'Ritmo caribeño, vientos potentes y descarga latina',
        icono: 'congas',
        color: '#FF4FA3',
        imagen: 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=600&auto=format&fit=crop&q=80',
        subcategorias: ['Salsa brava', 'Salsa romántica', 'Fania clásica', 'Salsa de salón']
    },
    {
        id: 'cat-bachata',
        nombre: 'Bachata',
        descripcion: 'Guitarras dominicanas, cadencia íntima y pasión nocturna',
        icono: 'heart',
        color: '#D8B978',
        imagen: 'https://images.unsplash.com/photo-1520523839898-5071282543e2?w=600&auto=format&fit=crop&q=80',
        subcategorias: ['Bachata sensual', 'Tradicional dominicana', 'Urbana', 'Duetos románticos']
    },
    {
        id: 'cat-reggaeton',
        nombre: 'Reguetón',
        descripcion: 'Dembow vibrante, flow urbano y fiesta de Tulum',
        icono: 'crown',
        color: '#A855F7',
        imagen: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80',
        subcategorias: ['Old School Perreo', 'Flow contemporáneo', 'Dembow caribeño', 'Tendencias club']
    },
    {
        id: 'cat-rock',
        nombre: 'Rock',
        descripcion: 'Himnos eternos de guitarras, energía y actitud rebelde',
        icono: 'guitar',
        color: '#387BFF',
        imagen: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=600&auto=format&fit=crop&q=80',
        subcategorias: ['Rock en español', 'Hard Rock', 'Rock acústico', 'Himnos de estadio']
    },
    {
        id: 'cat-clasicos',
        nombre: 'Clásicos',
        descripcion: 'Joyas maestras de la música que nunca pasarán de moda',
        icono: 'notes',
        color: '#D8B978',
        imagen: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600&auto=format&fit=crop&q=80',
        subcategorias: ['Leyendas de oro', 'Grandes voces', 'Inmortales del bolero', 'Clásicos iberoamericanos']
    },
    {
        id: 'cat-80s',
        nombre: 'Música de los 80',
        descripcion: 'Sintetizadores, nostalgia de oro y grandes himnos retro',
        icono: 'cassette',
        color: '#FF4FA3',
        imagen: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
        subcategorias: ['80s Pop latino', 'Synth Pop', 'Rock 80s', 'Baladas ochenteras']
    },
    {
        id: 'cat-90s',
        nombre: 'Música de los 90',
        descripcion: 'La era dorada del pop latino, baladas y ritmos de los 90',
        icono: 'cassette',
        color: '#387BFF',
        imagen: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&auto=format&fit=crop&q=80',
        subcategorias: ['Pop 90s', 'Rock noventero', 'Baladas nostálgicas', 'Dance latino']
    },
    {
        id: 'cat-actuales',
        nombre: 'Éxitos actuales',
        descripcion: 'Los temas más virales, tendencias globales y éxitos de hoy',
        icono: 'flame',
        color: '#F0D9A0',
        imagen: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=600&auto=format&fit=crop&q=80',
        subcategorias: ['Viral Global', 'Top Tulum', 'Tendencias 2024-2026', 'Novedades lounge']
    },
    {
        id: 'cat-duetos',
        nombre: 'Duetos',
        descripcion: 'Composiciones a dos voces perfectas para cantar en pareja o amigos',
        icono: 'users',
        color: '#D8B978',
        imagen: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=80',
        subcategorias: ['Dúos románticos', 'Duelos vocales', 'Colaboraciones históricas', 'Parejas en escenario']
    }
];

// Metadatos y Biografías de Artistas Destacados
const SEED_ARTISTS = {
    "Cristian Castro": {
        nombre: "Cristian Castro",
        genero: "Balada romántica / Pop",
        nacionalidad: "México",
        imagen: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80",
        biografia: "Uno de los intérpretes más virtuosos de la balada hispanoamericana, dotado de un registro agudo brillante y una expresividad dramática que convierte cada tema en un himno de karaoke."
    },
    "Luis Miguel": {
        nombre: "Luis Miguel",
        genero: "Balada / Pop / Bolero / Mariachi",
        nacionalidad: "México",
        imagen: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80",
        biografia: "«El Sol de México», icono indiscutible de la música latina con más de cuatro décadas de éxitos ininterrumpidos y una técnica vocal impecable admirada mundialmente."
    },
    "Alejandro Fernández": {
        nombre: "Alejandro Fernández",
        genero: "Ranchera / Pop latino",
        nacionalidad: "México",
        imagen: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&auto=format&fit=crop&q=80",
        biografia: "«El Potrillo», digno heredero de la dinastía Fernández que ha conquistado el mundo equilibrando la bravura del mariachi con la ternura de la balada pop contemporánea."
    },
    "Marco Antonio Solís": {
        nombre: "Marco Antonio Solís",
        genero: "Romántica / Balada / Cumbia",
        nacionalidad: "México",
        imagen: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&auto=format&fit=crop&q=80",
        biografia: "«El Buki», poeta y cantautor fundamental de Latinoamérica. Sus melodías sentidas sobre el desamor y la redención son parte viva del ADN musical en cualquier velada bohemia."
    },
    "Ricardo Montaner": {
        nombre: "Ricardo Montaner",
        genero: "Balada romántica",
        nacionalidad: "Venezuela / Argentina",
        imagen: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80",
        biografia: "Referente absoluto del romanticismo lírico en español, autor de odas eternas al amor con melodías conmovedoras que erizan la piel en cada verso."
    },
    "Chayanne": {
        nombre: "Chayanne",
        genero: "Pop latino / Balada",
        nacionalidad: "Puerto Rico",
        imagen: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80",
        biografia: "Carisma puro, energía escénica arrolladora y baladas tiernas; el puertorriqueño favorito de generaciones que llena de dinamismo cualquier sesión musical."
    },
    "Enrique Iglesias": {
        nombre: "Enrique Iglesias",
        genero: "Pop latino / Balada / Urbano",
        nacionalidad: "España",
        imagen: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
        biografia: "El rey del pop latino moderno, capaz de transitar desde baladas susurradas de máxima intimidad hasta explosiones de fiesta global que hacen temblar la pista."
    },
    "Juan Gabriel": {
        nombre: "Juan Gabriel",
        genero: "Ranchera / Balada / Clásicos",
        nacionalidad: "México",
        imagen: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=600&auto=format&fit=crop&q=80",
        biografia: "«El Divo de Juárez», genio prolífico y titán escénico. Sus creaciones forman el repertorio más cantado, llorado y aplaudido en la historia del karaoke hispanohablante."
    },
    "José José": {
        nombre: "José José",
        genero: "Balada romántica / Bolero",
        nacionalidad: "México",
        imagen: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=600&auto=format&fit=crop&q=80",
        biografia: "«El Príncipe de la Canción», maestro supremo de la afinación, la dicción y la melancolía vocal. Interpretar sus canciones es el verdadero rito de paso para todo vocalista."
    },
    "Vicente Fernández": {
        nombre: "Vicente Fernández",
        genero: "Ranchera tradicional",
        nacionalidad: "México",
        imagen: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80",
        biografia: "«El Charro de Huentitán», la voz insigne de la canción ranchera. Mientras el público no dejara de aplaudir, él no dejaba de cantar himnos inmortales de honor y tequila."
    },
    "Rocío Dúrcal": {
        nombre: "Rocío Dúrcal",
        genero: "Ranchera / Balada romántica",
        nacionalidad: "España",
        imagen: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
        biografia: "«La Española más Mexicana», dueña de un timbre aterciopelado que bordó con oro y cristal las composiciones de Juan Gabriel hasta convertirlas en patrimonio afectivo."
    },
    "Ana Gabriel": {
        nombre: "Ana Gabriel",
        genero: "Balada / Ranchera / Romántica",
        nacionalidad: "México",
        imagen: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80",
        biografia: "«La Luna de América», distinguida por su voz rasgada, profunda y volcánica. Sus canciones son declaraciones tajantes de amor apasionado y libertad."
    },
    "Shakira": {
        nombre: "Shakira",
        genero: "Pop latino / Rock / Fusión",
        nacionalidad: "Colombia",
        imagen: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=80",
        biografia: "Pionera indiscutida que redefinió la música en español para el mundo con letras poéticas en los 90 y un dominio colosal de los ritmos globales contemporáneos."
    },
    "Ricardo Arjona": {
        nombre: "Ricardo Arjona",
        genero: "Balada / Pop latino / Trova",
        nacionalidad: "Guatemala",
        imagen: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80",
        biografia: "Cronista urbano de contrastes cotidianos y metáforas agudas; sus temas son narrativas cinematográficas que despiertan complicidad instantánea entre el público."
    },
    "Maná": {
        nombre: "Maná",
        genero: "Rock en español / Latin Pop",
        nacionalidad: "México",
        imagen: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&auto=format&fit=crop&q=80",
        biografia: "La banda de rock en español más influyente del planeta, autores de himnos enérgicos que combinan guitarras apasionadas con un inconfundible corazón latino."
    },
    "Sin Bandera": {
        nombre: "Sin Bandera",
        genero: "Romántica / Balada / Soul",
        nacionalidad: "México / Argentina",
        imagen: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=600&auto=format&fit=crop&q=80",
        biografia: "Leonel García y Noel Schajris forjaron el dúo romántico por excelencia del siglo XXI, mezclando armonías vocales exquisitas con acordes de piano inolvidables."
    },
    "Reik": {
        nombre: "Reik",
        genero: "Balada pop / Romántica",
        nacionalidad: "México",
        imagen: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80",
        biografia: "Trío de Mexicali que modernizó la balada pop con melodías frescas, letras de romance sincero y el brillo vocal insuperable de Jesús Navarro."
    },
    "Camila": {
        nombre: "Camila",
        genero: "Balada dramática / Pop",
        nacionalidad: "México",
        imagen: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&auto=format&fit=crop&q=80",
        biografia: "Liderados por Mario Domm, Camila elevó el desamor a un nivel casi sinfónico con arreglos orquestales densos y coros de una intensidad arrolladora."
    },
    "Romeo Santos": {
        nombre: "Romeo Santos",
        genero: "Bachata sensual",
        nacionalidad: "República Dominicana / EE.UU.",
        imagen: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80",
        biografia: "«El Rey de la Bachata», quien universalizó el ritmo dominicano con sensualidad moderna, falsetes distintivos y líricas apasionadas que conquistan la pista."
    },
    "Marc Anthony": {
        nombre: "Marc Anthony",
        genero: "Salsa / Balada",
        nacionalidad: "Puerto Rico / EE.UU.",
        imagen: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80",
        biografia: "El gigante de la salsa contemporánea, capaz de elevar cualquier composición con una potencia pulmonar, un virtuosismo melódico y una pasión contagiosa única."
    },
    "Grupo Frontera": {
        nombre: "Grupo Frontera",
        genero: "Cumbia norteña / Regional",
        nacionalidad: "México / EE.UU.",
        imagen: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=600&auto=format&fit=crop&q=80",
        biografia: "El fenómeno que revitalizó la cumbia con acordes de bajo quinto y acordeón norteño, convirtiendo cada lanzamiento en un himno de fiesta y cantina moderna."
    },
    "Karol G": {
        nombre: "Karol G",
        genero: "Reguetón / Urbano / Pop",
        nacionalidad: "Colombia",
        imagen: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
        biografia: "«La Bichota», líder del movimiento urbano femenino mundial con una versatilidad musical asombrosa y melodías que unen a miles en una sola voz."
    },
    "Bad Bunny": {
        nombre: "Bad Bunny",
        genero: "Reguetón / Urbano contemporáneo",
        nacionalidad: "Puerto Rico",
        imagen: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80",
        biografia: "El artista más reproducido de la década, artífice de ritmos caribeños hipnóticos y narrativas nocturnas que definen el sonido del entretenimiento actual."
    },
    "Selena": {
        nombre: "Selena",
        genero: "Cumbia texana / Pop latino",
        nacionalidad: "México / EE.UU.",
        imagen: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80",
        biografia: "«La Reina del Tex-Mex», leyenda eterna cuya simpatía radiante, prodigio vocal y ritmo inconfundible siguen vivos e intactos en el corazón del público."
    },
    "Los Ángeles Azules": {
        nombre: "Los Ángeles Azules",
        genero: "Cumbia sonidera",
        nacionalidad: "México",
        imagen: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80",
        biografia: "Originarios de Iztapalapa para el mundo, los reyes de la cumbia sinfónica y sonidera cuyas notas de acordeón han hecho bailar a reyes y multitudes por igual."
    }
};

// Catálogo Principal de Canciones (85+ Canciones con descripciones originales)
const SEED_SONGS = [
    // --- CRISTIAN CASTRO ---
    {
        id: 1,
        titulo: "Por Amarte Así",
        artista: "Cristian Castro",
        genero: "Balada romántica",
        categoria: "Románticas",
        subcategoria: "Amor eterno",
        duracion: "4:32",
        anio: 1999,
        descripcion: "Una balada romántica intensa con cuerdas y crescendo vocal, ideal para cantar con entrega y sentimiento desbordado.",
        imagen: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80",
        popularidad: 98,
        esDueto: false,
        letra: ["Siempre serás la niña que me llene el alma...", "Por amarte así, es esa mi locura...", "¡Canta con el corazón en Karaoke Tulum!"]
    },
    {
        id: 2,
        titulo: "Azul",
        artista: "Cristian Castro",
        genero: "Pop latino",
        categoria: "Pop latino",
        subcategoria: "Latin Pop 2000s",
        duracion: "4:24",
        anio: 2001,
        descripcion: "Pop enérgico y vibrante con un coro pegadizo que pone a todo el lounge a cantar, saltar y levantar sus copas.",
        imagen: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&auto=format&fit=crop&q=80",
        popularidad: 96,
        esDueto: false,
        letra: ["Azul, y es que este amor es azul como el mar...", "Como el azul del cielo nació entre los dos...", "¡Sube la energía del lounge!"]
    },
    {
        id: 3,
        titulo: "Nunca Voy a Olvidarte",
        artista: "Cristian Castro",
        genero: "Balada romántica",
        categoria: "Baladas",
        subcategoria: "Baladas en español",
        duracion: "5:06",
        anio: 1993,
        descripcion: "Clásico del desamor con notas altas desafiantes, perfecta para lucir potencia vocal y dramatismo en el escenario.",
        imagen: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80",
        popularidad: 94,
        esDueto: false,
        letra: ["Nunca voy a olvidarte, aunque me cueste la vida...", "Sé que el amor se acaba, pero jamás se olvida...", "¡Entrega total al micrófono!"]
    },
    {
        id: 4,
        titulo: "No Podrás",
        artista: "Cristian Castro",
        genero: "Pop latino",
        categoria: "Música de los 90",
        subcategoria: "Pop 90s",
        duracion: "4:00",
        anio: 1992,
        descripcion: "El himno noventero juvenil que catapultó su carrera, dotado de un ritmo adictivo y estribillos sumamente contagiosos.",
        imagen: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600&auto=format&fit=crop&q=80",
        popularidad: 95,
        esDueto: false,
        letra: ["No podrás olvidar que te amé como yo nunca imaginé...", "Dejarás en mi piel un vacío que nadie llenará...", "¡Nostalgia noventera en vivo!"]
    },

    // --- LUIS MIGUEL ---
    {
        id: 5,
        titulo: "La Incondicional",
        artista: "Luis Miguel",
        genero: "Balada romántica",
        categoria: "Baladas",
        subcategoria: "Crescendo vocal",
        duracion: "4:25",
        anio: 1988,
        descripcion: "La balada pop definitiva de la música latina; una narrativa apasionada sobre la entrega incondicional sin ataduras.",
        imagen: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=80",
        popularidad: 100,
        esDueto: false,
        letra: ["Tú, la misma siempre tú, amistad, ternura, qué sé yo...", "La incondicional, la que no espera nada...", "¡Todo el lounge canta a una voz!"]
    },
    {
        id: 6,
        titulo: "Ahora Te Puedes Marchar",
        artista: "Luis Miguel",
        genero: "Pop latino",
        categoria: "Música de los 80",
        subcategoria: "80s Pop latino",
        duracion: "3:14",
        anio: 1987,
        descripcion: "Ritmo contagioso de los 80 con una vibra retro electrizante que invita a bailar con actitud y alegría.",
        imagen: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80",
        popularidad: 99,
        esDueto: false,
        letra: ["Si no supiste amar ahora te puedes marchar...", "Alejate de mí, no hay nada más que hablar...", "¡Disfruta el compás de El Sol!"]
    },
    {
        id: 7,
        titulo: "Culpable o No",
        artista: "Luis Miguel",
        genero: "Balada romántica",
        categoria: "Románticas",
        subcategoria: "Despecho suave",
        duracion: "3:58",
        anio: 1988,
        descripcion: "Balada desgarradora cargada de dolor y nostalgia, obligada para las noches de bohemia y complicidad íntima.",
        imagen: "https://images.unsplash.com/photo-1520523839898-5071282543e2?w=600&auto=format&fit=crop&q=80",
        popularidad: 97,
        esDueto: false,
        letra: ["Miénteme como siempre, por favor miénteme...", "Que no se entere nadie de este gran amor...", "¡Siente la pasión del bolero pop!"]
    },
    {
        id: 8,
        titulo: "Hasta Que Me Olvides",
        artista: "Luis Miguel",
        genero: "Balada romántica",
        categoria: "Baladas",
        subcategoria: "Baladas en español",
        duracion: "4:40",
        anio: 1993,
        descripcion: "Composición poética de Juan Luis Guerra llevada a la cúspide por El Sol, con una melodía envolvente e inspiradora.",
        imagen: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&auto=format&fit=crop&q=80",
        popularidad: 98,
        esDueto: false,
        letra: ["Hasta que me olvides voy a amarte tanto tanto...", "Como un fuego entre tus brazos yo me quedo...", "¡Elegancia acústica en Tulum!"]
    },
    {
        id: 9,
        titulo: "La Bikina",
        artista: "Luis Miguel",
        genero: "Ranchera",
        categoria: "Rancheras",
        subcategoria: "Mariachi de gala",
        duracion: "2:58",
        anio: 2000,
        descripcion: "La altiva y majestuosa mujer de leyenda vestida con el mariachi más elegante de México; orgullo y festejo puro.",
        imagen: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80",
        popularidad: 96,
        esDueto: false,
        letra: ["Solitaria camina La Bikina, y la gente se pone a murmurar...", "Dicen que tiene una pena que la hace llorar...", "¡Viva la música mexicana!"]
    },

    // --- ALEJANDRO FERNÁNDEZ ---
    {
        id: 10,
        titulo: "Me Dediqué a Perderte",
        artista: "Alejandro Fernández",
        genero: "Romántica",
        categoria: "Románticas",
        subcategoria: "Declaraciones",
        duracion: "3:54",
        anio: 2004,
        descripcion: "Balada acústica conmovedora sobre el arrepentimiento amoroso y el dolor de valorar el cariño cuando ya se ha marchado.",
        imagen: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80",
        popularidad: 98,
        esDueto: false,
        letra: ["Me dediqué a perderte y me ausenté en momentos que eran tuyos...", "Hoy me doy cuenta tarde que te amaba de verdad...", "¡Sentimiento que conmueve!"]
    },
    {
        id: 11,
        titulo: "Como Quien Pierde Una Estrella",
        artista: "Alejandro Fernández",
        genero: "Ranchera",
        categoria: "Rancheras",
        subcategoria: "Mariachi de gala",
        duracion: "3:32",
        anio: 1995,
        descripcion: "Himno ranchero moderno con trompetas desgarradoras y el timbre inconfundible y bravío de El Potrillo.",
        imagen: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=80",
        popularidad: 99,
        esDueto: false,
        letra: ["Te quiero, y qué difícil es decirlo frente a frente...", "Como quien pierde una estrella que se apaga en el cielo...", "¡A cantar con el alma abierta!"]
    },
    {
        id: 12,
        titulo: "Mátalas",
        artista: "Alejandro Fernández",
        genero: "Ranchera",
        categoria: "Rancheras",
        subcategoria: "Cantina y bohemia",
        duracion: "3:00",
        anio: 2003,
        descripcion: "Oda mariachi al cortejo clásico y a llenar de caricias, flores y detalles románticos a la mujer amada.",
        imagen: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&auto=format&fit=crop&q=80",
        popularidad: 93,
        esDueto: false,
        letra: ["Ámalas, consiéntelas con flores y poemas al oído...", "Mátalas con sobredosis de ternura y cariño...", "¡Tradición mariachi vibrante!"]
    },
    {
        id: 13,
        titulo: "Hoy Tengo Ganas de Ti",
        artista: "Alejandro Fernández & Christina Aguilera",
        genero: "Balada",
        categoria: "Duetos",
        subcategoria: "Duelos vocales",
        duracion: "4:48",
        anio: 2013,
        descripcion: "Duelo vocal épico de pasión desenfrenada entre dos de las voces más potentes y virtuosas del continente.",
        imagen: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80",
        popularidad: 97,
        esDueto: true,
        letra: ["Fuiste ave de paso y no sé por qué razón...", "Hoy tengo ganas de ti, de tus besos y tus brazos...", "¡Dueto estelar en la sala VIP!"]
    },

    // --- MARCO ANTONIO SOLÍS ---
    {
        id: 14,
        titulo: "Si No Te Hubieras Ido",
        artista: "Marco Antonio Solís",
        genero: "Balada",
        categoria: "Baladas",
        subcategoria: "Baladas en español",
        duracion: "4:48",
        anio: 1999,
        descripcion: "La canción de despecho y soledad más coreada de Latinoamérica; un clásico eterno del karaoke que todos cantan de pie.",
        imagen: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&auto=format&fit=crop&q=80",
        popularidad: 100,
        esDueto: false,
        letra: ["No hay nada más difícil que vivir sin ti...", "Sufriendo en la espera de volverte a ver...", "¡El himno definitivo de la noche!"]
    },
    {
        id: 15,
        titulo: "Más Que Tu Amigo",
        artista: "Marco Antonio Solís",
        genero: "Cumbia",
        categoria: "Cumbia",
        subcategoria: "Fiesta tropical",
        duracion: "3:32",
        anio: 2003,
        descripcion: "Cumbia fiestera y rítmica llena de júbilo para confesar el amor entre copas, baile y sonrisas cómplices.",
        imagen: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80",
        popularidad: 95,
        esDueto: false,
        letra: ["Ya ves que no es tan fácil ser sólo tu amigo...", "Quisiera que supieras lo que siento al mirarte...", "¡A gozar y bailar en Tulum!"]
    },
    {
        id: 16,
        titulo: "Tu Cárcel",
        artista: "Marco Antonio Solís",
        genero: "Romántica",
        categoria: "Románticas",
        subcategoria: "Amor eterno",
        duracion: "3:40",
        anio: 1987,
        descripcion: "El gran éxito de Los Bukis; una despedida con dignidad y resignación grabada para siempre en la memoria colectiva.",
        imagen: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600&auto=format&fit=crop&q=80",
        popularidad: 97,
        esDueto: false,
        letra: ["Te vas amor, si así lo quieres qué le voy a hacer...", "Pero recuerda que nadie te amará como yo te amé...", "¡Inolvidable nostalgia mexicana!"]
    },

    // --- RICARDO MONTANER ---
    {
        id: 17,
        titulo: "Tan Enamorados",
        artista: "Ricardo Montaner",
        genero: "Balada",
        categoria: "Románticas",
        subcategoria: "Íntimas",
        duracion: "4:20",
        anio: 1988,
        descripcion: "Romanticismo puro y sutil para cantar a media luz contemplando con devoción a esa persona especial.",
        imagen: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80",
        popularidad: 96,
        esDueto: false,
        letra: ["Quizás para los dos sea la primera vez...", "Tan enamorados que el mundo parece detenerse...", "¡Magia romántica en privado!"]
    },
    {
        id: 18,
        titulo: "Me Va a Extrañar",
        artista: "Ricardo Montaner",
        genero: "Balada romántica",
        categoria: "Baladas",
        subcategoria: "Crescendo vocal",
        duracion: "4:18",
        anio: 1989,
        descripcion: "Balada de nostalgia pura sobre los vacíos imposibles de llenar tras una dolorosa e inesperada partida.",
        imagen: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80",
        popularidad: 98,
        esDueto: false,
        letra: ["Me va a extrañar, al despertar en los días grises...", "Cuando el silencio recuerde nuestras risas...", "¡Potencia vocal apasionada!"]
    },
    {
        id: 19,
        titulo: "Bésame",
        artista: "Ricardo Montaner",
        genero: "Romántica",
        categoria: "Románticas",
        subcategoria: "Declaraciones",
        duracion: "4:02",
        anio: 2001,
        descripcion: "Melodía apasionada y lírica poética que invita a la cercanía, la caricia y el romance íntimo en el lounge.",
        imagen: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&auto=format&fit=crop&q=80",
        popularidad: 94,
        esDueto: false,
        letra: ["Bésame la boca, con tu lágrima de risa...", "Bésame el espacio entre tu cuerpo y mi silencio...", "¡Sensibilidad a flor de piel!"]
    },

    // --- CHAYANNE ---
    {
        id: 20,
        titulo: "Torero",
        artista: "Chayanne",
        genero: "Pop latino",
        categoria: "Pop latino",
        subcategoria: "Pop bailable",
        duracion: "3:37",
        anio: 2002,
        descripcion: "Explosión de adrenalina, guitarra española y ritmo acelerado para encender la energía de todo el auditorio.",
        imagen: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80",
        popularidad: 99,
        esDueto: false,
        letra: ["De lunes a domingo voy desesperado...", "Hay que ser torero, poner el alma en el ruedo...", "¡Fuerza y carisma en el escenario!"]
    },
    {
        id: 21,
        titulo: "Dejaría Todo",
        artista: "Chayanne",
        genero: "Balada romántica",
        categoria: "Románticas",
        subcategoria: "Despecho suave",
        duracion: "4:44",
        anio: 1998,
        descripcion: "La súplica desesperada del amante dispuesto a entregar su vida entera por una sola caricia y una mirada más.",
        imagen: "https://images.unsplash.com/photo-1520523839898-5071282543e2?w=600&auto=format&fit=crop&q=80",
        popularidad: 98,
        esDueto: false,
        letra: ["He intentado casi todo para convencerte...", "Dejaría todo porque te quedaras, mi credo, mi pasado...", "¡Entrega total al micrófono!"]
    },
    {
        id: 22,
        titulo: "Un Siglo Sin Ti",
        artista: "Chayanne",
        genero: "Balada",
        categoria: "Baladas",
        subcategoria: "Baladas en español",
        duracion: "4:41",
        anio: 2003,
        descripcion: "Balada de perdón sincero y melodía memorable ideal para reconciliaciones apasionadas frente al público.",
        imagen: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80",
        popularidad: 96,
        esDueto: false,
        letra: ["Mil y una noches me pasé llorando...", "Si te he fallado te pido perdón de la única forma que sé...", "¡Canta con el corazón abierto!"]
    },
    {
        id: 23,
        titulo: "Salomé",
        artista: "Chayanne",
        genero: "Pop latino",
        categoria: "Música de los 90",
        subcategoria: "Dance latino",
        duracion: "4:12",
        anio: 1998,
        descripcion: "Fiesta caribeña, metales vibrantes y sabor latino irresistible para que nadie se quede sentado en su mesa.",
        imagen: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=600&auto=format&fit=crop&q=80",
        popularidad: 94,
        esDueto: false,
        letra: ["Baila que baila Salomé, con su cadencia y su vaivén...", "Oye su ritmo que te invita a soñar...", "¡Pura fiesta caribeña en Tulum!"]
    },

    // --- ENRIQUE IGLESIAS ---
    {
        id: 24,
        titulo: "Héroe",
        artista: "Enrique Iglesias",
        genero: "Balada romántica",
        categoria: "Románticas",
        subcategoria: "Íntimas",
        duracion: "4:24",
        anio: 2001,
        descripcion: "Balada íntima y protectora en susurros y acordes suaves, favorita indiscutible para serenatas inolvidables.",
        imagen: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
        popularidad: 97,
        esDueto: false,
        letra: ["Si pudiera ser tu héroe, si pudiera salvarte el dolor...", "Yo puedo ser tu héroe, nena...", "¡Intimidad y ternura en el lounge!"]
    },
    {
        id: 25,
        titulo: "Bailando",
        artista: "Enrique Iglesias ft. Gente de Zona",
        genero: "Pop latino",
        categoria: "Pop latino",
        subcategoria: "Pop bailable",
        duracion: "4:03",
        anio: 2014,
        descripcion: "Fusión ibérica y urbana con guitarra española y compás caliente que dominó las listas globales durante meses.",
        imagen: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80",
        popularidad: 98,
        esDueto: true,
        letra: ["Yo te miro se me corta la respiración...", "Bailando, bailando, tu cuerpo y el mío llenando el vacío...", "¡Sabor caribeño que une a todos!"]
    },
    {
        id: 26,
        titulo: "Experiencia Religiosa",
        artista: "Enrique Iglesias",
        genero: "Pop latino",
        categoria: "Música de los 90",
        subcategoria: "Pop 90s",
        duracion: "5:32",
        anio: 1995,
        descripcion: "El himno noventero de devoción sentimental con coros góspel sublimes que elevan la emoción de la sala.",
        imagen: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&auto=format&fit=crop&q=80",
        popularidad: 93,
        esDueto: false,
        letra: ["Es una experiencia religiosa, sentir que te quiero cada día más...", "Un milagro que la vida me dio...", "¡Clásico de oro de los noventa!"]
    },

    // --- JUAN GABRIEL ---
    {
        id: 27,
        titulo: "Amor Eterno",
        artista: "Juan Gabriel",
        genero: "Ranchera",
        categoria: "Rancheras",
        subcategoria: "Mariachi de gala",
        duracion: "6:50",
        anio: 1984,
        descripcion: "La elegía más sublime y conmovedora de la música hispana, interpretada con reverencia, respeto y lágrimas sinceras.",
        imagen: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=600&auto=format&fit=crop&q=80",
        popularidad: 100,
        esDueto: false,
        letra: ["Tú eres el amor del cual yo tengo el más triste recuerdo...", "Amor eterno e inolvidable, tarde o temprano yo voy a estar contigo...", "¡Homenaje sentido en Tulum!"]
    },
    {
        id: 28,
        titulo: "Querida",
        artista: "Juan Gabriel",
        genero: "Balada",
        categoria: "Clásicos",
        subcategoria: "Grandes voces",
        duracion: "5:27",
        anio: 1984,
        descripcion: "Un torrente de pasión y llamada insistente al regreso del ser amado con un coro apoteósico que eriza la piel.",
        imagen: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600&auto=format&fit=crop&q=80",
        popularidad: 99,
        esDueto: false,
        letra: ["Querida, cada momento de mi vida pienso en ti más cada día...", "Mira mi soledad, mira mi soledad...", "¡El Divo de Juárez en su máxima gloria!"]
    },
    {
        id: 29,
        titulo: "Así Fue",
        artista: "Juan Gabriel",
        genero: "Balada romántica",
        categoria: "Románticas",
        subcategoria: "Despecho suave",
        duracion: "4:38",
        anio: 1988,
        descripcion: "Honestidad descarnada frente al pasado, narrada con la teatralidad y maestría dramática inigualable de Juanga.",
        imagen: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80",
        popularidad: 99,
        esDueto: false,
        letra: ["Perdona si te hago llorar, perdona si te hago sufrir...", "Soy honesto con ella y contigo, a ella la quiero y a ti te he olvidado...", "¡Teatralidad pura al micrófono!"]
    },
    {
        id: 30,
        titulo: "Hasta Que Te Conocí",
        artista: "Juan Gabriel",
        genero: "Balada",
        categoria: "Baladas",
        subcategoria: "Crescendo vocal",
        duracion: "7:13",
        anio: 1986,
        descripcion: "Viaje sinfónico de la dicha solitaria al sufrimiento del primer gran amor traicionado; una cátedra de crescendo lírico.",
        imagen: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80",
        popularidad: 97,
        esDueto: false,
        letra: ["Yo vivía tan distinto, algo hermoso algo divino...", "Hasta que te conocí, vi la vida con dolor...", "¡Clímax instrumental y vocal sublime!"]
    },
    {
        id: 31,
        titulo: "El Noa Noa",
        artista: "Juan Gabriel",
        genero: "Pop latino",
        categoria: "Clásicos",
        subcategoria: "Inmortales del bolero",
        duracion: "4:15",
        anio: 1980,
        descripcion: "Pura alegría, baile y despreocupación en el mítico salón juarense donde la noche es joven y el ambiente inmejorable.",
        imagen: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=80",
        popularidad: 96,
        esDueto: false,
        letra: ["Vamos al Noa Noa, Noa Noa, Noa Noa...", "Este es un lugar de ambiente donde todo es diferente...", "¡Fiesta desbordada en la pista!"]
    },

    // --- JOSÉ JOSÉ ---
    {
        id: 32,
        titulo: "El Triste",
        artista: "José José",
        genero: "Balada romántica",
        categoria: "Clásicos",
        subcategoria: "Leyendas de oro",
        duracion: "4:10",
        anio: 1970,
        descripcion: "La cumbre de la interpretación vocal en español; el reto supremo reservado para los vocalistas más virtuosos de la noche.",
        imagen: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=600&auto=format&fit=crop&q=80",
        popularidad: 100,
        esDueto: false,
        letra: ["Qué triste fue decirnos adiós cuando nos adorábamos más...", "Hoy quiero saborear mi dolor, no pido compasión ni piedad...", "¡La hazaña vocal más ovacionada!"]
    },
    {
        id: 33,
        titulo: "Almohada",
        artista: "José José",
        genero: "Romántica",
        categoria: "Románticas",
        subcategoria: "Íntimas",
        duracion: "3:35",
        anio: 1978,
        descripcion: "Confesión íntima de amor ilusorio y soledad nocturna abrazando la almohada en la penumbra de una habitación vacía.",
        imagen: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&auto=format&fit=crop&q=80",
        popularidad: 98,
        esDueto: false,
        letra: ["Amor es el que espera con el alma en la mano...", "Y a veces te maldigo por creer en tus promesas...", "¡El Príncipe de la Canción vive!"]
    },
    {
        id: 34,
        titulo: "Gavilán o Paloma",
        artista: "José José",
        genero: "Balada",
        categoria: "Baladas",
        subcategoria: "Baladas en español",
        duracion: "4:12",
        anio: 1977,
        descripcion: "Historia cautivante de seducción y fragilidad masculina contada con una riqueza melódica y elegancia interpretativa única.",
        imagen: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80",
        popularidad: 96,
        esDueto: false,
        letra: ["No valió la pena el juego si caí en tu trampa de amor...", "Amiga mía, paloma herida que alzo mi vuelo...", "¡Canto poético inolvidable!"]
    },
    {
        id: 35,
        titulo: "Amar y Querer",
        artista: "José José",
        genero: "Balada",
        categoria: "Clásicos",
        subcategoria: "Grandes voces",
        duracion: "4:00",
        anio: 1977,
        descripcion: "Tratado filosófico sobre la diferencia crucial entre desear posesión efímera y entregarse con el alma al verdadero amor.",
        imagen: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80",
        popularidad: 97,
        esDueto: false,
        letra: ["Casi todos sabemos querer, pero pocos sabemos amar...", "Amar es sufrir, querer es gozar...", "¡Reflexión y aplausos de pie!"]
    },

    // --- VICENTE FERNÁNDEZ ---
    {
        id: 36,
        titulo: "El Rey",
        artista: "Vicente Fernández",
        genero: "Ranchera",
        categoria: "Rancheras",
        subcategoria: "Cantina y bohemia",
        duracion: "2:30",
        anio: 1971,
        descripcion: "El himno indiscutible de la bohemia mexicana con orgullo indomable, mariachi de trompetas vivas y garganta encendida.",
        imagen: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80",
        popularidad: 100,
        esDueto: false,
        letra: ["Con dinero y sin dinero, hago siempre lo que quiero...", "No tengo trono ni reina, ni nadie que me comprenda, ¡pero sigo siendo el rey!", "¡El grito ranchero de México!"]
    },
    {
        id: 37,
        titulo: "Volver, Volver",
        artista: "Vicente Fernández",
        genero: "Ranchera",
        categoria: "Rancheras",
        subcategoria: "Mariachi de gala",
        duracion: "3:02",
        anio: 1972,
        descripcion: "Grito desgarrador de arrepentimiento que retumba con fuerza épica en las gargantas de todo el lounge al unísono.",
        imagen: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=80",
        popularidad: 99,
        esDueto: false,
        letra: ["Este amor apasionado anda todo alborotado por volver...", "Y volver, volver, volver... a tus brazos otra vez...", "¡Ovación segura en la sala!"]
    },
    {
        id: 38,
        titulo: "Acá Entre Nos",
        artista: "Vicente Fernández",
        genero: "Ranchera",
        categoria: "Rancheras",
        subcategoria: "Cantina y bohemia",
        duracion: "3:15",
        anio: 1992,
        descripcion: "Confesión secreta entre amigos de que el dolor no ha pasado, el orgullo ha caído y aún se extraña cada caricia.",
        imagen: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80",
        popularidad: 98,
        esDueto: false,
        letra: ["Por orgullo simplemente no te busco, pero acá entre nos...", "Te he llorado tanto y me duele no tenerte...", "¡Desahogo de cantina con clase!"]
    },
    {
        id: 39,
        titulo: "Mujeres Divinas",
        artista: "Vicente Fernández",
        genero: "Ranchera",
        categoria: "Rancheras",
        subcategoria: "Mariachi de gala",
        duracion: "3:20",
        anio: 1987,
        descripcion: "Homenaje de cantina a la belleza y el embrujo femenino, perdonando con elegancia cualquier traición por una copa.",
        imagen: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&auto=format&fit=crop&q=80",
        popularidad: 95,
        esDueto: false,
        letra: ["Hablando de mujeres y traiciones se fueron consumiendo las botellas...", "No queda más camino que cantarles y brindar por ellas...", "¡Salud por las mujeres divinas!"]
    },

    // --- ROCÍO DÚRCAL ---
    {
        id: 40,
        titulo: "Costumbres",
        artista: "Rocío Dúrcal",
        genero: "Romántica",
        categoria: "Románticas",
        subcategoria: "Despecho suave",
        duracion: "4:32",
        anio: 1985,
        descripcion: "El desgastante límite entre el amor y la costumbre reflexionado con la elegancia vocal incomparable de la gran señora.",
        imagen: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
        popularidad: 98,
        esDueto: false,
        letra: ["No cabe duda que es verdad que la costumbre es más fuerte que el amor...", "Sé que tú no me quieres, y yo no te amo ya...", "¡La voz de cristal de Rocío!"]
    },
    {
        id: 41,
        titulo: "La Gata Bajo la Lluvia",
        artista: "Rocío Dúrcal",
        genero: "Balada",
        categoria: "Baladas",
        subcategoria: "Crescendo vocal",
        duracion: "3:40",
        anio: 1981,
        descripcion: "Poema melancólico sobre el adiós definitivo y el recuerdo felino de quien amó sin condiciones bajo la tormenta nocturna.",
        imagen: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80",
        popularidad: 99,
        esDueto: false,
        letra: ["Amor, tranquilo, no te voy a molestar...", "Y si alguna vez me ves pasar, recuerda que fui tu gata bajo la lluvia...", "¡Clásico desgarrador y sublime!"]
    },
    {
        id: 42,
        titulo: "Déjame Vivir",
        artista: "Rocío Dúrcal & Juan Gabriel",
        genero: "Ranchera",
        categoria: "Duetos",
        subcategoria: "Duelos vocales",
        duracion: "3:45",
        anio: 1984,
        descripcion: "El intercambio a dos voces más divertido, picante y teatral del cancionero popular mexicano; pura chispa escénica.",
        imagen: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=80",
        popularidad: 97,
        esDueto: true,
        letra: ["¿Para qué me buscas si ya no te quiero?...", "No no no, déjame vivir, ya no me busques más...", "¡Complicidad alegre en pareja!"]
    },

    // --- ANA GABRIEL ---
    {
        id: 43,
        titulo: "Quién Como Tú",
        artista: "Ana Gabriel",
        genero: "Romántica",
        categoria: "Románticas",
        subcategoria: "Declaraciones",
        duracion: "3:35",
        anio: 1989,
        descripcion: "La envidia sutil hacia quien disfruta los brazos del amor soñado, entonada con la voz rasgada y pasional de la sinaloense.",
        imagen: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=80",
        popularidad: 97,
        esDueto: false,
        letra: ["Quién como tú que le puedes mirar a los ojos...", "Quién como tú que lo puedes besar sin temor...", "¡Fuerza interpretativa sin igual!"]
    },
    {
        id: 44,
        titulo: "Simplemente Amigos",
        artista: "Ana Gabriel",
        genero: "Balada",
        categoria: "Baladas",
        subcategoria: "Baladas en español",
        duracion: "3:48",
        anio: 1988,
        descripcion: "El himno definitivo de los amores clandestinos que deben ocultar su fuego ardiente y fingir amistad ante el mundo.",
        imagen: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&auto=format&fit=crop&q=80",
        popularidad: 100,
        esDueto: false,
        letra: ["Cuanto daría por gritarles nuestro amor...", "Tener que fingir que sólo somos amigos cuando nos miran...", "¡El secreto mejor guardado cantado a pulmón!"]
    },
    {
        id: 45,
        titulo: "Luna",
        artista: "Ana Gabriel",
        genero: "Balada romántica",
        categoria: "Románticas",
        subcategoria: "Íntimas",
        duracion: "4:30",
        anio: 1993,
        descripcion: "Petición nocturna al astro celeste para que cuide, acompañe y acaricie al ser amado que se encuentra en la lejanía.",
        imagen: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80",
        popularidad: 95,
        esDueto: false,
        letra: ["Luna, tú que lo ves dile que lo extraño...", "Que no hay noche que no sueñe con su calor...", "¡Poesía lírica bajo el cielo de Tulum!"]
    },

    // --- SHAKIRA ---
    {
        id: 46,
        titulo: "Antología",
        artista: "Shakira",
        genero: "Balada",
        categoria: "Baladas",
        subcategoria: "Acústicas",
        duracion: "4:14",
        anio: 1995,
        descripcion: "Lírica introspectiva y acústica sobre aprender a amar, respirar y desarmar el alma en los años de juventud.",
        imagen: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=80",
        popularidad: 99,
        esDueto: false,
        letra: ["Para amarte necesito una razón y es difícil encontrarla...", "Y fue por ti que aprendí a quitarle al tiempo los segundos...", "¡Nostalgia acústica que conmueve!"]
    },
    {
        id: 47,
        titulo: "Hips Don't Lie",
        artista: "Shakira ft. Wyclef Jean",
        genero: "Pop latino",
        categoria: "Pop latino",
        subcategoria: "Pop bailable",
        duracion: "3:38",
        anio: 2006,
        descripcion: "Explosión bailable global con trompetas colombianas y movimiento de caderas electrizante que prendió el planeta.",
        imagen: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80",
        popularidad: 98,
        esDueto: true,
        letra: ["I never really knew that she could dance like this...", "Mira en Barranquilla se baila así...", "¡Pura candela caribeña en vivo!"]
    },
    {
        id: 48,
        titulo: "Ciega, Sordomuda",
        artista: "Shakira",
        genero: "Pop latino",
        categoria: "Música de los 90",
        subcategoria: "Pop 90s",
        duracion: "4:28",
        anio: 1998,
        descripcion: "Fusión pop-mariachi con juego de palabras vertiginoso sobre perder el control y la razón por causa de un amor loco.",
        imagen: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600&auto=format&fit=crop&q=80",
        popularidad: 97,
        esDueto: false,
        letra: ["Bruta, ciega, sordomuda, torpe, traste y testaruda...", "Es todo lo que he sido por ti...", "¡Divertida y rápida para cantar en grupo!"]
    },
    {
        id: 49,
        titulo: "Bzrp Music Sessions, Vol. 53",
        artista: "Shakira & Bizarrap",
        genero: "Éxitos actuales",
        categoria: "Éxitos actuales",
        subcategoria: "Viral Global",
        duracion: "3:33",
        anio: 2023,
        descripcion: "Fenómeno viral contemporáneo cargado de empoderamiento, barras afiladas y sintetizadores potentes.",
        imagen: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=600&auto=format&fit=crop&q=80",
        popularidad: 99,
        esDueto: true,
        letra: ["Una loba como yo no está pa' novatos...", "Las mujeres ya no lloran, las mujeres facturan...", "¡El hit moderno que todos corean!"]
    },

    // --- RICARDO ARJONA ---
    {
        id: 50,
        titulo: "Fuiste Tú",
        artista: "Ricardo Arjona ft. Gaby Moreno",
        genero: "Balada",
        categoria: "Duetos",
        subcategoria: "Duelos vocales",
        duracion: "4:25",
        anio: 2011,
        descripcion: "Diálogo a dos voces sobre los reproches compartidos, el desgaste y la despedida madura de un gran amor.",
        imagen: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80",
        popularidad: 98,
        esDueto: true,
        letra: ["Fuiste tú, tenerte fue una foto gris...", "Fuiste tú, la luz de neón del barrio...", "¡Dueto imprescindible de la bohemia!"]
    },
    {
        id: 51,
        titulo: "Señora de las Cuatro Décadas",
        artista: "Ricardo Arjona",
        genero: "Balada",
        categoria: "Románticas",
        subcategoria: "Declaraciones",
        duracion: "5:06",
        anio: 1994,
        descripcion: "Oda a la madurez femenina, la sensualidad de la experiencia y los años vividos con orgullo y plenitud.",
        imagen: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80",
        popularidad: 95,
        esDueto: false,
        letra: ["Señora de las cuatro décadas y más primaveras...", "Déjeme decirle que se ve espectacular...", "¡Homenaje poético a las damas!"]
    },
    {
        id: 52,
        titulo: "Historia de Taxi",
        artista: "Ricardo Arjona",
        genero: "Pop latino",
        categoria: "Música de los 90",
        subcategoria: "Pop 90s",
        duracion: "6:44",
        anio: 1996,
        descripcion: "Crónica nocturna y cinematográfica con giro inesperado y humor negro en el asiento trasero de un taxi.",
        imagen: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&auto=format&fit=crop&q=80",
        popularidad: 94,
        esDueto: false,
        letra: ["Eran las diez de la noche, piloteaba mi nave...", "El espejo me dijo que era ella...", "¡Historia cantada como una película!"]
    },

    // --- MANÁ ---
    {
        id: 53,
        titulo: "Oye Mi Amor",
        artista: "Maná",
        genero: "Rock",
        categoria: "Rock",
        subcategoria: "Rock en español",
        duracion: "4:32",
        anio: 1992,
        descripcion: "Rock pop energético con coro explosivo para declarar intenciones de conquista sin rodeos en la barra del bar.",
        imagen: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=600&auto=format&fit=crop&q=80",
        popularidad: 98,
        esDueto: false,
        letra: ["Oye mi amor, no me digas que no...", "Vamos juntando los cuerpos que la noche se acaba...", "¡Guitarras que electrizan el ambiente!"]
    },
    {
        id: 54,
        titulo: "Clavado en un Bar",
        artista: "Maná",
        genero: "Rock",
        categoria: "Rock",
        subcategoria: "Himnos de estadio",
        duracion: "5:11",
        anio: 1997,
        descripcion: "Desahogo roquero entre tragos y desesperación esperando la llamada de quien se marchó; pura catarsis.",
        imagen: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80",
        popularidad: 99,
        esDueto: false,
        letra: ["Aquí me tiene bien clavado, soltando las penas en un bar...", "Buscando al fondo de la copa su recuerdo...", "¡A cantar con fuerza desgarradora!"]
    },
    {
        id: 55,
        titulo: "En el Muelle de San Blas",
        artista: "Maná",
        genero: "Rock",
        categoria: "Rock",
        subcategoria: "Rock acústico",
        duracion: "5:53",
        anio: 1997,
        descripcion: "Nostálgica balada rock sobre la mujer que esperó en la orilla del mar el regreso eterno de su marinero.",
        imagen: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&auto=format&fit=crop&q=80",
        popularidad: 97,
        esDueto: false,
        letra: ["Ella despidió a su amor, él partió en un barco...", "Sola, sola en el olvido, sola con su espíritu...", "¡Leyenda marinera cantada con alma!"]
    },
    {
        id: 56,
        titulo: "Mi Verdad",
        artista: "Maná ft. Shakira",
        genero: "Balada",
        categoria: "Duetos",
        subcategoria: "Duelos vocales",
        duracion: "4:32",
        anio: 2015,
        descripcion: "Remanso acústico y reflexivo sobre la verdad incondicional y el refugio puro que representa el amor verdadero.",
        imagen: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=80",
        popularidad: 95,
        esDueto: true,
        letra: ["Hay tanta mentira y tanta falsedad...", "Tú eres mi amor, mi alegría, la verdad de mi vida...", "¡Dueto de serenidad y belleza pura!"]
    },

    // --- SIN BANDERA ---
    {
        id: 57,
        titulo: "Entra en Mi Vida",
        artista: "Sin Bandera",
        genero: "Romántica",
        categoria: "Románticas",
        subcategoria: "Declaraciones",
        duracion: "4:09",
        anio: 2002,
        descripcion: "Declaración abierta de bienvenida al amor que llega a ordenar y transformar todo alrededor con ternura.",
        imagen: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=600&auto=format&fit=crop&q=80",
        popularidad: 98,
        esDueto: false,
        letra: ["Entra en mi vida, te abro la puerta...", "Sé que en tus brazos ya no habrá dolor...", "¡El himno del amor naciente!"]
    },
    {
        id: 58,
        titulo: "Kilómetros",
        artista: "Sin Bandera",
        genero: "Balada",
        categoria: "Baladas",
        subcategoria: "Baladas en español",
        duracion: "3:42",
        anio: 2002,
        descripcion: "La dulce tortura de la distancia física que no logra apagar el fuego ni la devoción entre dos almas conectadas.",
        imagen: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&auto=format&fit=crop&q=80",
        popularidad: 96,
        esDueto: false,
        letra: ["A varios cientos de kilómetros, puede tu voz darme calor...", "No me importa la distancia si al final estás tú...", "¡Melodía que acorta cualquier lejanía!"]
    },
    {
        id: 59,
        titulo: "Mientes Tan Bien",
        artista: "Sin Bandera",
        genero: "Balada",
        categoria: "Románticas",
        subcategoria: "Despecho suave",
        duracion: "3:48",
        anio: 2003,
        descripcion: "El autoengaño voluntario de escuchar promesas hermosas aunque en el fondo sepamos que están vacías.",
        imagen: "https://images.unsplash.com/photo-1520523839898-5071282543e2?w=600&auto=format&fit=crop&q=80",
        popularidad: 95,
        esDueto: false,
        letra: ["Mientes tan bien que me sabe a verdad...", "Que prefiero creerte a vivir en soledad...", "¡Sensibilidad y armonía a piano!"]
    },

    // --- REIK ---
    {
        id: 60,
        titulo: "Noviembre Sin Ti",
        artista: "Reik",
        genero: "Balada",
        categoria: "Baladas",
        subcategoria: "Baladas en español",
        duracion: "3:22",
        anio: 2005,
        descripcion: "Himno pop adolescente sobre el otoño del corazón y los recuerdos que congelan el alma tras una ruptura.",
        imagen: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80",
        popularidad: 97,
        esDueto: false,
        letra: ["Noviembre sin ti es sentir que la lluvia...", "Cae sobre el suelo de mi habitación vacía...", "¡Todos los presentes cantan el coro!"]
    },
    {
        id: 61,
        titulo: "Yo Quisiera",
        artista: "Reik",
        genero: "Romántica",
        categoria: "Románticas",
        subcategoria: "Declaraciones",
        duracion: "3:38",
        anio: 2005,
        descripcion: "La confesión secreta del mejor amigo enamorado en silencio de quien solo le cuenta sus penas con otros amores.",
        imagen: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80",
        popularidad: 96,
        esDueto: false,
        letra: ["Yo quisiera ser ese por quien te desvelas...", "Poder decirte que te amo de verdad...", "¡Ternura y nostalgia acústica!"]
    },
    {
        id: 62,
        titulo: "Ya Me Enteré",
        artista: "Reik",
        genero: "Balada romántica",
        categoria: "Baladas",
        subcategoria: "Crescendo vocal",
        duracion: "3:32",
        anio: 2016,
        descripcion: "Balada contemporánea a piano y voz que destila despecho y la certeza absoluta de que el otro aún no ha superado el amor.",
        imagen: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80",
        popularidad: 98,
        esDueto: false,
        letra: ["Ya me enteré que hay alguien nuevo en tu vida...", "Pero que en las noches todavía me piensas...", "¡Voz prodigiosa que llena la sala!"]
    },

    // --- CAMILA ---
    {
        id: 63,
        titulo: "Mientes",
        artista: "Camila",
        genero: "Balada",
        categoria: "Baladas",
        subcategoria: "Crescendo vocal",
        duracion: "3:25",
        anio: 2010,
        descripcion: "Reclamo visceral ante la falsedad de quien prometió el cielo pero sólo dejó cenizas y desilusión.",
        imagen: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&auto=format&fit=crop&q=80",
        popularidad: 99,
        esDueto: false,
        letra: ["Mientes, me haces daño y luego te arrepientes...", "Ya no te creo nada, se acabó...", "¡Furia y desahogo lírico total!"]
    },
    {
        id: 64,
        titulo: "Todo Cambió",
        artista: "Camila",
        genero: "Romántica",
        categoria: "Románticas",
        subcategoria: "Amor eterno",
        duracion: "3:14",
        anio: 2006,
        descripcion: "El instante mágico y transformador en que una sola mirada y una sonrisa cambian las prioridades de la vida.",
        imagen: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&auto=format&fit=crop&q=80",
        popularidad: 97,
        esDueto: false,
        letra: ["Todo cambió cuando te vi, de blanco y negro a color me convertí...", "Y fue tan fácil quererte tanto...", "¡Dulzura y piano conmovedor!"]
    },
    {
        id: 65,
        titulo: "Aléjate de Mí",
        artista: "Camila",
        genero: "Balada",
        categoria: "Baladas",
        subcategoria: "Crescendo vocal",
        duracion: "4:18",
        anio: 2010,
        descripcion: "Advertencia protectora de quien se reconoce herido y prefiere apartarse antes de lastimar al ser amado.",
        imagen: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80",
        popularidad: 96,
        esDueto: false,
        letra: ["Aléjate de mí y hazlo pronto antes de que te hiera...", "No soy quien tú crees que soy...", "¡Intensidad dramática inigualable!"]
    },

    // --- ROMEO SANTOS / AVENTURA ---
    {
        id: 66,
        titulo: "Propuesta Indecente",
        artista: "Romeo Santos",
        genero: "Bachata",
        categoria: "Bachata",
        subcategoria: "Bachata sensual",
        duracion: "3:55",
        anio: 2013,
        descripcion: "Seducción sensual que amalgama bachata dominicana y tango argentino en una invitación nocturna inolvidable.",
        imagen: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80",
        popularidad: 99,
        esDueto: false,
        letra: ["Si te invito una copa y me acerco a tu boca...", "Una aventura es más divertida si huele a peligro...", "¡Sensualidad pura en la pista!"]
    },
    {
        id: 67,
        titulo: "Eres Mía",
        artista: "Romeo Santos",
        genero: "Bachata",
        categoria: "Bachata",
        subcategoria: "Bachata sensual",
        duracion: "4:10",
        anio: 2014,
        descripcion: "Bachata romántica de reclamo pasional y posesivo que conquistó las pistas de baile del mundo entero.",
        imagen: "https://images.unsplash.com/photo-1520523839898-5071282543e2?w=600&auto=format&fit=crop&q=80",
        popularidad: 96,
        esDueto: false,
        letra: ["No te asombres si una noche entro a tu cuarto...", "Tú eres mía y nadie más te amará igual...", "¡Cadencia suave y envolvente!"]
    },
    {
        id: 68,
        titulo: "Obsesión",
        artista: "Aventura",
        genero: "Bachata",
        categoria: "Bachata",
        subcategoria: "Urbana",
        duracion: "4:14",
        anio: 2002,
        descripcion: "El clásico indiscutible que internacionalizó la bachata con su mítico diálogo a dos voces sobre el amor y la obsesión.",
        imagen: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80",
        popularidad: 98,
        esDueto: true,
        letra: ["No es amor, lo que tú sientes se llama obsesión...", "Una ilusión en tu pensamiento que te hace hacer cosas...", "¡Todo el mundo se sabe este coro!"]
    },

    // --- MARC ANTHONY ---
    {
        id: 69,
        titulo: "Vivir Mi Vida",
        artista: "Marc Anthony",
        genero: "Salsa",
        categoria: "Salsa",
        subcategoria: "Salsa de salón",
        duracion: "4:12",
        anio: 2013,
        descripcion: "Himno universal de alegría y resiliencia caribeña para cantar, reír, gozar y celebrar la dicha de existir.",
        imagen: "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=600&auto=format&fit=crop&q=80",
        popularidad: 100,
        esDueto: false,
        letra: ["Voy a reír, voy a bailar, vivir mi vida la la la la...", "A veces llega la lluvia para limpiar las heridas...", "¡Felicidad desbordada en Karaoke Tulum!"]
    },
    {
        id: 70,
        titulo: "Y Hubo Alguien",
        artista: "Marc Anthony",
        genero: "Salsa",
        categoria: "Salsa",
        subcategoria: "Salsa romántica",
        duracion: "6:28",
        anio: 1997,
        descripcion: "Salsa romántica de despecho triunfal sobre encontrar a alguien mejor tras superar un amor ingrato.",
        imagen: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80",
        popularidad: 96,
        esDueto: false,
        letra: ["Y hubo alguien que se ocupó de secar mis lágrimas...", "Que me enseñó a amar de nuevo...", "¡Trompetas y son latino a toda voz!"]
    },
    {
        id: 71,
        titulo: "No Me Ames",
        artista: "Marc Anthony & Jennifer Lopez",
        genero: "Balada",
        categoria: "Duetos",
        subcategoria: "Dúos románticos",
        duracion: "4:38",
        anio: 1999,
        descripcion: "Balada dramática bilingüe sobre el temor a amar sin garantías del mañana entre dos astros neoyorquinos.",
        imagen: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=80",
        popularidad: 95,
        esDueto: true,
        letra: ["No me ames, para estar muriendo dentro de una guerra...", "No me ames, te lo ruego...", "¡Dueto legendario de romance y dolor!"]
    },

    // --- GRUPO FRONTERA ---
    {
        id: 72,
        titulo: "Un x100to",
        artista: "Grupo Frontera & Bad Bunny",
        genero: "Cumbia",
        categoria: "Cumbia",
        subcategoria: "Cumbia norteña",
        duracion: "3:15",
        anio: 2023,
        descripcion: "Cumbia norteña moderna con acordeón nostálgico sobre llamar al ex con el último porcentaje de batería del móvil.",
        imagen: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=600&auto=format&fit=crop&q=80",
        popularidad: 100,
        esDueto: true,
        letra: ["Me queda un por ciento y lo usaré para decirte cuánto lo siento...", "Pensando si todavía me quieres...", "¡El hit del acordeón que enamoró al mundo!"]
    },
    {
        id: 73,
        titulo: "No Se Va",
        artista: "Grupo Frontera",
        genero: "Cumbia",
        categoria: "Cumbia",
        subcategoria: "Cumbia romántica",
        duracion: "3:13",
        anio: 2022,
        descripcion: "Fusión irresistible de cumbia romántica y ritmo tex-mex que se convirtió en fenómeno festivo internacional.",
        imagen: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80",
        popularidad: 98,
        esDueto: false,
        letra: ["Quédate otra vez, quédate toda la noche...", "Tan fácil que es enamorarme y tan difícil olvidarte...", "¡Ritmo norteño contagioso!"]
    },

    // --- KAROL G ---
    {
        id: 74,
        titulo: "Provenza",
        artista: "Karol G",
        genero: "Reguetón",
        categoria: "Reguetón",
        subcategoria: "Flow contemporáneo",
        duracion: "3:30",
        anio: 2022,
        descripcion: "Sonido fresco, veraniego y relajado que evoca reencuentros placenteros, brisa caribeña y coctelería nocturna.",
        imagen: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
        popularidad: 99,
        esDueto: false,
        letra: ["Baby qué más, hace rato que no sé nada de ti...", "Estaba con alguien pero ya estoy free...", "¡Vibra de playa y fiesta en Tulum!"]
    },
    {
        id: 75,
        titulo: "TQG",
        artista: "Karol G & Shakira",
        genero: "Reguetón",
        categoria: "Éxitos actuales",
        subcategoria: "Viral Global",
        duracion: "3:19",
        anio: 2023,
        descripcion: "Colaboración histórica de dos reinas colombianas de reguetón empoderado y versos lapidarios sobre superar el pasado.",
        imagen: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=80",
        popularidad: 99,
        esDueto: true,
        letra: ["Te fuiste diciendo que me superaste y te conseguiste nueva novia...", "Dile a tu nueva bebé que por hombres no compito...", "¡Fuego y empoderamiento en el escenario!"]
    },
    {
        id: 76,
        titulo: "Tusa",
        artista: "Karol G ft. Nicki Minaj",
        genero: "Reguetón",
        categoria: "Reguetón",
        subcategoria: "Tendencias club",
        duracion: "3:21",
        anio: 2019,
        descripcion: "El himno de fiesta que convirtió el desamor en una catarsis colectiva de baile entre amigas y copas de champaña.",
        imagen: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80",
        popularidad: 97,
        esDueto: true,
        letra: ["Pero si le ponen la canción, le da una depresión tonta...", "Llora y llama al ex, pero en la fiesta se olvida...", "¡Coro multitudinario en todo el lounge!"]
    },

    // --- BAD BUNNY ---
    {
        id: 77,
        titulo: "Tití Me Preguntó",
        artista: "Bad Bunny",
        genero: "Reguetón",
        categoria: "Reguetón",
        subcategoria: "Dembow caribeño",
        duracion: "4:03",
        anio: 2022,
        descripcion: "Dembow arrollador y humor caribeño sobre las relaciones múltiples y el estilo de vida nocturno sin frenos.",
        imagen: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80",
        popularidad: 100,
        esDueto: false,
        letra: ["Tití me preguntó si tengo muchas novias...", "Hoy tengo a una, mañana a otra, ey...", "¡El flow más pegadizo de Puerto Rico!"]
    },
    {
        id: 78,
        titulo: "Me Porto Bonito",
        artista: "Bad Bunny ft. Chencho Corleone",
        genero: "Reguetón",
        categoria: "Reguetón",
        subcategoria: "Old School Perreo",
        duracion: "2:58",
        anio: 2022,
        descripcion: "Perreo clásico y adictivo con melodía envolvente perfecto para subir la temperatura y el ritmo de la noche.",
        imagen: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=600&auto=format&fit=crop&q=80",
        popularidad: 98,
        esDueto: true,
        letra: ["En la guagua se quedó el olor de tu perfume...", "Tú no eres bebecita, tú eres bebezota...", "¡Perreo garantizado en la pista!"]
    },
    {
        id: 79,
        titulo: "Ojitos Lindos",
        artista: "Bad Bunny ft. Bomba Estéreo",
        genero: "Pop latino",
        categoria: "Éxitos actuales",
        subcategoria: "Top Tulum",
        duracion: "4:18",
        anio: 2022,
        descripcion: "Reguetón melódico y tierno con sonidos de la naturaleza y una vibra playera inconfundible inspirada en el Caribe.",
        imagen: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80",
        popularidad: 98,
        esDueto: true,
        letra: ["Y sólo mírame con esos ojitos lindos...", "Que con eso me basta para ser feliz...", "¡Suavidad y brisa marina en la Riviera!"]
    },

    // --- SELENA ---
    {
        id: 80,
        titulo: "Como La Flor",
        artista: "Selena",
        genero: "Cumbia",
        categoria: "Cumbia",
        subcategoria: "Cumbia texana",
        duracion: "3:02",
        anio: 1992,
        descripcion: "La flor que se marchitó; el himno tex-mex más emblemático de la historia cantado con sentimiento y orgullo.",
        imagen: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80",
        popularidad: 100,
        esDueto: false,
        letra: ["Como la flor, con tanto amor me diste tú, se marchitó...", "Me duele tanto, me duele tanto perderte...", "¡La Reina del Tex-Mex por siempre!"]
    },
    {
        id: 81,
        titulo: "Amor Prohibido",
        artista: "Selena",
        genero: "Cumbia",
        categoria: "Cumbia",
        subcategoria: "Cumbia romántica",
        duracion: "2:50",
        anio: 1994,
        descripcion: "La historia clásica del amor sincero entre dos jóvenes que desafía prejuicios sociales y habladurías de la gente.",
        imagen: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&auto=format&fit=crop&q=80",
        popularidad: 99,
        esDueto: false,
        letra: ["Amor prohibido murmuran por las calles...", "Porque somos de distintas sociedades...", "¡Inolvidable cumbia que une corazones!"]
    },
    {
        id: 82,
        titulo: "Si Una Vez",
        artista: "Selena",
        genero: "Cumbia",
        categoria: "Cumbia",
        subcategoria: "Cumbia texana",
        duracion: "2:45",
        anio: 1994,
        descripcion: "Cumbia ranchera de orgullo herido para gritar con fuerza y dignidad el arrepentimiento de haber amado a quien no valía.",
        imagen: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=80",
        popularidad: 97,
        esDueto: false,
        letra: ["Si una vez dije que te amaba hoy me arrepiento...", "Ese error fue una tontería...", "¡Grito liberador en el micrófono!"]
    },
    {
        id: 83,
        titulo: "Bidi Bidi Bom Bom",
        artista: "Selena",
        genero: "Pop latino",
        categoria: "Música de los 90",
        subcategoria: "Dance latino",
        duracion: "3:25",
        anio: 1994,
        descripcion: "Ritmo juguetón y alegre que describe con picardía los latidos acelerados del corazón ante el amor a primera vista.",
        imagen: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=600&auto=format&fit=crop&q=80",
        popularidad: 98,
        esDueto: false,
        letra: ["Cada vez que lo veo pasar mi corazón se pone a cantar...", "Bidi bidi bom bom, bidi bidi bom bom...", "¡Alegre, chispeante y luminosa!"]
    },

    // --- LOS ÁNGELES AZULES ---
    {
        id: 84,
        titulo: "17 Años",
        artista: "Los Ángeles Azules",
        genero: "Cumbia",
        categoria: "Cumbia",
        subcategoria: "Cumbia sonidera",
        duracion: "3:40",
        anio: 1999,
        descripcion: "La cumbia sonidera mexicana más famosa del mundo; infaltable en cualquier fiesta de Tulum y celebración alegre.",
        imagen: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80",
        popularidad: 100,
        esDueto: false,
        letra: ["Amigo sabes acabo de conocer a una mujer...", "Es callada, tímida, inocente... ¡y es el amor!", "¡Desde Iztapalapa para el mundo entero!"]
    },
    {
        id: 85,
        titulo: "Nunca Es Suficiente",
        artista: "Los Ángeles Azules ft. Natalia Lafourcade",
        genero: "Cumbia",
        categoria: "Cumbia",
        subcategoria: "Cumbia romántica",
        duracion: "4:27",
        anio: 2018,
        descripcion: "Mágica reinterpretación en cumbia sinfónica que fusiona melancolía pop y sabor sonidero con un magnetismo irrepetible.",
        imagen: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80",
        popularidad: 99,
        esDueto: true,
        letra: ["Nunca es suficiente para mí, porque siempre quiero más de ti...", "No sé qué hacer para que te des cuenta...", "¡Fusión deliciosa que todos bailan!"]
    },
    {
        id: 86,
        titulo: "Cómo Te Voy a Olvidar",
        artista: "Los Ángeles Azules",
        genero: "Cumbia",
        categoria: "Cumbia",
        subcategoria: "Cumbia sonidera",
        duracion: "4:12",
        anio: 1996,
        descripcion: "Acordeón romántico y ritmo cadencioso que atrapa desde el primer acorde en la pista y no deja a nadie quieto.",
        imagen: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600&auto=format&fit=crop&q=80",
        popularidad: 97,
        esDueto: false,
        letra: ["Amor, amor, amor, amor, amor, amor...", "Cómo te voy a olvidar si estás prendida en mi piel...", "¡El himno sonidero por excelencia!"]
    },

    // --- OTROS ARTISTAS POPULARES Y DUETOS ---
    {
        id: 87,
        titulo: "Colgando en tus manos",
        artista: "Carlos Baute ft. Marta Sánchez",
        genero: "Pop latino",
        categoria: "Duetos",
        subcategoria: "Dúos románticos",
        duracion: "3:58",
        anio: 2008,
        descripcion: "El dueto pop latino más exitoso de los 2000; tierno, cómplice e ideal para cantar en pareja mirando a los ojos.",
        imagen: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80",
        popularidad: 96,
        esDueto: true,
        letra: ["Te envío poemas de mi puño y letra...", "Te entrego mi corazón, cuidado pues que cuelga en tus manos...", "¡Química total en el escenario!"]
    },
    {
        id: 88,
        titulo: "De Música Ligera",
        artista: "Soda Stereo",
        genero: "Rock",
        categoria: "Rock",
        subcategoria: "Rock en español",
        duracion: "3:36",
        anio: 1990,
        descripcion: "El riff de guitarra más legendario del rock en español; un clímax asegurado que hace vibrar a todo el público.",
        imagen: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=600&auto=format&fit=crop&q=80",
        popularidad: 99,
        esDueto: false,
        letra: ["Ella durmió al calor de las masas...", "De aquel amor de música ligera, ¡nada nos libra, nada más queda!", "¡Gracias totales al rock latino!"]
    },
    {
        id: 89,
        titulo: "Lamento Boliviano",
        artista: "Enanitos Verdes",
        genero: "Rock",
        categoria: "Rock",
        subcategoria: "Himnos de estadio",
        duracion: "3:42",
        anio: 1994,
        descripcion: "Clásico infaltable de la medianoche; una explosión de energía, catarsis y coros cantados a viva voz con amigos.",
        imagen: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=600&auto=format&fit=crop&q=80",
        popularidad: 99,
        esDueto: false,
        letra: ["Me quieren agitar, me incitan a gritar...", "Y estoy aquí, borracho y loco, y mi corazón idiota siempre brillará...", "¡Grito roquero legendario!"]
    },
    {
        id: 90,
        titulo: "Devuélveme a mi Chica",
        artista: "Hombres G",
        genero: "Rock Pop",
        categoria: "Música de los 80",
        subcategoria: "Rock 80s",
        duracion: "3:15",
        anio: 1985,
        descripcion: "Juventud ochentera, despecho cómico y desahogo con 'polvos pica-pica' que cualquier generación canta sin dudar.",
        imagen: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80",
        popularidad: 97,
        esDueto: false,
        letra: ["Estoy llorando en mi habitación, todo se nubla a mi alrededor...", "Sufre mamón, devuélveme a mi chica o te retorcerás...", "¡Pura diversión ochentera!"]
    },
    {
        id: 91,
        titulo: "Livin' on a Prayer",
        artista: "Bon Jovi",
        genero: "Rock",
        categoria: "Música de los 80",
        subcategoria: "Rock 80s",
        duracion: "4:10",
        anio: 1986,
        descripcion: "El himno inmortal del hard rock ochentero con talk box y estribillo épico para soltar la voz con pura pasión.",
        imagen: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=600&auto=format&fit=crop&q=80",
        popularidad: 98,
        esDueto: false,
        letra: ["Tommy used to work on the docks...", "Woah, we're halfway there! Woah, livin' on a prayer!", "¡Potencia roquera internacional!"]
    }
];

// Reservas iniciales de demostración
const SEED_RESERVATIONS = [
    {
        id: "RES-9821",
        codigo: "KT-9821",
        nombre: "Alejandra Peralta",
        telefono: "71234567",
        fecha: "2026-11-20",
        hora: "21:00",
        personas: 6,
        sala: "VIP 3 - Lounge Tulum",
        observaciones: "Celebración especial de cumpleaños, champaña de cortesía.",
        estado: "Confirmada",
        creadoEl: "2026-11-12T19:30:00.000Z"
    },
    {
        id: "RES-4587",
        codigo: "KT-4587",
        nombre: "Carlos Mendoza",
        telefono: "76543210",
        fecha: "2026-11-22",
        hora: "22:30",
        personas: 10,
        sala: "VIP 1 - Cenote Cristal",
        observaciones: "Reunión de amigos con servicio de mixología de autor.",
        estado: "Confirmada",
        creadoEl: "2026-11-13T14:15:00.000Z"
    },
    {
        id: "RES-1123",
        codigo: "KT-1123",
        nombre: "Mariana Rivera",
        telefono: "70011223",
        fecha: "2026-11-18",
        hora: "20:00",
        personas: 4,
        sala: "VIP 2 - Penthouse Acústico",
        observaciones: "Reserva de prueba inicial.",
        estado: "Cancelada",
        creadoEl: "2026-11-10T11:00:00.000Z"
    }
];

// Objeto de Configuración por defecto
const DEFAULT_SETTINGS = {
    modoOscuro: true,
    efectosSonido: true,
    volumenKaraoke: 85,
    notificaciones: true,
    microfonoSensibilidad: 75,
    idioma: "es"
};

// Usuario Demostrativo
const DEFAULT_USER = {
    nombre: "Huésped VIP Tulum",
    email: "vip@karaoketulum.bo",
    telefono: "+591 71234567",
    avatar: "assets/icons/mic-tulum.svg",
    rol: "Administrador Lounge VIP"
};

/**
 * Gestor Central de Almacenamiento Local (StorageManager)
 */
class StorageManager {
    constructor() {
        this.init();
    }

    init() {
        try {
            const currentSongs = this.get(STORAGE_KEYS.SONGS, []);
            // Si la versión no coincide o hay menos de 60 canciones o no tienen descripción, sembrar datos completos
            if (!localStorage.getItem(STORAGE_KEYS.INITIALIZED) || currentSongs.length < 60 || !currentSongs[0]?.descripcion) {
                this.seedInitialData();
            }
        } catch (error) {
            console.error('[KARAOKE TULUM] Error al inicializar LocalStorage:', error);
        }
    }

    seedInitialData() {
        console.log('[KARAOKE TULUM] Sembrando catálogo ampliado (85+ canciones y 14 categorías)...');
        this.set(STORAGE_KEYS.CATEGORIES, SEED_CATEGORIES);
        this.set(STORAGE_KEYS.ARTISTS, SEED_ARTISTS);
        this.set(STORAGE_KEYS.SONGS, SEED_SONGS);
        this.set(STORAGE_KEYS.FAVORITES, [1, 5, 14, 27, 32, 69, 72, 80, 84, 88]); // Canciones favoritas destacadas
        this.set(STORAGE_KEYS.RESERVATIONS, SEED_RESERVATIONS);
        this.set(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
        this.set(STORAGE_KEYS.USER, DEFAULT_USER);
        
        // Bitácora de inicialización
        const initialLogs = [
            {
                id: Date.now() - 3600000,
                fecha: new Date(Date.now() - 3600000).toLocaleDateString(),
                hora: new Date(Date.now() - 3600000).toLocaleTimeString(),
                usuario: "Sistema",
                accion: "Catálogo Premium",
                modulo: "Sistema",
                descripcion: "Catálogo ampliado con 91 canciones maestras, descripciones originales y 14 categorías activas.",
                resultado: "Exitoso"
            }
        ];
        this.set(STORAGE_KEYS.LOGS, initialLogs);
        this.set(STORAGE_KEYS.INITIALIZED, 'true');
    }

    get(key, defaultValue = null) {
        try {
            const raw = localStorage.getItem(key);
            if (raw === null || raw === undefined) return defaultValue;
            return JSON.parse(raw);
        } catch (e) {
            console.warn(`[KARAOKE TULUM] Falló lectura de ${key}:`, e);
            return defaultValue;
        }
    }

    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error(`[KARAOKE TULUM] Falló guardado de ${key}:`, e);
            return false;
        }
    }

    remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error(`[KARAOKE TULUM] Falló borrado de ${key}:`, e);
            return false;
        }
    }

    resetAll() {
        try {
            localStorage.clear();
            this.seedInitialData();
            return true;
        } catch (e) {
            console.error('[KARAOKE TULUM] Error al restablecer datos:', e);
            return false;
        }
    }
}

// Exportación global en ventana para compatibilidad pura ES6/jQuery
window.STORAGE_KEYS = STORAGE_KEYS;
window.SEED_ARTISTS = SEED_ARTISTS;
window.storage = new StorageManager();
