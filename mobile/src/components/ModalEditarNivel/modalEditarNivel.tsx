import { useEffect, useState } from 'react';

import {
  Modal,
  Pressable,
  Text,
  View,
} from 'react-native';

import { useTheme } from '../../context/ThemeContext';

import { createStyles } from './modalEditarNivel.style';

interface ModalEditarNivelProps {
  aberto: boolean;
  nivelAtual: number;
  onFechar: () => void;
  onSalvar: (novoNivel: number) => Promise<void>;
}

export function ModalEditarNivel({
  aberto,
  nivelAtual,
  onFechar,
  onSalvar,
}: ModalEditarNivelProps) {
  const { colors } = useTheme();

  const styles = createStyles(colors);

  const [nivel, setNivel] = useState(nivelAtual);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  /*
   * Quando o modal abrir com outra Skill,
   * atualiza o nível selecionado.
   */
  useEffect(() => {
    if (aberto) {
      setNivel(nivelAtual);
      setErro('');
    }
  }, [aberto, nivelAtual]);

  async function salvar() {
    setErro('');
    setLoading(true);

    try {
      await onSalvar(nivel);

      onFechar();
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : 'Erro ao atualizar o nível.'
      );
    } finally {
      setLoading(false);
    }
  }

  function fechar() {
    if (loading) {
      return;
    }

    setErro('');
    onFechar();
  }

  return (
    <Modal
      visible={aberto}
      transparent
      animationType="fade"
      onRequestClose={fechar}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>

          {/* CABEÇALHO */}

          <View style={styles.cabecalho}>
            <Text style={styles.titulo}>
              Editar nível
            </Text>

            <Pressable
              style={styles.fechar}
              onPress={fechar}
              disabled={loading}
            >
              <Text style={styles.textoFechar}>
                ×
              </Text>
            </Pressable>
          </View>

          {/* DESCRIÇÃO */}

          <Text style={styles.descricao}>
            Selecione o novo nível da sua Skill.
          </Text>

          {/* NÍVEIS */}

          <View style={styles.niveis}>
            {[1, 2, 3, 4, 5].map((numero) => {
              const ativo = nivel === numero;

              return (
                <Pressable
                  key={numero}
                  style={[
                    styles.nivel,
                    ativo && styles.nivelAtivo,
                  ]}
                  onPress={() => setNivel(numero)}
                  disabled={loading}
                >
                  <Text
                    style={[
                      styles.textoNivel,
                      ativo &&
                        styles.textoNivelAtivo,
                    ]}
                  >
                    {numero}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* LEGENDA */}

          <View style={styles.legenda}>
            <Text style={styles.textoLegenda}>
              1 - Básico
            </Text>

            <Text style={styles.textoLegenda}>
              5 - Avançado
            </Text>
          </View>

          {/* ERRO */}

          {erro ? (
            <Text style={styles.erro}>
              {erro}
            </Text>
          ) : null}

          {/* AÇÕES */}

          <View style={styles.acoes}>
            <Pressable
              style={({ pressed }) => [
                styles.cancelar,
                pressed &&
                  styles.cancelarPressionado,
              ]}
              onPress={fechar}
              disabled={loading}
            >
              <Text style={styles.textoCancelar}>
                Cancelar
              </Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.salvar,
                pressed &&
                  styles.salvarPressionado,
              ]}
              onPress={salvar}
              disabled={loading}
            >
              <Text style={styles.textoSalvar}>
                {loading
                  ? 'Salvando...'
                  : 'Salvar'}
              </Text>
            </Pressable>
          </View>

        </View>
      </View>
    </Modal>
  );
}