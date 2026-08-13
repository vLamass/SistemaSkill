import { useState, type FormEvent } from "react";

import {
    ModalForm,
    type AuthMode,
} from "../../components/ModalForm/modalForm";

import { useAuth } from "../../contexts/AuthContext";

import styles from "./login.module.css";

export function Login() {
    const [mode, setMode] =
        useState<AuthMode>("login");

    const [usuario, setUsuario] =
        useState("");

    const [senha, setSenha] =
        useState("");

    const [confirmarSenha, setConfirmarSenha] =
        useState("");

    const [lembrarUsuario, setLembrarUsuario] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const [erro, setErro] =
        useState("");

    const [sucesso, setSucesso] =
        useState("");

    const { login } = useAuth();

    async function fazerLogin(
        e: FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        setErro("");
        setSucesso("");
        setLoading(true);

        try {
            const resposta = await fetch(
                "http://localhost:8080/api/auth/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",
                    },

                    body: JSON.stringify({
                        login: usuario,
                        password: senha,
                    }),
                }
            );

            const dados =
                await resposta.json();

            console.log(
                "RESPOSTA DO LOGIN:",
                dados
            );

            if (!resposta.ok) {
                throw new Error(
                    dados.message ||
                        "Usuário ou senha inválidos."
                );
            }

            /*
             * Salva o token e os dados
             * do usuário no AuthContext.
             */

            login(dados.token, {
                login: usuario,
            });

            /*
             * Vai para a Home depois
             * do login.
             */

            window.location.href = "/home";

        } catch (error) {
            setErro(
                error instanceof Error
                    ? error.message
                    : "Erro ao realizar login."
            );
        } finally {
            setLoading(false);
        }
    }

    async function fazerCadastro(
        e: FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        setErro("");
        setSucesso("");

        /*
         * Verifica se as senhas
         * são iguais.
         */

        if (senha !== confirmarSenha) {
            setErro(
                "As senhas não coincidem."
            );

            return;
        }

        setLoading(true);

        try {
            const resposta = await fetch(
                "http://localhost:8080/api/auth/register",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",
                    },

                    body: JSON.stringify({
                        login: usuario,
                        password: senha,
                    }),
                }
            );

            const dados =
                await resposta.json();

            if (!resposta.ok) {
                throw new Error(
                    dados.message ||
                        "Erro ao realizar cadastro."
                );
            }

            /*
             * Cadastro realizado com sucesso.
             */

            setSucesso(
                "Cadastro realizado com sucesso!"
            );

            /*
             * Limpa os campos de senha.
             */

            setSenha("");
            setConfirmarSenha("");

            /*
             * Aguarda 1,5 segundo mostrando
             * a mensagem verde e depois
             * volta para o login.
             */

            setTimeout(() => {
                setSucesso("");
                setMode("login");
            }, 3000);

        } catch (error) {
            setErro(
                error instanceof Error
                    ? error.message
                    : "Erro ao realizar cadastro."
            );
        } finally {
            setLoading(false);
        }
    }

    function trocarModo(
        novoModo: AuthMode
    ) {
        setErro("");
        setSucesso("");

        setSenha("");
        setConfirmarSenha("");

        setMode(novoModo);
    }

    const handleSubmit =
        mode === "login"
            ? fazerLogin
            : fazerCadastro;

    return (
        <main className={styles.container}>

            <section
                className={styles.esquerda}
            >
                <div className={styles.conteudoEsquerda}>
    <h1>Sistema Skills</h1>

    <p className={styles.descricaoProjeto}>
        Uma plataforma para organizar suas habilidades,
        acompanhar seus níveis de conhecimento e visualizar
        seu desenvolvimento.
    </p>

    <div className={styles.beneficios}>
        <div className={styles.beneficio}>
            <strong>Organize suas Skills</strong>
            <span>
                Cadastre e mantenha suas habilidades
                organizadas em um só lugar.
            </span>
        </div>

        <div className={styles.beneficio}>
            <strong>Acompanhe seus níveis</strong>
            <span>
                Defina seu nível de conhecimento
                em cada habilidade.
            </span>
        </div>

        <div className={styles.beneficio}>
            <strong>Visualize seu desenvolvimento</strong>
            <span>
                Tenha uma visão geral das suas Skills
                e acompanhe sua evolução.
            </span>
        </div>
    </div>
</div>
            </section>

            <section
                className={styles.direita}
            >
                <ModalForm
                    mode={mode}

                    usuario={usuario}

                    senha={senha}

                    confirmarSenha={
                        confirmarSenha
                    }

                    lembrarUsuario={
                        lembrarUsuario
                    }

                    loading={loading}

                    erro={erro}

                    sucesso={sucesso}

                    onUsuarioChange={
                        setUsuario
                    }

                    onSenhaChange={
                        setSenha
                    }

                    onConfirmarSenhaChange={
                        setConfirmarSenha
                    }

                    onLembrarUsuarioChange={
                        setLembrarUsuario
                    }

                    onSubmit={
                        handleSubmit
                    }

                    onChangeMode={
                        trocarModo
                    }
                />
            </section>

        </main>
    );
}