import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";

import styles from "./header.module.css";

export function Header() {
    const { usuario, logout } = useAuth();
    const { tema, alternarTema } = useTheme();

    function sair() {
        logout();
        window.location.href = "/";
    }

    return (
        <header className={styles.header}>

            <div className={styles.logo}>
                Sistema Skills
            </div>

            <div className={styles.direita}>

                <span className={styles.usuario}>
                    {usuario?.login || "Usuário"}
                </span>

                <button
                    type="button"
                    className={styles.botaoTema}
                    onClick={alternarTema}
                    aria-label="Alterar tema"
                >
                    {tema === "light" ? "🌙" : "☀️"}
                </button>

                <button
                    type="button"
                    className={styles.botaoSair}
                    onClick={sair}
                >
                    Sair
                </button>

            </div>

        </header>
    );
}