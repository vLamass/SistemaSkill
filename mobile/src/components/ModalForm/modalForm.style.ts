import { StyleSheet } from 'react-native';

import { lightColors } from '../../theme/colors';

export const styles = StyleSheet.create({
  card: {
    width: '100%',
    maxWidth: 420,

    padding: 42,

    borderRadius: 20,

    backgroundColor: lightColors.surface,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.08,
    shadowRadius: 60,

    elevation: 8,

    gap: 20,
  },

  // =========================
  // CABEÇALHO
  // =========================

  cabecalho: {
    alignItems: 'center',

    marginBottom: 8,
  },

  titulo: {
    marginBottom: 8,

    fontSize: 30,
    fontWeight: '700',

    color: lightColors.text,

    textAlign: 'center',
  },

  descricao: {
    fontSize: 14,
    lineHeight: 21,

    color: lightColors.textSecondary,

    textAlign: 'center',
  },

  // =========================
  // FORMULÁRIO
  // =========================

  formulario: {
    gap: 8,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',

    color: lightColors.text,
  },

  input: {
    width: '100%',
    height: 46,

    paddingHorizontal: 14,

    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 10,

    fontSize: 14,

    backgroundColor: 'transparent',
    color: lightColors.text,
  },

  placeholder: {
    color: '#777',
  },

  // =========================
  // SENHA
  // =========================

  inputSenha: {
    width: '100%',
    height: 46,

    flexDirection: 'row',
    alignItems: 'center',

    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 10,
  },

  inputSenhaTexto: {
    flex: 1,

    height: '100%',

    paddingLeft: 14,
    paddingRight: 8,

    fontSize: 14,

    color: lightColors.text,
  },

  botaoOlho: {
    width: 40,
    height: 40,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 6,
  },

  iconeOlho: {
    fontSize: 20,

    color: '#777',
  },

  // =========================
  // LEMBRAR
  // =========================

  lembrar: {
    flexDirection: 'row',
    alignItems: 'center',

    gap: 8,
  },

  textoLembrar: {
    fontSize: 13,

    color: lightColors.textSecondary,
  },

  // =========================
  // BOTÃO SUBMIT
  // =========================

  botaoSubmit: {
    width: '100%',
    height: 46,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 10,

    backgroundColor: lightColors.primary,
  },

  botaoSubmitPressionado: {
    backgroundColor: lightColors.primaryHover,

    transform: [
      {
        scale: 0.99,
      },
    ],
  },

  botaoSubmitDesabilitado: {
    opacity: 0.6,
  },

  textoBotaoSubmit: {
    color: lightColors.textLight,

    fontSize: 15,
    fontWeight: '600',
  },

  // =========================
  // SUCESSO
  // =========================

  sucesso: {
    marginTop: 10,

    width: '100%',

    color: lightColors.success,

    fontSize: 14.4,
    fontWeight: '600',

    textAlign: 'center',
  },

  // =========================
  // ERRO
  // =========================

  erro: {
    marginTop: -5,

    fontSize: 13,

    color: lightColors.error,

    textAlign: 'center',
  },

  // =========================
  // ALTERNATIVA
  // =========================

  alternativa: {
    flexDirection: 'row',

    justifyContent: 'center',
    alignItems: 'center',

    gap: 5,
  },

  textoAlternativa: {
    fontSize: 13,

    color: lightColors.textSecondary,
  },

  botaoAlternativa: {
    color: lightColors.primary,

    fontSize: 13,
    fontWeight: '600',
  },
});