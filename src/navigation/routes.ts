import { Href } from "../../.expo/types/router";

export const ROUTES = {
  HOME: "/",
  BUSCAR: "/buscar",
  CAMARA: "/camara",

  CATEGORIA: "/categoria/[nombre]",
  MARCA: "/marca/[nombre]",
  ETIQUETA: "/etiqueta/[nombre]",
  FICHA: "/ficha/[id]",
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];

type RouteParams = Record<string, string | number | boolean | undefined>;

export function buildRoute(
  route: AppRoute,
  params?: RouteParams,
): Href {
  if (!params) {
    return route as Href;
  }

  return {
    pathname: route,
    params,
  } as Href;
}
