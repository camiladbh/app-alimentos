const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export interface ProductDetailResponse {
    product: ProductDetail;
}

export interface ProductDetail {
    code: string;
    product_name: string;
    brands?: string;
    image_url?: string;
    nutriscore_grade?: string;
    ecoscore_grade?: string;
    ingredients_text?: string;
    nutriments?: {
        energy_100g?: number;
        fat_100g?: number;
        carbohydrates_100g?: number;
        proteins_100g?: number;
        salt_100g?: number;
        sugars_100g?: number;
        fiber_100g?: number;
        saturated_fat_100g?: number;
    };
}

export async function getProduct(code: string) {
     const url = `${BASE_URL}/v2/product/${code}`;
    console.log(url);
    const response = await fetch(
        `${BASE_URL}/v2/product/${code}`,
        {
        headers: {
            "User-Agent": "UNTDF TNT 2026",
        },
        }
    );

    if (!response.ok) {
        throw new Error("No se pudo obtener el producto");
    }

    return (await response.json()) as ProductDetailResponse;
}