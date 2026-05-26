export type Marca = {
  id: string;
  name: string;
  displayName: string;
  image?: any;
};

export const marcas: Marca[] = [
  { id: "nestle", name: "nestle", displayName: "NESTLÉ", image: require("../../assets/images/logos/nestle.png") },
  { id: "coca-cola", name: "coca-cola", displayName: "COKE" , image: require("../../assets/images/logos/coca-cola.png")},
  { id: "pepsi", name: "pepsi", displayName: "PEPSI", image: require("../../assets/images/logos/pepsi.jpg") },
  { id: "danone", name: "danone", displayName: "DANONE", image: require("../../assets/images/logos/danone.png") },
  { id: "kellogs", name: "kellogs", displayName: "KELLOGS", image: require("../../assets/images/logos/kellogs.png") },
  { id: "unilever", name: "unilever", displayName: "UNILEVER", image: require("../../assets/images/logos/unilever.png") },
  { id: "mondelez", name: "mondelez", displayName: "MONDELEZ", image: require("../../assets/images/logos/mondelez.png") },
  { id: "mars", name: "mars", displayName: "MARS", image: require("../../assets/images/logos/mars.png") },
  { id: "ferrero", name: "ferrero", displayName: "FERRERO", image: require("../../assets/images/logos/ferrero.jpg") },
  { id: "lactalis", name: "lactalis", displayName: "LACTALIS", image: require("../../assets/images/logos/lactalis.png") },
];
