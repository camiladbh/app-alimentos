export type Categoria = {
  id: string;
  nombre: string;
  gradientColors: [string, string, ...string[]];
};

export const categorias: Categoria[] = [
  { id: "beverages", nombre: "beverages", gradientColors: ["#3B82F6", "#1D4ED8"]},
  { id: "dairies", nombre: "dairies", gradientColors: ["#FDE047", "#F59E0B"] },
  { id: "snacks", nombre: "snacks", gradientColors: ["#EC4899", "#F472B6"]},
  { id: "breakfasts", nombre: "breakfasts", gradientColors: ["#F97316", "#FB923C"]},
  { id: "desserts", nombre: "desserts", gradientColors: ["#8B5CF6", "#A78BFA"]},
  { id: "chocolates", nombre: "chocolates", gradientColors: ["#374151", "#6B7280"]},
  { id: "biscuits-and-cakes", nombre: "biscuits-and-cakes", gradientColors: ["#B45309", "#D97706"]},
  { id: "cereals-and-potatoes", nombre: "cereals-and-potatoes", gradientColors: ["#10B981", "#34D399"]},
  { id: "meals", nombre: "meals", gradientColors: ["#DC2626", "#FCA5A5"] },
  { id: "plant-based-foods", nombre: "plant-based-foods", gradientColors: ["#22C55E", "#86EFAC"]},
];
