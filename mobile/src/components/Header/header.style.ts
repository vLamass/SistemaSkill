import { StyleSheet } from 'react-native';

export function createStyles(colors: {
    surface: string;
    border: string;
    primary: string;
    textLight: string;
}) {
    return StyleSheet.create({
        header: {
            width: '100%',
            height: 72,

            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',

            paddingHorizontal: 40,

            backgroundColor: colors.surface,

            borderBottomWidth: 1,
            borderBottomColor: colors.border,
        },

        logo: {
            fontSize: 19.2,
            fontWeight: '700',

            color: colors.primary,
        },

        direita: {
            flexDirection: 'row',
            alignItems: 'center',

            gap: 24,
        },

        usuario: {
            fontSize: 16,
            fontWeight: '600',

            color: colors.primary,
        },

        botaoSair: {
            borderWidth: 1,
            borderColor: colors.primary,

            backgroundColor: 'transparent',

            paddingVertical: 8,
            paddingHorizontal: 16,

            borderRadius: 8,
        },

        textoBotaoSair: {
            color: colors.primary,

            fontSize: 15.2,
            fontWeight: '600',
        },

        botaoSairPressionado: {
            backgroundColor: colors.primary,
        },

        textoBotaoSairPressionado: {
            color: colors.textLight,
        },

        botaoTema: {
            backgroundColor: 'transparent',

            paddingVertical: 6,
            paddingHorizontal: 8,

            borderRadius: 8,
        },

        iconeTema: {
            fontSize: 20,
        },

        botaoTemaPressionado: {
            backgroundColor: 'rgba(0, 0, 0, 0.08)',
        },
    });
}