import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {View, Text, TextInput, StyleSheet, FlatList, Pressable} from "react-native";

import { Product, searchProducts,} from "../../src/services/products.services";
import { useRouter } from "expo-router";
import ProductoCard from "../../src/components/ProductoCard";


export default function BuscarScreen() {
  const router = useRouter();

  const [texto, setTexto] = useState("");
  const [productos, setProductos] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [totalResultados, setTotalResultados] = useState(0);
  

  async function buscar() {
    setPage(1);
    
    if (!texto.trim()) return;
     console.log("Buscando:", texto);

    try {
      const respuesta = await searchProducts(texto);
      setProductos(respuesta.products ?? []);
      setTotalResultados(respuesta.count ?? 0);
      setPage(2);
      console.log("Respuesta:", respuesta);
    } catch (error) {
      console.error(error);
    }
  }

  async function cargarMas() {
    if (loadingMore) return;
    console.log("Cargando página:", page);
    setLoadingMore(true);

    try {
    const respuesta = await searchProducts(texto, page);

    console.log("Página", page, respuesta.products?.length);

    if (respuesta.products?.length) {
      setProductos(prev => [...prev, ...respuesta.products]);
      setPage(prev => prev + 1);
    }
  } catch (error) {
    console.log("Error cargando página", page);
    console.error(error);
  } finally {
    setLoadingMore(false);
  }
  }

  const renderProducto = ({ item }: { item: Product }) => (
    <ProductoCard
      producto={item}
      onPress={() =>
        router.push({
          pathname: "/ficha/[id]",
          params: { id: item.code },
        })
      }
    />
  );
  return (
    <View style={styles.screen}>

      <Text style={styles.title}>Search</Text>

      <Text style={styles.subtitle}>
        {totalResultados} PRODUCTS FOUND
      </Text>

      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={18}
          color="#9CA3AF"
        />

        <TextInput
          style={styles.input}
          placeholder="Search..."
          value={texto}
          onChangeText={setTexto}
          onSubmitEditing={buscar}
          returnKeyType="search"
        />
        <Pressable onPress={() => router.push("/camara")}>
          <Ionicons
            name="barcode-outline"
            size={26}
            color="#16A34A"
          />
        </Pressable>
      </View>

      <FlatList
        data={productos}
        renderItem={renderProducto}
        keyExtractor={(item, index) => `${item.code}-${index}`}
        showsVerticalScrollIndicator={false}
        onEndReached={cargarMas}
        onEndReachedThreshold={0.5}
      />

    </View>
  );

  
}



const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    padding: 16,
  },

  title: {
    fontSize: 42,
    fontWeight: "800",
    color: "#111",
  },

  subtitle: {
    marginTop: 6,
    marginBottom: 22,
    fontSize: 14,
    letterSpacing: 2,
    color: "#6B7280",
  },

  searchContainer: {
    height: 52,
    justifyContent: "space-between",
    backgroundColor: "#F1F1F1",
    borderRadius: 14,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
});