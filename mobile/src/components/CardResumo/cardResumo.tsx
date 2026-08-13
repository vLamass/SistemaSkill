import { Text, View } from "react-native";

import { useTheme } from "../../context/ThemeContext";
import { createStyles } from "./cardResumo.styles";

interface CardResumoProps {
    valor: number;
    titulo: string;
}

export function CardResumo({
    valor,
    titulo,
}: CardResumoProps) {
    const { colors } = useTheme();

    const styles = createStyles(colors);

    return (
        <View style={styles.card}>
            <Text style={styles.valor}>
                {valor}
            </Text>

            <Text style={styles.titulo}>
                {titulo}
            </Text>
        </View>
    );
}