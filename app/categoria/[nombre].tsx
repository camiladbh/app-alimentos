import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { FlatList, StyleSheet, Text, TextInput, View} from "react-native";
import ProductoCard from "../../src/components/ProductoCard";
import { useEffect, useState } from "react";
import { searchProducts, Product, } from "../../src/services/products.services";

export default function CategoriaScreen() {
    const router = useRouter();
    const [productos, setProductos] = useState<Product[]>([]);
    const { nombre } = useLocalSearchParams();

    useEffect(() => {
      async function cargarProductos() {
        try {
          const respuesta = await searchProducts(String(nombre));

    setProductos(respuesta.products);
        } catch (error) {
          console.error(error);
        }
      }

      if (nombre) {
        cargarProductos();
      }
    }, [nombre]);

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
        <Ionicons name="menu" size={24} color="#004D24" />

        <Text style={styles.logo}>Digital Epicurean</Text>

        <Ionicons name="person-circle-outline" size={24} color="#004D24" />
      </View>

      <FlatList
        data={productos}
        renderItem={renderProducto}
        keyExtractor={(item, index) => `${item.code}-${index}`}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <Text style={styles.title}>
              {String(nombre).charAt(0).toUpperCase() + String(nombre).slice(1)}
            </Text>

            <Text style={styles.subtitle}>{productos.length} ITEMS FOUND</Text>

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