import { useState } from "react";
import styles from "./modalAdicionarSkill.module.css";

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
    const [skillSelecionada, setSkillSelecionada] =
        useState<number | null>(null);

    const [nivel, setNivel] = useState(1);

    const [loading, setLoading] = useState(false);

    const [erro, setErro] = useState("");

    if (!aberto) {
        return null;
    }

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
        <div
            className={styles.overlay}
            onClick={fechar}
        >
            <div
                className={styles.modal}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={styles.cabecalho}>
                    <h2>Adicionar Skill</h2>

                    <button
                        type="button"
                        className={styles.fechar}
                        onClick={fechar}
                        disabled={loading}
                    >
                        ×
                    </button>
                </div>

                <p className={styles.descricao}>
                    Escolha uma Skill e defina seu nível.
                </p>

                <div className={styles.lista}>
                    {skillsDisponiveis.length === 0 ? (
                        <p className={styles.vazio}>
                            Você já possui todas as Skills
                            disponíveis.
                        </p>
                    ) : (
                        skillsDisponiveis.map((skill) => (
                            <button
                                key={skill.id}
                                type="button"
                                className={
                                    skillSelecionada ===
                                    skill.id
                                        ? styles.skillSelecionada
                                        : styles.skill
                                }
                                onClick={() =>
                                    setSkillSelecionada(
                                        skill.id
                                    )
                                }
                                disabled={loading}
                            >
                                <div
                                    className={
                                        styles.imagemContainer
                                    }
                                >
                                    {skill.imageUrl ? (
                                        <img
                                            src={
                                                skill.imageUrl
                                            }
                                            alt={skill.name}
                                            className={
                                                styles.imagem
                                            }
                                        />
                                    ) : (
                                        <span>🖼️</span>
                                    )}
                                </div>

                                <div
                                    className={
                                        styles.informacoes
                                    }
                                >
                                    <strong>
                                        {skill.name}
                                    </strong>

                                    <span>
                                        {skill.description}
                                    </span>
                                </div>
                            </button>
                        ))
                    )}
                </div>

                <div className={styles.nivelContainer}>
                    <p>Nível</p>

                    <div className={styles.niveis}>
                        {[1, 2, 3, 4, 5].map(
                            (numero) => (
                                <button
                                    key={numero}
                                    type="button"
                                    className={
                                        nivel === numero
                                            ? styles.nivelAtivo
                                            : styles.nivel
                                    }
                                    onClick={() =>
                                        setNivel(numero)
                                    }
                                    disabled={loading}
                                >
                                    {numero}
                                </button>
                            )
                        )}
                    </div>

                    <div className={styles.legenda}>
                        <span>
                            1 - Básico
                        </span>

                        <span>
                            5 - Avançado
                        </span>
                    </div>
                </div>

                {erro && (
                    <p className={styles.erro}>
                        {erro}
                    </p>
                )}

                <div className={styles.acoes}>
                    <button
                        type="button"
                        className={styles.cancelar}
                        onClick={fechar}
                        disabled={loading}
                    >
                        Cancelar
                    </button>

                    <button
                        type="button"
                        className={styles.adicionar}
                        onClick={adicionar}
                        disabled={
                            loading ||
                            skillSelecionada === null
                        }
                    >
                        {loading
                            ? "Adicionando..."
                            : "Adicionar"}
                    </button>
                </div>
            </div>
        </div>
    );
}