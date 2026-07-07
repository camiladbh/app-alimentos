  import { Categoria, categorias } from "../../data/categorias";
  import { LinearGradient } from "expo-linear-gradient";
  import { useRouter } from "expo-router";
  import { Pressable, StyleSheet, Text, View } from "react-native";

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
        <LinearGradient
          colors={item.gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 0.5, y: 0.5 }}
          style={styles.categoriaCard}
        >
          <Text style={styles.categoriaText}>{item.nombre}</Text>
        </LinearGradient>
      </Pressable>
    );
  }

  export default function CategoriasList() {
    return (
      <View style={styles.categoryGrid}>
        {categorias.map((item) => (
          <CategoriaCard key={item.id} item={item} />
        ))}
      </View>
    );
  }

  const styles = StyleSheet.create({
    categoryGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      gap: 12,
    },
    categoriaWrapper: {
      width: "48%",
      marginBottom: 12,
    },
    categoriaCard: {
      height: 185,
      borderRadius: 15,
      padding: 15,
      justifyContent: "flex-end",
    },
    categoriaText: {
      color: "white",
      fontSize: 15,
      fontWeight: "700",
    },
  });