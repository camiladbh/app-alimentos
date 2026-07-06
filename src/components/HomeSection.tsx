import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import SectionHeader from "./SectionHeader";

type HomeSectionProps = PropsWithChildren<{
  titulo: string;
  subtitulo?: string;
  accion?: string;
}>;
export default function HomeSection({
  titulo,
  subtitulo,
  accion,
  children,
}: HomeSectionProps) {
  return(
    <View style={styles.container}>
      <SectionHeader
          titulo={titulo}
          subtitulo={subtitulo}
          accion={accion}
      />
            {children}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
});