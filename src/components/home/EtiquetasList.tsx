  import { etiqueta } from "../../data/etiquetas";
  import { useRouter } from "expo-router";
  import { Pressable, StyleSheet, Text, View } from "react-native";

  function EtiquetaChip({ text }: { text: string }) {
    const router = useRouter();

    return (
      <Pressable
        style={styles.etiqueta}
        onPress={() =>
          router.push({
            pathname: "/etiqueta/[nombre]",
            params: { nombre: text },
          })
        }
      >
        <Text style={styles.etiquetaText}>{text}</Text>
      </Pressable>
    );
  }

  export default function EtiquetasList() {
    return (
      <View style={styles.etiquetasContainer}>
        {etiqueta.map((item) => (
          <EtiquetaChip key={item} text={item} />
        ))}
      </View>
    );
  }

  const styles = StyleSheet.create({
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
  });