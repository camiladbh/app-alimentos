import { useLocalSearchParams, useRouter} from "expo-router";
import { FlatList, StyleSheet, Text, TextInput, View, Pressable} from "react-native";
import { Product, searchProductsByBrand, } from "../../src/services/products.services";
import { useEffect, useState } from "react";
import ProductoCard from "../../src/components/ProductoCard";
import { Ionicons } from "@expo/vector-icons";

export default function MarcaScreen() {
    const router = useRouter();
    const [productos, setProductos] = useState<Product[]>([]);
    const { nombre } = useLocalSearchParams();
    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);
    const [totalResultados, setTotalResultados] = useState(0);

    useEffect(() => {
      async function cargarProductos() {
        try {
          const respuesta = await searchProductsByBrand(String(nombre), 1);

          setProductos(respuesta.products);
          setTotalResultados(respuesta.count);
          setPage(2);
        } catch (error) {
            console.error(error);
          }
      }

      if (nombre) {
        cargarProductos();
      }
    }, [nombre]);

    async function cargarMas() {
      if (loadingMore) return;

      setLoadingMore(true);

      try {
        const respuesta = await searchProductsByBrand(
          String(nombre),
          page
        );

        if (respuesta.products.length > 0) {
          setProductos(prev => [...prev, ...respuesta.products]);
          setPage(prev => prev + 1);
        }

      } catch (error) {
        console.log("No se pudieron cargar más productos");
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
            params: { id: item.code }
        })
        }
    />
    );
    
     return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons
            name="chevron-back"
            size={30}
            color="#004D24"
          />
        </Pressable>

        <Text style={styles.logo}>Digital Epicurean</Text>

        <Ionicons name="person-circle-outline" size={24} color="#004D24" />
      </View>

      <FlatList
        data={productos}
        renderItem={renderProducto}
        keyExtractor={(item, index) => `${item.code}-${index}`}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        onEndReached={cargarMas}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={
          <>
            <Text style={styles.title}>
              {String(nombre).charAt(0).toUpperCase() + String(nombre).slice(1)}
            </Text>

            <Text style={styles.subtitle}>{totalResultados} ITEMS FOUND</Text>

            <View style={styles.searchContainer}>
              <Ionicons name="search" size={18} color="#9CA3AF" />

              <TextInput
                placeholder="Search juices, craft sodas, teas..."
                placeholderTextColor="#9CA3AF"
                style={styles.input}
                editable={false}
              />
            </View>
          </>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  header: {
    height: 60,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ECECEC",
  },
  logo: {
    fontSize: 16,
    fontWeight: "700",
    color: "#004D24",
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
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
    backgroundColor: "#F1F1F1",
    borderRadius: 14,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 26,
  },
  input: {
    marginLeft: 10,
    flex: 1,
  },
});