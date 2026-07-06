export interface Product {
  code: string;
  product_name: string;
  brands: string;
  image_url: string;
  nutriscore_grade: string;
  ecoscore_grade: string;
}

export interface ProductSearchResponse {
  products: Product[];
}
const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export async function searchProducts(categoria: string) {
  const params = new URLSearchParams({
  categories_tags: categoria,
  page: "1",
  page_size: "10",
  fields:
    "code,product_name,brands,image_url,nutriscore_grade,ecoscore_grade",
});
  const url = `${BASE_URL}/v2/search?${params.toString()}`;

  const response = await fetch(url, {
    headers: {
      "User-Agent": "UNTDF TNT 2026",
    },
  });

  if (!response.ok) {
    throw new Error(`Error HTTP ${response.status}`);
  }

  return (await response.json()) as ProductSearchResponse;
}