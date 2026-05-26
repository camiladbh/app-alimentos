import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function MarcaScreen() {
  const { nombre } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Marca</Text>
      <Text style={styles.value}>{nombre}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
  },
  value: {
    fontSize: 18,
    marginTop: 8,
  },
});