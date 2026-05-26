export type Producto = {
  id: string;
  nombre: string;
  marca: string;
  nutriscore: string;
  ecoscore: string;
  image?: any;
  nova?: string;
  ingredientes?: string;
  alergenos?: string;
  nutricion?: {
    energia: string;
    grasa: string;
    saturadas: string;
    carbohidratos: string;
    azucares: string;
    fibra: string;
    proteina: string;
    sal: string;
  };
};

export const productos: Producto[] = [
  {
    id: "organic-cold-pressed",
    nombre: "Organic Cold Pressed Kale & Ginger ",
    marca: "GREEN GARDEN CO.",
    nutriscore: "A",
    ecoscore: "A+",
    image: require("../../assets/images/productos/item1.jpg"),
  },
  {
    id: "artisan-botanical",
    nombre: "Artisan Sparklin Botanical Mist",
    marca: "MIST & FLORA",
    nutriscore: "C",
    ecoscore: "B",
  },
  {
    id: "wild-berry-kombucha",
    nombre: "Wild Berry Raw Kombucha",
    marca: "THE FERMENTARY",
    nutriscore: "B",
    ecoscore: "A",
    image: require("../../assets/images/productos/item3.jpg"),
  },
  {
    id:  "coconut-water",
    nombre: "Pure Philippine Coconut Water",
    marca: "ISLA VIDA",
    nutriscore: "A",
    ecoscore: "B+",
    image: require("../../assets/images/productos/item4.jpg"),
  },
  {
    id: "volcanic-seltzer",
    nombre: "High-Mineral Volcanic Seltzer",
    marca: "SUMMIT SPRINGS",
    nutriscore: "A",
    ecoscore: "A",
    image: require("../../assets/images/productos/item5.jpg"),
  },
  {
    id: "oat-milk",
    nombre: "The Original Oatly Oat Milk",
    marca: "OATLY",
    nutriscore: "A",
    ecoscore: "A+",
    image: require("../../assets/images/oat-milk.png"),
    ingredientes:
    "Water, Oats (10%), Rapeseed oil, Minerals (Calcium Carbonate, Potassium  iodide), Salt, Vitamins (D2, Riboflavin, B12).",
  alergenos:
    "Contains gluten (oats). Dairy-free and soy-free.",
  nutricion: {
    energia: "46 kcal / 193 kJ",
    grasa: "1.5g",
    saturadas: "0.2g",
    carbohidratos: "6.7g",
    azucares: "4.1g",
    fibra: "0.8g",
    proteina: "1.0g",
    sal: "0.10g",
  },
  },
];
