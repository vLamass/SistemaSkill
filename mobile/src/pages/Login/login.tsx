import { useState } from "react";
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    View,
} from "react-native";

import {
    ModalForm,
    type AuthMode,
} from "../../components/ModalForm/modalForm";

import { useAuth } from "../../context/AuthContext";

import { styles } from "./login.styles";

export default function Login() {
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

    /*
     * LOGIN
     */
    async function fazerLogin() {
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
             * Salva no AuthContext
             */
            login(dados.token, {
                login: usuario,
            });

            /*
             * IMPORTANTE:
             *
             * No React Native não existe:
             *
             * window.location.href
             *
             * A navegação deve ser feita
             * pelo seu sistema de rotas.
             *
             * Se sua aplicação usa navegação
             * automática baseada no AuthContext,
             * não precisa fazer nada aqui.
             */
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

    /*
     * CADASTRO
     */
    async function fazerCadastro() {
        setErro("");
        setSucesso("");

        /*
         * Verifica as senhas
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
             * Cadastro realizado
             */
            setSucesso(
                "Cadastro realizado com sucesso!"
            );

            /*
             * Limpa senhas
             */
            setSenha("");
            setConfirmarSenha("");

            /*
             * Volta para login depois de 3 segundos
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

    /*
     * TROCAR LOGIN / CADASTRO
     */
    function trocarModo(
        novoModo: AuthMode
    ) {
        setErro("");
        setSucesso("");

        setSenha("");
        setConfirmarSenha("");

        setMode(novoModo);
    }

    /*
     * TELA
     */
    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={
                Platform.OS === "ios"
                    ? "padding"
                    : undefined
            }
        >
            <ScrollView
                contentContainerStyle={
                    styles.scrollContent
                }
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >

                <View
                    style={styles.direita}
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
                            mode === "login"
                                ? fazerLogin
                                : fazerCadastro
                        }

                        onChangeMode={
                            trocarModo
                        }
                    />
                </View>

                {loading && (
                    <ActivityIndicator
                        style={
                            styles.loading
                        }
                        color="#B88746"
                    />
                )}
            </ScrollView>
        </KeyboardAvoidingView>
    );
}