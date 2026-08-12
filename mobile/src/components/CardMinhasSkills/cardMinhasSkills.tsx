import {
    Image,
    Pressable,
    Text,
    View,
} from "react-native";

import { useTheme } from "../../context/ThemeContext";
import { createStyles } from "./cardMinhasSkills.styles";

interface CardMinhasSkillsProps {
    nome: string;
    descricao: string;
    nivel: number;
    imagem?: string | null;
    onEditarNivel?: () => void;
}

export function CardMinhasSkills({
    nome,
    descricao,
    nivel,
    imagem,
    onEditarNivel,
}: CardMinhasSkillsProps) {
    const { colors } = useTheme();

    const styles = createStyles(colors);

    return (
        <View style={styles.card}>
            <View style={styles.conteudo}>
                <View style={styles.imagemContainer}>
                    {imagem ? (
                        <Image
                            source={{ uri: imagem }}
                            accessibilityLabel={`Imagem da Skill ${nome}`}
                            style={styles.imagem}
                        />
                    ) : (
                        <View
                            style={
                                styles.imagemVazia
                            }
                        >
                            <Text>🖼️</Text>
                        </View>
                    )}
                </View>

                <View style={styles.informacoes}>
                    <View style={styles.cabecalho}>
                        <Text style={styles.nome}>
                            {nome}
                        </Text>

                        <Text style={styles.nivel}>
                            Nível {nivel}
                        </Text>
                    </View>

                    <Text
                        style={styles.descricao}
                        numberOfLines={2}
                        ellipsizeMode="tail"
                    >
                        {descricao}
                    </Text>
                </View>
            </View>

            <Pressable
                style={({ pressed }) => [
                    styles.botao,
                    pressed &&
                        styles.botaoPressionado,
                ]}
                onPress={onEditarNivel}
            >
                <Text style={styles.textoBotao}>
                    Editar nível
                </Text>
            </Pressable>
        </View>
    );
}