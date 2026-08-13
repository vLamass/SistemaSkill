import styles from "./cardResumo.module.css";

interface CardResumoProps {
    valor: number;
    titulo: string;
}

export function CardResumo({
    valor,
    titulo,
}: CardResumoProps) {
    return (
        <div className={styles.card}>
            <strong className={styles.valor}>
                {valor}
            </strong>

            <span className={styles.titulo}>
                {titulo}
            </span>
        </div>
    );
}