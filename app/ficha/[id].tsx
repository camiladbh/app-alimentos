import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View, TouchableOpacity} from "react-native";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { getProduct, ProductDetail } from "../../src/services/product-detail.services";

export default function FichaScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [producto, setProducto] = useState<ProductDetail | null>(null);

  useEffect(() => {
    async function cargarProducto() {
      try {
        const producto = await getProduct(String(id));
        setProducto(producto);
      } catch (error) {
        console.error(error);
      }
    }

    if (id) {
      cargarProducto();
    }
  }, [id]);

  if (!producto) {
    return (
      <View style={styles.center}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  function ScoreCard({
    label,
    value,
    color,
  }: {
    label: string;
    value?: string;
    color: string;
  }) {
    return (
      <View style={styles.scoreCard}>
        <Text style={styles.scoreLabel}>{label}</Text>
        <View style={[styles.scoreBadge, { backgroundColor: color }]}>
          <Text style={styles.scoreBadgeText}>{value}</Text>
        </View>
      </View>
    );
  }

  function NutrientBox({ label, value }: { label: string; value?: string }) {
    return (
      <View style={styles.nutrientBox}>
        <Text style={styles.nutrientLabel}>{label}</Text>
        <Text style={styles.nutrientValue}>{value}</Text>
      </View>
    );
  }
  function NutritionRow({ label, value }: { label: string; value?: string }) {
  return (
    <View style={styles.tableRow}>
      <Text style={styles.tableLabel}>{label}</Text>
      <Text style={styles.tableValue}>{value}</Text>
    </View>
  );
}

  function NutritionSubRow({ label, value }: { label: string; value?: string }) {
    return (
      <View style={styles.tableSubRow}>
        <Text style={styles.tableSubLabel}>{label}</Text>
        <Text style={styles.tableSubValue}>{value}</Text>
      </View>
    );
  }
  const ecoScore =
    producto.ecoscore_grade &&
    producto.ecoscore_grade !== "not-applicable"
      ? producto.ecoscore_grade.toUpperCase()
      : "-";
  const nutriScore =
    producto.nutriscore_grade &&
    producto.nutriscore_grade !== "unknown"
      ? producto.nutriscore_grade.toUpperCase()
      : "-";

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#004D24" />
        </Pressable>

        <Text style={styles.logo}>Digital Epicurean</Text>

        <Ionicons name="share-social" size={24} color="#004D24" />
      </View>

      <View style={styles.imageBox}>
        {producto.image_url ? (
          <Image
            source={{ uri: producto.image_url }}
            style={styles.image}
            contentFit="contain"
            transition={200}
          />
        ) : (
          <Ionicons name="image-outline" size={80} color="#D1D5DB" />
        )}
      </View>
        
      <View style={styles.productInfoCard}>
        <TouchableOpacity style={styles.heartFavButton} activeOpacity={0.8}>
          <FontAwesome name="heart" size={22} color="#1D8248" />
        </TouchableOpacity>

        <Text style={styles.brand}>{producto.brands}</Text>
        <Text style={styles.title}>{producto.product_name}</Text>

        <View style={styles.scoresRow}>
          <ScoreCard label={"NUTRI-\nSCORE"} value={nutriScore} color="#0A6C34" />
          {/*<ScoreCard label={"NOVA\nGROUP"} value={producto.nova ?? "1"} color="#F59E0B" />*/}
          
          <ScoreCard label={"ECO-\nSCORE"} value={ecoScore} color="#0A6C34" />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.nutrientsScroll}
        >
          <NutrientBox label="ENERGY" value={ producto.nutriments?.energy_100g != null? `${producto.nutriments.energy_100g} kJ`: "-"  } />
          <NutrientBox label="FAT" value={ producto.nutriments?.fat_100g != null? `${producto.nutriments.fat_100g} g`: "-"} />
          <NutrientBox label="PROTEIN" value={ producto.nutriments?.proteins_100g != null ? `${producto.nutriments.proteins_100g} g`: "-" } />
          <NutrientBox label="SALT" value={ producto.nutriments?.salt_100g != null? `${producto.nutriments.salt_100g} g`: "-"} />
        </ScrollView>
      </View>

      <View style={styles.sectionIngredients}>
         <View style={styles.ingredientsHeader}>
          <FontAwesome name="cutlery" size={18} color="#1D8248" />

          <Text style={styles.sectionTitle}>
            Ingredients
          </Text>
        </View>
        <Text style={styles.paragraph}>
            {producto.ingredients_text?.trim()
            ? producto.ingredients_text
            : "⚠ No information available"}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nutritional Values (per 100ml)</Text>

          <NutritionRow label="Energy"  value={ producto.nutriments?.energy_100g != null ? `${producto.nutriments.energy_100g} kJ`: "-"} />
          <NutritionRow label="Fat" value={producto.nutriments?.fat_100g != null ? `${producto.nutriments.fat_100g} g`: "-"} />
          <NutritionSubRow label="— of which saturates" value={producto.nutriments?.saturated_fat_100g != null ? `${producto.nutriments.saturated_fat_100g} g`: "-"} />
          <NutritionRow label="Carbohydrate" value={producto.nutriments?.carbohydrates_100g != null ? `${producto.nutriments.carbohydrates_100g} g`: "-"} />
          <NutritionSubRow label="— of which sugars" value={producto.nutriments?.sugars_100g != null ? `${producto.nutriments.sugars_100g} g`: "-"} />
          <NutritionRow label="Fibre" value={producto.nutriments?.fiber_100g != null ? `${producto.nutriments.fiber_100g} g`: "-"} />
          <NutritionRow label="Protein" value={producto.nutriments?.proteins_100g != null ? `${producto.nutriments.proteins_100g} g`: "-"} />
          <NutritionRow label="Salt" value={producto.nutriments?.salt_100g != null ? `${producto.nutriments.salt_100g} g`: "-"} />
      </View>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  container: {
  backgroundColor: "#F3F4F6",
  paddingBottom: 120,
},
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    fontSize: 19,
    fontWeight: "700",
    color: "#004D24",
  },
  imageBox: {
    height: 400,
    backgroundColor: '#F26E55',
    alignItems: "center",
    position: "relative",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 24,
  },
  image: {
    width: "100%",
    height: "100%",
    //marginTop: 20,
    resizeMode: "contain",
  },
  productInfoCard: {
    backgroundColor: "white",
    borderRadius: 28,
    marginHorizontal: 28,
    padding: 28,
    marginTop: -47,
    position: "relative",
  },
  heartFavButton: {
    position: "absolute",
    right: 7,
    top: -32,
    width: 58,
    height: 58,
    borderRadius: 28,
    elevation: 10, 
    backgroundColor: "rgba(255, 255, 255, 0.75)",
    alignItems: "center",
    justifyContent: "center",
  },
  brand: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "700",
    letterSpacing: 1,
  },
  title: {
    marginTop: 8,
    fontSize: 30,
    fontWeight: "800",
    color: "#1b1b1b",
    lineHeight: 36,
  },
  scoresRow: {
  flexDirection: "row",
  gap: 10,
  marginTop: 24,
  },

  scoreCard: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 6,
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 92,
  },
  scoreLabel: {
    fontSize: 10,
    color: "#494848",
    fontWeight: "800",
    textAlign: "center",
    lineHeight: 13,
    minHeight: 28,
  },

  scoreBadge: {
    marginTop: 8,
    width: 38,
    height: 38,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  

  
  scoreBadgeText: {
    color: "white",
    fontSize: 18,
    fontWeight: "800",
  },
  nutrientsScroll: {
    marginTop: 28,
  },
  nutrientBox: {
    backgroundColor: "#C9E8C0",
    width: 88,
    height: 58,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },

nutrientLabel: {
  fontSize: 10,
  color: "#416B3E",
  marginBottom: 3,
  textAlign: "center",
},

nutrientValue: {
  fontSize: 14,
  color: "#416B3E",
  fontWeight: "600",
  textAlign: "center",
},
  section: {
    marginTop: 28,
    marginHorizontal: 28,
    backgroundColor: "white",
    borderRadius: 18,
    padding: 18,
  },
  sectionIngredients:{
    marginTop: 28,
    marginHorizontal: 28,
    backgroundColor: "#e7ebf1",
    borderRadius: 18,
    padding: 18,
  },
  ingredientsHeader: {
  flexDirection: "row",
  alignItems: "center",
  gap: 10,
  marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: "#1b1b1b",
    marginBottom: 7,
  },
  paragraph: {
    fontSize: 15,
    color: "#555",
    lineHeight: 22,
  },
  tableRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EFEFEF",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tableLabel: {
    fontSize: 15,
    color: "#494848",
  },
  tableValue: {
    fontSize: 15,
    color: "#1b1b1b",
    fontWeight: "700",
  },
  tableSubRow: {
  paddingVertical: 12,
  paddingLeft: 18,
  borderBottomWidth: 1,
  borderBottomColor: "#EFEFEF",
  flexDirection: "row",
  justifyContent: "space-between",
},
tableSubLabel: {
  fontSize: 13,
  color: "#777",
  fontStyle: "italic",
},
tableSubValue: {
  fontSize: 13,
  color: "#111",
},

});