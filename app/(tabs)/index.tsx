import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {  ScrollView, StyleSheet, Text, View} from "react-native";


import HomeSection from "../../src/components/HomeSection";
import CategoriasList from "../../src/components/home/CategoriasList";
import EtiquetasList from "../../src/components/home/EtiquetasList";
import MarcasList from "../../src/components/home/MarcasList";


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

        <HomeSection titulo="Categories" accion="View Library">
          <CategoriasList />
        </HomeSection>

        <HomeSection titulo="Refine by Taste">
          <EtiquetasList />
        </HomeSection>

        <HomeSection titulo="Global Brands" subtitulo="Explored through the lens of quality.">
          <MarcasList />
        </HomeSection>
        
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
  
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  categoryRow: {
    gap: 13,
    marginBottom: 12,
  },
  categoriaWrapper: {
    //flex: 1,
    width: "48%",
    marginBottom: 12,
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
