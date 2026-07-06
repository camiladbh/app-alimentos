const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export async function getCategories(query: string = "") {
  
  const params = new URLSearchParams({
    tagtype: "categories",
    lc: "es",
    string: query,
    limit: "20",
  });
  
  console.log(BASE_URL);
  const url = `${BASE_URL}/v3/taxonomy_suggestions?${params.toString()}`;

  console.log(url);

  const response = await fetch(url, {
  headers: {
    "User-Agent": "UNTDF TNT 2026",
  },
  });

  if (!response.ok) {
    throw new Error(`Error HTTP: ${response.status}`);
  }

  const data = await response.json();

  return data.suggestions;
}