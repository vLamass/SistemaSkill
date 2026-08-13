import styles from "./cardMinhasSkills.module.css";

interface CardMinhasSkillsProps {
  nome: string;
  descricao: string;
  nivel: number;
  imagem?: string | null;
  onEditarNivel?: () => void;
}

export function CardMinhasSkills({
  nome,
  descricao,
  nivel,
  imagem,
  onEditarNivel,
}: CardMinhasSkillsProps) {
  return (
    <div className={styles.card}>
      <div className={styles.conteudo}>
        <div className={styles.imagemContainer}>
          {imagem ? (
            <img
              src={imagem}
              alt={`Imagem da Skill ${nome}`}
              className={styles.imagem}
            />
          ) : (
            <div className={styles.imagemVazia}>🖼️</div>
          )}
        </div>

        <div className={styles.informacoes}>
          <div className={styles.cabecalho}>
            <h3>{nome}</h3>

            <span className={styles.nivel}>Nível {nivel}</span>
          </div>

          <p>{descricao}</p>
        </div>
      </div>

      <button type="button" className={styles.botao} onClick={onEditarNivel}>
        Editar nível
      </button>
    </div>
  );
}
