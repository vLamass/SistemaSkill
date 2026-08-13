import { Pressable, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { styles } from "./welcome.styles";

type RootStackParamList = {
    Welcome: undefined;
    Login: undefined;
    Home: undefined;
};

type WelcomeProps = NativeStackScreenProps<
    RootStackParamList,
    "Welcome"
>;

export default function Welcome({ navigation }: WelcomeProps) {
    return (
        <View style={styles.container}>
            <View style={styles.conteudo}>
                <Text style={styles.titulo}>
                    Sistema Skills
                </Text>

                <Text style={styles.subtitulo}>
                    Organize suas habilidades,
                    acompanhe seus níveis e
                    desenvolva seu conhecimento.
                </Text>

                <Text style={styles.descricao}>
                    Tenha suas Skills organizadas em
                    um só lugar e acompanhe sua
                    evolução.
                </Text>

                <Pressable
                    style={({ pressed }) => [
                        styles.botao,
                        pressed && styles.botaoPressionado,
                    ]}
                    onPress={() => navigation.navigate("Login")}
                >
                    <Text style={styles.textoBotao}>
                        Começar
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}