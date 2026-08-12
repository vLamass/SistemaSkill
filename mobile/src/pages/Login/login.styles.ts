import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    /*
     * =========================
     * CONTAINER
     * =========================
     */

    container: {
        flex: 1,

        backgroundColor: "#F5F5F5",
    },

    scrollContent: {
        flexGrow: 1,
    },

    /*
     * =========================
     * LADO ESQUERDO
     * =========================
     */

    esquerda: {
        width: "100%",

        minHeight: 180,

        paddingVertical: 30,
        paddingHorizontal: 30,

        alignItems: "center",
        justifyContent: "center",

        backgroundColor: "#211F1D",
    },

    /*
     * =========================
     * CONTEÚDO ESQUERDO
     * =========================
     */

    conteudoEsquerda: {
        width: "100%",

        maxWidth: 600,

        alignItems: "center",
    },

    /*
     * =========================
     * INFORMAÇÕES
     * =========================
     */

    informacoes: {
        width: "100%",

        flexDirection: "column",
    },

    textoEsquerda: {
        width: "100%",

        alignItems: "flex-start",
        justifyContent: "center",
    },

    /*
     * =========================
     * TÍTULO
     * =========================
     */

    titulo: {
        marginBottom: 12,

        fontSize: 32,
        lineHeight: 37,

        fontWeight: "700",

        color: "#FFFFFF",
    },

    /*
     * =========================
     * DESCRIÇÃO
     * =========================
     */

    descricaoProjeto: {
        width: "100%",

        maxWidth: 540,

        marginTop: 16,

        fontSize: 16,
        lineHeight: 26,

        color: "#FFFFFF",
    },

    /*
     * =========================
     * BENEFÍCIOS
     * =========================
     */

    beneficios: {
        width: "100%",

        flexDirection: "column",

        gap: 18,

        marginTop: 40,
    },

    beneficio: {
        flexDirection: "column",

        gap: 5,

        paddingLeft: 16,

        borderLeftWidth: 3,
        borderLeftColor: "#B88746",
    },

    beneficioTitulo: {
        fontSize: 16,

        fontWeight: "700",

        color: "#FFFFFF",
    },

    beneficioTexto: {
        fontSize: 14,

        lineHeight: 21,

        color: "#FFFFFF",
    },

    /*
     * =========================
     * LOGO
     * =========================
     */

    logo: {
        width: 320,
        height: 420,

        resizeMode: "contain",
    },

    LogoBranca: {
        width: 160,
        height: 100,

        resizeMode: "contain",
    },

    /*
     * =========================
     * LADO DIREITO
     * =========================
     */

    direita: {
        width: "100%",

        flex: 1,

        minHeight: 500,

        alignItems: "center",
        justifyContent: "center",

        paddingVertical: 40,
        paddingHorizontal: 20,

        backgroundColor: "#F5F5F5",
    },

    /*
     * =========================
     * LOADING
     * =========================
     */

    loading: {
        marginTop: 16,
    },
});