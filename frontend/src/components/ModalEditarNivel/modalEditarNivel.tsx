import { useState } from "react";
import styles from "./modalEditarNivel.module.css";

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
    const [nivel, setNivel] = useState(nivelAtual);
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState("");

    if (!aberto) {
        return null;
    }

    async function salvar() {
        setErro("");
        setLoading(true);

        try {
            await onSalvar(nivel);
            onFechar();
        } catch (error) {
            setErro(
                error instanceof Error
                    ? error.message
                    : "Erro ao atualizar o nível."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div
            className={styles.overlay}
            onClick={onFechar}
        >
            <div
                className={styles.modal}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={styles.cabecalho}>
                    <h2>Editar nível</h2>

                    <button
                        className={styles.fechar}
                        onClick={onFechar}
                        type="button"
                    >
                        ×
                    </button>
                </div>

                <p className={styles.descricao}>
                    Selecione o novo nível da sua Skill.
                </p>

                <div className={styles.niveis}>
                    {[1, 2, 3, 4, 5].map((numero) => (
                        <button
                            key={numero}
                            type="button"
                            className={
                                nivel === numero
                                    ? styles.nivelAtivo
                                    : styles.nivel
                            }
                            onClick={() => setNivel(numero)}
                        >
                            {numero}
                        </button>
                    ))}
                </div>

                <div className={styles.legenda}>
                    <span>1 - Básico</span>
                    <span>5 - Avançado</span>
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
                        onClick={onFechar}
                        disabled={loading}
                    >
                        Cancelar
                    </button>

                    <button
                        type="button"
                        className={styles.salvar}
                        onClick={salvar}
                        disabled={loading}
                    >
                        {loading ? "Salvando..." : "Salvar"}
                    </button>
                </div>
            </div>
        </div>
    );
}