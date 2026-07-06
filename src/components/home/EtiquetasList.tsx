import { etiqueta } from "../../data/etiquetas";
import { StyleSheet, Text, View } from "react-native";

function EtiquetaChip({ text }: { text: string }) {
  return (
    <View style={styles.etiqueta}>
      <Text style={styles.etiquetaText}>{text}</Text>
    </View>
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