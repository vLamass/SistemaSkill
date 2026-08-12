import { StyleSheet } from "react-native";

export function createStyles(colors: any) {
    return StyleSheet.create({
        overlay: {
            flex: 1,

            backgroundColor: "rgba(0, 0, 0, 0.45)",

            alignItems: "center",
            justifyContent: "center",

            padding: 20,
        },

        modal: {
            width: "100%",
            maxWidth: 560,
            maxHeight: "90%",

            backgroundColor: colors.surface,

            borderRadius: 16,

            padding: 28,

            shadowColor: colors.dark,
            shadowOffset: {
                width: 0,
                height: 10,
            },
            shadowOpacity:
                colors.shadow.includes("0.35")
                    ? 0.25
                    : 0.15,
            shadowRadius: 35,

            elevation: 10,
        },

        cabecalho: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",

            marginBottom: 8,
        },

        titulo: {
            color: colors.text,

            fontSize: 22.4,
            fontWeight: "700",
        },

        fechar: {
            backgroundColor: "transparent",

            padding: 4,
        },

        textoFechar: {
            color: colors.textSecondary,

            fontSize: 27.2,
            lineHeight: 27.2,
        },

        descricao: {
            marginBottom: 20,

            color: colors.textSecondary,

            fontSize: 15.2,
        },

        lista: {
            maxHeight: 280,
        },

        listaConteudo: {
            gap: 10,
        },

        skill: {
            width: "100%",

            flexDirection: "row",
            alignItems: "center",

            gap: 14,

            padding: 12,

            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 10,

            backgroundColor: colors.surface,
        },

        skillSelecionada: {
            width: "100%",

            flexDirection: "row",
            alignItems: "center",

            gap: 14,

            padding: 11,

            borderWidth: 2,
            borderColor: colors.primary,
            borderRadius: 10,

            backgroundColor: colors.background,
        },

        imagemContainer: {
            width: 52,
            height: 52,

            flexShrink: 0,

            borderRadius: 10,

            overflow: "hidden",

            backgroundColor: colors.background,

            alignItems: "center",
            justifyContent: "center",
        },

        imagem: {
            width: "100%",
            height: "100%",

            resizeMode: "cover",
        },

        imagemVazia: {
            fontSize: 20,
        },

        informacoes: {
            flex: 1,
            minWidth: 0,

            flexDirection: "column",

            gap: 4,
        },

        nome: {
            color: colors.text,

            fontSize: 16,
            fontWeight: "700",
        },

        descricaoSkill: {
            color: colors.textSecondary,

            fontSize: 13.6,
        },

        nivelContainer: {
            marginTop: 24,
        },

        nivelTitulo: {
            marginBottom: 10,

            color: colors.text,

            fontWeight: "600",
        },

        niveis: {
            flexDirection: "row",

            gap: 10,
        },

        nivel: {
            width: 42,
            height: 42,

            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 8,

            backgroundColor: colors.surface,

            alignItems: "center",
            justifyContent: "center",
        },

        nivelAtivo: {
            width: 42,
            height: 42,

            borderWidth: 1,
            borderColor: colors.primary,
            borderRadius: 8,

            backgroundColor: colors.primary,

            alignItems: "center",
            justifyContent: "center",
        },

        textoNivel: {
            color: colors.textSecondary,

            fontWeight: "600",
        },

        textoNivelAtivo: {
            color: colors.textLight,

            fontWeight: "600",
        },

        legenda: {
            flexDirection: "row",
            justifyContent: "space-between",

            marginTop: 8,
        },

        textoLegenda: {
            color: colors.textSecondary,

            fontSize: 12.8,
        },

        erro: {
            marginTop: 16,

            color: colors.error,

            fontSize: 14.4,
        },

        acoes: {
            flexDirection: "row",
            justifyContent: "flex-end",

            gap: 12,

            marginTop: 28,
        },

        cancelar: {
            borderRadius: 8,

            paddingVertical: 10,
            paddingHorizontal: 18,

            backgroundColor: colors.background,
        },

        cancelarPressionado: {
            backgroundColor: colors.border,
        },

        textoCancelar: {
            color: colors.textSecondary,

            fontSize: 14.4,
            fontWeight: "600",
        },

        adicionar: {
            borderRadius: 8,

            paddingVertical: 10,
            paddingHorizontal: 18,

            backgroundColor: colors.primary,
        },

        adicionarPressionado: {
            backgroundColor: colors.primaryHover,
        },

        textoAdicionar: {
            color: colors.textLight,

            fontSize: 14.4,
            fontWeight: "600",
        },

        vazio: {
            marginVertical: 20,

            textAlign: "center",

            color: colors.textSecondary,
        },
    });
}