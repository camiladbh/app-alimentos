import { StyleSheet, Text, View } from "react-native";

type SectionHeaderProps = {
  titulo: string;
  subtitulo?: string;
  accion?: string;
};


export default function SectionHeader({
  titulo,
  subtitulo,
  accion,
}: SectionHeaderProps) {
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>{titulo}</Text>

        {accion && (
          <Text style={styles.action}>{accion}</Text>
        )}
      </View>

      {subtitulo && (
        <Text style={styles.subtitle}>{subtitulo}</Text>
      )}
    </>
  );
}
const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    title: {
        fontSize: 21,
        fontWeight: "500",
        color: "#111",
    },

    action: {
        fontSize: 13,
        color: "#004D24",
    },

    subtitle: {
        marginTop: 4,
        fontSize: 13,
        marginBottom: 14,   
        color: "#747474",
    },
});
