import { StyleSheet } from "react-native";

export function createStyles(colors: any) {
    return StyleSheet.create({
        card: {
            width: "100%",

            backgroundColor: colors.surface,

            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 12,

            paddingVertical: 20,
            paddingHorizontal: 24,

            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",

            gap: 24,

            shadowColor: colors.dark,
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity:
                colors.shadow.includes("0.35")
                    ? 0.35
                    : 0.08,
            shadowRadius: 8,

            elevation: 3,
        },

        conteudo: {
            flexDirection: "row",
            alignItems: "center",

            gap: 16,

            flex: 1,
            minWidth: 0,
        },

        imagemContainer: {
            width: 72,
            height: 72,

            flexShrink: 0,

            borderRadius: 12,
            overflow: "hidden",

            backgroundColor: colors.background,

            borderWidth: 1,
            borderColor: colors.border,

            alignItems: "center",
            justifyContent: "center",
        },

        imagem: {
            width: "100%",
            height: "100%",
            resizeMode: "cover",
        },

        imagemVazia: {
            width: "100%",
            height: "100%",

            alignItems: "center",
            justifyContent: "center",
        },

        informacoes: {
            flex: 1,
            minWidth: 0,

            flexDirection: "column",

            gap: 6,
        },

        cabecalho: {
            flexDirection: "row",
            alignItems: "center",

            gap: 16,
        },

        nome: {
            fontSize: 17.6,
            fontWeight: "700",

            color: colors.text,
        },

        nivel: {
            fontSize: 14.4,
            fontWeight: "600",

            color: colors.primary,
        },

        descricao: {
            color: colors.textSecondary,

            fontSize: 15.2,
        },

        botao: {
            flexShrink: 0,

            borderRadius: 8,

            backgroundColor: "transparent",

            paddingVertical: 8,
            paddingHorizontal: 12,
        },

        textoBotao: {
            color: colors.primary,

            fontSize: 14.4,
            fontWeight: "600",
        },

        botaoPressionado: {
            backgroundColor: colors.butter,
        },
    });
}