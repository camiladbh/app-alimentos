import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { Product } from "../services/products.services";

const NUTRI_BG_COLORS: Record<string, string> = {
    A: "#0A6C34",
    B: "#22C55E",
    C: "#F59E0B",
    D: "#EF4444",
    E: "#991B1B",
};

type ProductoCardProps = {
    producto: Product;
    onPress: () => void;
};

export default function ProductoCard({ producto, onPress }: ProductoCardProps) {
    const nutriScore =
    !producto.nutriscore_grade ||
    producto.nutriscore_grade === "unknown" ||
    producto.nutriscore_grade === "not-applicable"
        ? "-"
        : producto.nutriscore_grade.toUpperCase();

    const ecoScore =
    !producto.ecoscore_grade ||
    producto.ecoscore_grade === "unknown" ||
    producto.ecoscore_grade === "not-applicable"
        ? "-"
        : producto.ecoscore_grade.toUpperCase();

    return(
        <Pressable style={styles.card} onPress={onPress}>
            <View style={styles.imageContainer}>
                {producto.image_url ? (
                    <Image
                        source={{ uri: producto.image_url }}
                        style={styles.image}
                        contentFit="cover"
                        transition={150}
                    />
                ) : (
                    <View style={styles.placeholder}>
                        <Ionicons name="restaurant-outline" size={30} color="#D1D5DB"/>
                    </View>
                )}
            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.name}>{producto.product_name}</Text>
                <Text style={styles.brand}>{producto.brands}</Text>

                <View style={styles.scoresRow}>
                    <View
                        style={[
                        styles.nutriBox,
                        {
                            backgroundColor:
                            NUTRI_BG_COLORS[producto.nutriscore_grade] ?? "#22C55E",
                        },
                        ]}
                    >
                        <Text style={styles.nutriLabel}>NUTRI-{"\n"}SCORE {nutriScore}</Text>
                    </View>

                    <View style={styles.ecoBox}>
                        <Text style={styles.ecoLabel}>ECO-SCORE</Text>
                        <Text style={styles.ecoValue}>{ecoScore}</Text>
                    </View>
                </View>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#D1D5DB" />
        </Pressable>        
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "white",
        borderRadius: 18,
        padding: 16,
        marginBottom: 16,
        flexDirection: "row",
        alignItems: "center",
        elevation: 2,
    },
    imageContainer: {
        marginRight: 16,
    },
    image: {
        width: 90,
        height: 90,
        borderRadius: 12,
    },
    placeholder: {
        width: 90,
        height: 90,
        borderRadius: 12,
        backgroundColor: "#F1F1F1",
        alignItems: "center",
        justifyContent: "center",
    },
    infoContainer: {
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: "700",
        color: "#111",
    },
    brand: {
        fontSize: 14,
        color: "#6B7280",
        marginTop: 3,
        marginBottom: 12,
    },
    scoresRow: {
        flexDirection: "row",
        gap: 10,
    },
    nutriBox: {
        minWidth: 95,
        paddingVertical: 8,
        paddingHorizontal: 10,
    },
    nutriLabel: {
        color: "white",
        fontSize: 12,
        fontWeight: "800",
    },
    ecoBox: {
        minWidth: 95,
        backgroundColor: "#C9E8C0",
        paddingVertical: 8,
        paddingHorizontal: 10,
    },
    ecoLabel: {
        color: "#416B3E",
        fontSize: 12,
        fontWeight: "700",
    },
    ecoValue: {
        color: "#416B3E",
        fontSize: 14,
        fontWeight: "700",
    },
});