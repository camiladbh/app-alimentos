import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View, Image} from "react-native";

import { Categoria, categorias } from "../../src/data/categorias";
import { etiqueta } from "../../src/data/etiquetas";
import { marcas } from "../../src/data/marcas";

function CategoriaCard({ item }: { item: Categoria }) {
  const router = useRouter();

  return (
    <Pressable
      style={styles.categoriaWrapper}
      onPress={() =>
        router.push({
          pathname: "/categoria/[nombre]",
          params: { nombre: item.id },
        })
      }
    >
      <LinearGradient  colors={item.gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.5, y: 0.5 }}
        style={styles.categoriaCard}
      >
        <Text style={styles.categoriaText}>{item.nombre}</Text>
      </LinearGradient>
    </Pressable>
  );
}
function Etiqueta({ text }: { text: string }) {
  return (
    <View style={styles.etiqueta}>
      <Text style={styles.etiquetaText}>{text}</Text>
    </View>
  );
}
function MarcaCard({ name, displayName, image }: { name: string; displayName: string; image?: any }) {
  return (
    <View style={styles.marcaCard}>
      <View style={styles.marcaCircle}>
        {image ? (
          <Image source={image} style={styles.marcaImage} />
        ) : (
          <Text style={styles.marcaCircleText}>{displayName}</Text>
        )}
      </View>
      <Text style={styles.marcaName}>{name}</Text>
    </View>
  );
}

export default function IndexScreen() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* ENCABEZADO DE LA PÁGINA */}
        <View style={styles.header}>
          <Ionicons name="menu" size={22} color="#004D24" />
          <Text style={styles.logo}>Digital Epicurean</Text>
          <Ionicons name="person-circle-outline" size={22} color="#004D24" />
        </View>

        <Text style={styles.subtitle}>CURATED FLAVORS</Text>

        <Text style={styles.title}>
          The art of <Text style={styles.greenItalic}>conscious</Text> {"\n"}discovery.</Text>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <Text style={styles.viewLibrary}>View Library</Text>
        </View> 
        
        <FlatList
          data={categorias}
          renderItem={({ item }) => <CategoriaCard item={item} />}
          keyExtractor={(item) => item.id}
          numColumns={2}
          scrollEnabled={false}
          columnWrapperStyle={styles.categoryRow}
        />

        <Text style={[styles.sectionTitle, styles.tasteTitle]}>
          Refine by Taste
        </Text>

        <View style={styles.etiquetasContainer}>
          {etiqueta.map((item) => (
            <Etiqueta key={item} text={item} />
          ))}
        </View>

        <Text style={[styles.sectionTitle, styles.marcaTitle]}>
          Global Brands
        </Text>
        <Text style={styles.marcaSubtitle}>
          Explored through the lens of quality.
        </Text>

        <View style={styles.marcaGrid}>
          {marcas.map((item) => (
            <MarcaCard
              key={item.id}
              name={item.name}
              displayName={item.displayName}
              image={item.image}
            />
          ))}
        </View>
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  container: {
    paddingHorizontal: 25,
    paddingBottom: 100,
  },
  header: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    fontSize: 20,
    fontWeight: "700",
    color: "#003E1F",
  },
  subtitle: {
    marginTop: 14,
    fontSize: 12,
    letterSpacing: 2,
    color: "#004D24",
  },
  title: {
    marginTop: 8,
    fontSize: 31,
    fontWeight: "700",
    color: "#111",
    lineHeight: 35,
  },
  greenItalic: {
    color: "#007A33",
    fontStyle: "italic",
  },
  sectionHeader: {
    marginTop: 30,
    marginBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 21,
    fontWeight: "500",
    color: "#111",
  },
  viewLibrary: {
    fontSize: 13,
    color: "#004D24",
  },
  categoryRow: {
    gap: 13,
    marginBottom: 12,
  },
  categoriaWrapper: {
    flex: 1,
  },
  categoriaCard: {
    height: 185,
    width: "98%",
    borderRadius: 15,
    padding: 15,
    justifyContent: "flex-end",
  },
  categoriaText: {
    color: "white",
    fontSize: 15,
    fontWeight: "700",
  },
  tasteTitle: {
    fontSize: 21,
    marginTop: 30,
  },
  etiquetasContainer: {
    marginTop: 14,
    marginBottom: 14,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  etiqueta: {
    backgroundColor: "#CDEFC9",
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  etiquetaText: {
    color: "#3A7B3F",
    fontSize: 12,
    fontWeight: "500",
  },
  marcaTitle: {
    fontSize: 21,
    marginTop: 34,
  },
  marcaSubtitle: {
    marginTop: 4,
    fontSize: 13,
    color: "#747474",
  },
  marcaGrid: {
    marginTop: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
  },
  marcaCard: {
    width: "47%",
    height: 125,
    backgroundColor: "#F1F1F1",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  marcaCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  marcaCircleText: {
    fontSize: 11,
    color: "#1D4ED8",
    textAlign: "center",
  },
  marcaImage:{
    width: 44,
    height: 44,
    resizeMode: "contain"
  },
  marcaName: {
    fontSize: 13,
    color: "#111",
  },
});
