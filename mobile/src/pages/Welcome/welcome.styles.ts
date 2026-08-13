import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: "#211F1D",

        alignItems: "center",
        justifyContent: "center",

        paddingHorizontal: 30,
        paddingVertical: 40,
    },

    conteudo: {
        width: "100%",
        maxWidth: 600,

        alignItems: "center",
    },

    titulo: {
        fontSize: 38,
        lineHeight: 46,

        fontWeight: "700",

        color: "#FFFFFF",

        textAlign: "center",

        marginBottom: 24,
    },

    subtitulo: {
        width: "100%",
        maxWidth: 520,

        fontSize: 20,
        lineHeight: 30,

        fontWeight: "600",

        color: "#FFFFFF",

        textAlign: "center",

        marginBottom: 16,
    },

    descricao: {
        width: "100%",
        maxWidth: 480,

        fontSize: 15,
        lineHeight: 24,

        color: "#D8D4D0",

        textAlign: "center",

        marginBottom: 40,
    },

    botao: {
        minWidth: 180,

        borderRadius: 10,

        paddingVertical: 14,
        paddingHorizontal: 28,

        backgroundColor: "#B88746",

        alignItems: "center",
        justifyContent: "center",
    },

    botaoPressionado: {
        backgroundColor: "#9F7138",
    },

    textoBotao: {
        color: "#FFFFFF",

        fontSize: 16,

        fontWeight: "700",
    },
});