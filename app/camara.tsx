import { CameraView,useCameraPermissions, BarcodeScanningResult,} from "expo-camera";

import { View, Text, Pressable, StyleSheet,} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { searchProducts } from "../src/services/products.services";

export default function CamaraScreen() {
    const router = useRouter();
    const [permission, requestPermission] = useCameraPermissions();
    const [escaneado, setEscaneado] = useState(false);
    const [codigo, setCodigo] = useState<string | null>(null);

    if (!permission) {
        return (
        <View style={styles.center}>
            <Text>Cargando cámara...</Text>
        </View>
        );
    }

    if (!permission.granted) {
        return (
        <View style={styles.center}>
            <Text>Necesitamos permiso para usar la cámara.</Text>

            <Pressable
            style={styles.button}
            onPress={requestPermission}
            >
            <Text style={styles.buttonText}>
                Dar permiso
            </Text>
            </Pressable>
        </View>
        );
    }
    
    async function handleBarcodeScan(result: BarcodeScanningResult) {
        if (escaneado) return;

        setEscaneado(true);

        const codigoLeido = result.data;

        console.log("Código:", codigoLeido);

        try {
            const respuesta = await searchProducts(codigoLeido);

            if (respuesta.products.length > 0) {
            setCodigo(codigoLeido);
            } else {
            alert("Producto no encontrado");
            setEscaneado(false);
            }
        } catch (error) {
            console.error(error);
            alert("Error al buscar el producto");
            setEscaneado(false);
        }
    }

    return (
        <View style={{ flex: 1 }}>

            <CameraView
                style={{ flex: 1 }}
                facing="back"
                onBarcodeScanned={
                    escaneado ? undefined : handleBarcodeScan
                }
                barcodeScannerSettings={{
                    barcodeTypes: [
                        "aztec",
                        "ean13",
                        "ean8",
                        "qr",
                        "pdf417",
                        "upc_e",
                        "datamatrix",
                        "code39",
                        "code93",
                        "itf14",
                        "codabar",
                        "code128",
                        "upc_a",
                    ],
                }}
            />

            {escaneado && codigo && (
                <View style={styles.resultado}>

                    <Text style={styles.check}>✓</Text>

                    <Text style={styles.titulo}>
                    Producto encontrado
                    </Text>

                    <Text style={styles.codigo}>
                    {codigo}
                    </Text>

                    <Pressable
                    style={styles.verProducto}
                    onPress={() =>
                        router.replace({
                        pathname: "/ficha/[id]",
                        params: { id: codigo },
                        })
                    }
                    >
                    <Text style={styles.verProductoTexto}>
                        Ver producto
                    </Text>
                    </Pressable>

                    <Pressable
                    onPress={() => {
                        setCodigo(null);
                        setEscaneado(false);
                    }}
                    >
                    <Text style={styles.reintentar}>
                        Volver a escanear
                    </Text>
                    </Pressable>

                </View>
            )}

        </View>
    );
    
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },

  button: {
    marginTop: 20,
    backgroundColor: "#16A34A",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },

  buttonText: {
    color: "white",
    fontWeight: "700",
  },
  resultado: {
  position: "absolute",
  bottom: 30,
  left: 20,
  right: 20,
  backgroundColor: "white",
  borderRadius: 20,
  padding: 20,
  alignItems: "center",
  elevation: 8,
},

check: {
  fontSize: 40,
  color: "#16A34A",
},

titulo: {
  fontSize: 22,
  fontWeight: "700",
  marginTop: 10,
},

codigo: {
  color: "#6B7280",
  marginVertical: 10,
},

verProducto: {
  width: "100%",
  backgroundColor: "#16A34A",
  borderRadius: 12,
  paddingVertical: 14,
  alignItems: "center",
},

verProductoTexto: {
  color: "white",
  fontWeight: "700",
  fontSize: 16,
},

reintentar: {
  marginTop: 18,
  color: "#16A34A",
  fontWeight: "700",
},
});