import { StyleSheet } from 'react-native';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    overlay: {
      flex: 1,

      backgroundColor: 'rgba(0, 0, 0, 0.45)',

      alignItems: 'center',
      justifyContent: 'center',

      padding: 20,
    },

    modal: {
      width: '100%',
      maxWidth: 420,

      backgroundColor: colors.surface,

      borderRadius: 16,

      padding: 28,

      shadowColor: colors.dark,
      shadowOffset: {
        width: 0,
        height: 15,
      },
      shadowOpacity: 0.25,
      shadowRadius: 40,

      elevation: 10,
    },

    cabecalho: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    titulo: {
      color: colors.text,

      fontSize: 21.6,
      fontWeight: '700',
    },

    fechar: {
      backgroundColor: 'transparent',

      padding: 4,
    },

    textoFechar: {
      color: colors.textSecondary,

      fontSize: 27.2,
      lineHeight: 27.2,
    },

    descricao: {
      marginTop: 10,
      marginBottom: 24,

      color: colors.textSecondary,

      fontSize: 15.2,
    },

    niveis: {
      flexDirection: 'row',
      justifyContent: 'center',

      gap: 10,
    },

    nivel: {
      width: 52,
      height: 52,

      borderWidth: 1,
      borderColor: colors.border,

      borderRadius: 10,

      backgroundColor: colors.background,

      alignItems: 'center',
      justifyContent: 'center',
    },

    nivelAtivo: {
      width: 52,
      height: 52,

      borderWidth: 1,
      borderColor: colors.primary,

      borderRadius: 10,

      backgroundColor: colors.primary,

      alignItems: 'center',
      justifyContent: 'center',

      shadowColor: colors.primary,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.25,
      shadowRadius: 10,

      elevation: 4,
    },

    textoNivel: {
      color: colors.textSecondary,

      fontSize: 16,
      fontWeight: '700',
    },

    textoNivelAtivo: {
      color: colors.textLight,

      fontSize: 16,
      fontWeight: '700',
    },

    legenda: {
      flexDirection: 'row',
      justifyContent: 'space-between',

      marginTop: 10,
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
      flexDirection: 'row',
      justifyContent: 'flex-end',

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
      fontWeight: '600',
    },

    salvar: {
      borderRadius: 8,

      paddingVertical: 10,
      paddingHorizontal: 18,

      backgroundColor: colors.primary,
    },

    salvarPressionado: {
      backgroundColor: colors.primaryHover,
    },

    textoSalvar: {
      color: colors.textLight,

      fontSize: 14.4,
      fontWeight: '600',
    },
  });