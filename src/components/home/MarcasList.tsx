import { marcas } from "../../data/marcas";
import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

function MarcaCard({
  name,
  displayName,
  image,
}: {
  name: string;
  displayName: string;
  image?: any;
}) {
  const router = useRouter();

  return (
    <Pressable
      style={styles.marcaCard}
      onPress={() =>
        router.push({
          pathname: "/marca/[nombre]",
          params: {
            nombre: name,
          },
        })
      }
    >
      <View style={styles.marcaCircle}>
        {image ? (
          <Image source={image} style={styles.marcaImage} />
        ) : (
          <Text style={styles.marcaCircleText}>{displayName}</Text>
        )}
      </View>

      <Text style={styles.marcaName}>{name}</Text>
    </Pressable>
  );
}

export default function MarcasList() {
  return (
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
  );
}

const styles = StyleSheet.create({
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
  marcaImage: {
    width: 44,
    height: 44,
    resizeMode: "contain",
  },
  marcaName: {
    fontSize: 13,
    color: "#111",
  },
});