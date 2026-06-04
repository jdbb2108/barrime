export type MediaType = "video" | "photo";

export interface MediaItem {
  id: string;
  type: MediaType;
  src: string;
  cover?: string;
  title: string;
  caption: string;
  category: string;
}

export const mediaItems: MediaItem[] = [

  // ── Fotos ──────────────────────────────────────────────────────────────

  {
    id: "f1",
    type: "photo",
    src: "/media/foto2.jpg",
    title: "Donde nació Ribuzz",
    caption: "En este programa de Georgia Tech surgió la primera idea de lo que hoy es Ribuzz. Sigo construyéndola.",
    category: "proyectos",
  },
  {
    id: "f2",
    type: "photo",
    src: "/media/foto5.jpg",
    title: "Capital Semilla",
    caption: "Una de esas noches que no se olvidan. Ganar no era el punto — era demostrar que era posible.",
    category: "proyectos",
  },
  {
    id: "f3",
    type: "photo",
    src: "/media/foto4.jpg",
    title: "Con mi mamá",
    caption: "Ella estuvo ahí desde antes de que esto tuviera nombre.",
    category: "vida",
  },
  {
    id: "f4",
    type: "photo",
    src: "/media/foto6.png",
    title: "Con el equipo",
    caption: "Las mejores conversaciones pasan cuando no hay agenda.",
    category: "vida",
  },
  {
    id: "f5",
    type: "photo",
    src: "/media/foto1.webp",
    title: "Concierto de Quevedo",
    caption: "Una noche viendo a Quevedo, mi artista favorito. De esos planes donde también se entiende mucho de mí.",
    category: "vida",
  },
  {
    id: "f6",
    type: "photo",
    src: "/media/foto7.jpg",
    title: "Vacaciones de incertidumbre",
    caption: "Me dijeron que disfrutara la vida porque no sabían qué iba a pasar con mi salud. Aun así, intenté ver lo mejor en todo y caminarlo de la mano de Dios.",
    category: "vida",
  },
  {
    id: "f7",
    type: "photo",
    src: "/media/foto3.jpg",
    title: "En mi espacio",
    caption: "Aquí es donde pasan la mayoría de las ideas.",
    category: "vida",
  },
  {
    id: "f8",
    type: "photo",
    src: "/media/foto8.jpg",
    title: "Incluso ahí",
    caption: "Pasando por el proceso de descubrimiento de una masa retroperitoneal. Fue donde entendí que no nos podemos quedar con la duda de nada.",
    category: "vida",
  },

  // ── Videos ─────────────────────────────────────────────────────────────

  {
    id: "v3",
    type: "video",
    src: "/media/video3.mp4",
    cover: "/media/cover3.jpg",
    title: "La canción que me sostiene",
    caption: "Una de mis favoritas. La pongo cuando los momentos se ponen difíciles y necesito sentir que no estoy solo.",
    category: "vida",
  },
  {
    id: "v5",
    type: "video",
    src: "/media/video5.mp4",
    cover: "/media/cover5.jpg",
    title: "El tipo de mujer que un hombre debería buscar",
    caption: "Algo en lo que pienso con claridad. No es una lista de características — es una forma de entender la conexión.",
    category: "vida",
  },
  {
    id: "v6",
    type: "video",
    src: "/media/video6.mp4",
    cover: "/media/cover6.jpg",
    title: "1 millón de sueños",
    caption: "Quiero hacer 1 millón de sueños realidad. Eso no es hipérbole — es la razón por la que me levanto.",
    category: "proyectos",
  },
];

export const CATEGORIES = ["todos", "proyectos", "vida"] as const;
export type Category = typeof CATEGORIES[number];
