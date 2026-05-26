export const ROUTES = {
  HOME: "/",
  CATEGORIA: "/categoria/[nombre]",
  MARCA: "/marca/[nombre]",
  ETIQUETA: "/etiqueta/[nombre]",
  FICHA: "/ficha/[id]",
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
