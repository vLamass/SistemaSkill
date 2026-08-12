import { useState } from "react";

import {
    Image,
    Modal,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";

import { useTheme } from "../../context/ThemeContext";
import { createStyles } from "./modalAdicionarSkill.style";

interface Skill {
    id: number;
    name: string;
    description: string;
    imageUrl: string | null;
}

interface ModalAdicionarSkillProps {
    aberto: boolean;
    skills: Skill[];
    skillsJaCadastradas: number[];
    onFechar: () => void;
    onAdicionar: (
        skillId: number,
        nivel: number
    ) => Promise<void>;
}

export function ModalAdicionarSkill({
    aberto,
    skills,
    skillsJaCadastradas,
    onFechar,
    onAdicionar,
}: ModalAdicionarSkillProps) {

    const { colors } = useTheme();

    const styles = createStyles(colors);

    const [skillSelecionada, setSkillSelecionada] =
        useState<number | null>(null);

    const [nivel, setNivel] = useState(1);

    const [loading, setLoading] = useState(false);

    const [erro, setErro] = useState("");

    const skillsDisponiveis = skills.filter(
        (skill) =>
            !skillsJaCadastradas.includes(skill.id)
    );

    async function adicionar() {
        if (skillSelecionada === null) {
            setErro("Selecione uma Skill.");
            return;
        }

        setErro("");
        setLoading(true);

        try {
            await onAdicionar(
                skillSelecionada,
                nivel
            );

            onFechar();

            setSkillSelecionada(null);
            setNivel(1);
            setErro("");
        } catch (error) {
            setErro(
                error instanceof Error
                    ? error.message
                    : "Erro ao adicionar Skill."
            );
        } finally {
            setLoading(false);
        }
    }

    function fechar() {
        if (loading) {
            return;
        }

        setSkillSelecionada(null);
        setNivel(1);
        setErro("");

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
                            Adicionar Skill
                        </Text>

                        <Pressable
                            style={styles.fechar}
                            onPress={fechar}
                            disabled={loading}
                        >
                            <Text
                                style={
                                    styles.textoFechar
                                }
                            >
                                ×
                            </Text>
                        </Pressable>
                    </View>

                    {/* DESCRIÇÃO */}

                    <Text style={styles.descricao}>
                        Escolha uma Skill e defina seu
                        nível.
                    </Text>

                    {/* LISTA DE SKILLS */}

                    <ScrollView
                        style={styles.lista}
                        contentContainerStyle={
                            styles.listaConteudo
                        }
                    >
                        {skillsDisponiveis.length ===
                        0 ? (
                            <Text
                                style={styles.vazio}
                            >
                                Você já possui todas as
                                Skills disponíveis.
                            </Text>
                        ) : (
                            skillsDisponiveis.map(
                                (skill) => {
                                    const selecionada =
                                        skillSelecionada ===
                                        skill.id;

                                    return (
                                        <Pressable
                                            key={skill.id}
                                            style={[
                                                styles.skill,
                                                selecionada &&
                                                    styles.skillSelecionada,
                                            ]}
                                            onPress={() =>
                                                setSkillSelecionada(
                                                    skill.id
                                                )
                                            }
                                            disabled={
                                                loading
                                            }
                                        >

                                            {/* IMAGEM */}

                                            <View
                                                style={
                                                    styles.imagemContainer
                                                }
                                            >
                                                {skill.imageUrl ? (
                                                    <Image
                                                        source={{
                                                            uri: skill.imageUrl,
                                                        }}
                                                        style={
                                                            styles.imagem
                                                        }
                                                        accessibilityLabel={
                                                            skill.name
                                                        }
                                                    />
                                                ) : (
                                                    <Text
                                                        style={
                                                            styles.imagemVazia
                                                        }
                                                    >
                                                        🖼️
                                                    </Text>
                                                )}
                                            </View>

                                            {/* INFORMAÇÕES */}

                                            <View
                                                style={
                                                    styles.informacoes
                                                }
                                            >
                                                <Text
                                                    style={
                                                        styles.nome
                                                    }
                                                >
                                                    {
                                                        skill.name
                                                    }
                                                </Text>

                                                <Text
                                                    style={
                                                        styles.descricaoSkill
                                                    }
                                                >
                                                    {
                                                        skill.description
                                                    }
                                                </Text>
                                            </View>
                                        </Pressable>
                                    );
                                }
                            )
                        )}
                    </ScrollView>

                    {/* NÍVEL */}

                    <View
                        style={
                            styles.nivelContainer
                        }
                    >
                        <Text
                            style={
                                styles.nivelTitulo
                            }
                        >
                            Nível
                        </Text>

                        <View style={styles.niveis}>
                            {[1, 2, 3, 4, 5].map(
                                (numero) => {
                                    const ativo =
                                        nivel ===
                                        numero;

                                    return (
                                        <Pressable
                                            key={numero}
                                            style={[
                                                styles.nivel,
                                                ativo &&
                                                    styles.nivelAtivo,
                                            ]}
                                            onPress={() =>
                                                setNivel(
                                                    numero
                                                )
                                            }
                                            disabled={
                                                loading
                                            }
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
                                }
                            )}
                        </View>

                        <View
                            style={styles.legenda}
                        >
                            <Text
                                style={
                                    styles.textoLegenda
                                }
                            >
                                1 - Básico
                            </Text>

                            <Text
                                style={
                                    styles.textoLegenda
                                }
                            >
                                5 - Avançado
                            </Text>
                        </View>
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
                            <Text
                                style={
                                    styles.textoCancelar
                                }
                            >
                                Cancelar
                            </Text>
                        </Pressable>

                        <Pressable
                            style={({ pressed }) => [
                                styles.adicionar,
                                pressed &&
                                    styles.adicionarPressionado,
                            ]}
                            onPress={adicionar}
                            disabled={
                                loading ||
                                skillSelecionada ===
                                    null
                            }
                        >
                            <Text
                                style={
                                    styles.textoAdicionar
                                }
                            >
                                {loading
                                    ? "Adicionando..."
                                    : "Adicionar"}
                            </Text>
                        </Pressable>
                    </View>

                </View>
            </View>
        </Modal>
    );
}