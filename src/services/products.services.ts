import { getProduct } from "./product-detail.services";

export interface Product {
  code: string;
  product_name: string;
  brands: string;
  image_url: string;
  nutriscore_grade: string;
  ecoscore_grade: string;
}

export interface ProductSearchResponse {
  count: number;
  page: number;
  page_size: number;
  products: Product[];
}

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;



export async function searchProductsByCategory(
  categoria: string,
  page: number = 1,
): Promise<ProductSearchResponse> {

  const params = new URLSearchParams({
    categories_tags: categoria,
    page_size: "10",
    page: String(page),
    fields:
      "code,product_name,brands,image_url,nutriscore_grade,ecoscore_grade",
  });

  const response = await fetch(
    `${BASE_URL}/v2/search?${params.toString()}`,
    {
      headers: {
        "User-Agent": "UNTDF TNT 2026",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Error HTTP ${response.status}`);
  }

  return await response.json();
}

export async function searchProductsByBrand(
  marca: string,
  page: number = 1,
): Promise<ProductSearchResponse> {

  const params = new URLSearchParams({
    brands_tags: marca,
    page_size: "10",
    page: String(page),
    fields:
      "code,product_name,brands,image_url,nutriscore_grade,ecoscore_grade",
  });

  const response = await fetch(
    `${BASE_URL}/v2/search?${params.toString()}`,
    {
      headers: {
        "User-Agent": "UNTDF TNT 2026",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Error HTTP ${response.status}`);
  }

  return await response.json();
}

export async function searchProductsByLabel(
  etiqueta: string,
  page: number = 1,
): Promise<ProductSearchResponse> {

  const params = new URLSearchParams({
    labels_tags: etiqueta,
    page_size: "10",
    page: String(page),
    fields:
      "code,product_name,brands,image_url,nutriscore_grade,ecoscore_grade",
  });

  const response = await fetch(
    `${BASE_URL}/v2/search?${params.toString()}`,
    {
      headers: {
        "User-Agent": "UNTDF TNT 2026",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Error HTTP ${response.status}`);
  }

  return await response.json();
}

export async function searchProducts(
  texto: string,
  page: number = 1,
): Promise<ProductSearchResponse> {
  // Si son solo números, es un código de barras
  if (/^\d+$/.test(texto)) {
    const producto = await getProduct(texto);

    return {
      count: 1,
      page: 1,
      page_size: 1,
      products: [
        {
          code: producto.code,
          product_name: producto.product_name,
          brands: producto.brands ?? "",
          image_url: producto.image_url ?? "",
          nutriscore_grade: producto.nutriscore_grade ?? "",
          ecoscore_grade: producto.ecoscore_grade ?? "",
        },
      ],
    };
  }
  // Marca
  try {
    const r = await searchProductsByBrand(texto, page);
    if (r.products.length > 0) return r;
  } catch {}

  // Categoría
  try {
    const r = await searchProductsByCategory(texto, page);
    if (r.products.length > 0) return r;
  } catch {}

  // Etiqueta
  try {
    const r = await searchProductsByLabel(texto, page);
    if (r.products.length > 0) return r;
  } catch {}

  return {
    count: 0,
    page,
    page_size: 10,
    products: [],
  };
}