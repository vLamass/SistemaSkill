import { StyleSheet } from 'react-native';

export function createStyles(colors: {
    background: string;
    surface: string;
    primary: string;
    text: string;
    textSecondary: string;
    textLight: string;
    border: string;
}) {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
        },

        scrollContent: {
            flexGrow: 1,
        },

        conteudo: {
            width: '100%',
            padding: 40,
        },

        apresentacao: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 32,
        },

        apresentacaoTexto: {
            flex: 1,
            marginRight: 20,
        },

        titulo: {
            fontSize: 32,
            fontWeight: '700',
            color: colors.text,
        },

        subtitulo: {
            marginTop: 8,
            fontSize: 15,
            color: colors.textSecondary,
        },

        botaoAdicionar: {
            borderRadius: 8,
            paddingVertical: 12,
            paddingHorizontal: 20,
            backgroundColor: colors.primary,
        },

        botaoAdicionarTexto: {
            color: colors.textLight,
            fontSize: 15,
            fontWeight: '600',
        },

        resumo: {
            flexDirection: 'row',
            gap: 16,
            width: '100%',
            marginBottom: 40,
        },

        minhasSkills: {
            width: '100%',
        },

        tituloSecao: {
            marginBottom: 20,
            fontSize: 24,
            fontWeight: '700',
            color: colors.text,
        },

        textoSecundario: {
            color: colors.textSecondary,
            fontSize: 14,
        },

        carregando: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
        },

        listaSkills: {
            flexDirection: 'column',
            gap: 24,
        },

        paginacao: {
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
            marginTop: 24,
        },

        botaoPagina: {
            borderWidth: 1,
            borderColor: colors.primary,
            borderRadius: 8,
            backgroundColor: colors.surface,
            paddingVertical: 9,
            paddingHorizontal: 16,
        },

        botaoPaginaDisabled: {
            opacity: 0.4,
        },

        botaoPaginaTexto: {
            color: colors.primary,
            fontSize: 14,
            fontWeight: '600',
        },

        paginaTexto: {
            color: colors.textSecondary,
            fontSize: 14,
            fontWeight: '500',
            minWidth: 100,
            textAlign: 'center',
        },
    });
}