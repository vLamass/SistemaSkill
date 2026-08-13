import {
    useState,
    type FormEvent,
} from "react";

import {
    Eye,
    EyeOff,
} from "lucide-react";

import styles from "./modalForm.module.css";

export type AuthMode =
    | "login"
    | "cadastro";

interface ModalFormProps {
    mode: AuthMode;

    usuario: string;
    senha: string;
    confirmarSenha: string;

    lembrarUsuario: boolean;

    loading: boolean;
    erro: string;
    sucesso: string;

    onUsuarioChange: (
        value: string
    ) => void;

    onSenhaChange: (
        value: string
    ) => void;

    onConfirmarSenhaChange: (
        value: string
    ) => void;

    onLembrarUsuarioChange: (
        value: boolean
    ) => void;

    onSubmit: (
        e: FormEvent<HTMLFormElement>
    ) => void;

    onChangeMode: (
        mode: AuthMode
    ) => void;
}

export function ModalForm({
    mode,

    usuario,
    senha,
    confirmarSenha,

    lembrarUsuario,

    loading,
    erro,
    sucesso,

    onUsuarioChange,
    onSenhaChange,
    onConfirmarSenhaChange,
    onLembrarUsuarioChange,

    onSubmit,
    onChangeMode,
}: ModalFormProps) {

    const [mostrarSenha, setMostrarSenha] =
        useState(false);

    const [
        mostrarConfirmarSenha,
        setMostrarConfirmarSenha,
    ] = useState(false);

    const isLogin =
        mode === "login";

    return (
        <form
            className={styles.card}
            onSubmit={onSubmit}
        >
            <div
                className={
                    styles.cabecalho
                }
            >
                <h2>
                    {isLogin
                        ? "Bem-vindo"
                        : "Criar conta"}
                </h2>

                <p>
                    {isLogin
                        ? "Insira suas credenciais para acessar o sistema."
                        : "Preencha seus dados para criar sua conta."}
                </p>
            </div>

         

            <div
                className={
                    styles.formulario
                }
            >
                <label htmlFor="usuario">
                    Usuário
                </label>

                <input
                    id="usuario"
                    name="usuario"
                    type="text"
                    placeholder="Digite seu usuário"
                    autoComplete="username"
                    required
                    value={usuario}
                    onChange={(e) =>
                        onUsuarioChange(
                            e.target.value
                        )
                    }
                />
            </div>


            <div
                className={
                    styles.formulario
                }
            >
                <label htmlFor="senha">
                    Senha
                </label>

                <div
                    className={
                        styles.inputSenha
                    }
                >
                    <input
                        id="senha"
                        name="senha"
                        type={
                            mostrarSenha
                                ? "text"
                                : "password"
                        }
                        placeholder="Digite sua senha"
                        autoComplete={
                            isLogin
                                ? "current-password"
                                : "new-password"
                        }
                        required
                        value={senha}
                        onChange={(e) =>
                            onSenhaChange(
                                e.target.value
                            )
                        }
                    />

                    <button
                        type="button"
                        className={
                            styles.botaoOlho
                        }
                        onClick={() =>
                            setMostrarSenha(
                                (valor) =>
                                    !valor
                            )
                        }
                        aria-label={
                            mostrarSenha
                                ? "Ocultar senha"
                                : "Mostrar senha"
                        }
                    >
                        {mostrarSenha ? (
                            <EyeOff size={18} />
                        ) : (
                            <Eye size={18} />
                        )}
                    </button>
                </div>
            </div>

            

            {!isLogin && (
                <div
                    className={
                        styles.formulario
                    }
                >
                    <label htmlFor="confirmarSenha">
                        Confirmar senha
                    </label>

                    <div
                        className={
                            styles.inputSenha
                        }
                    >
                        <input
                            id="confirmarSenha"
                            name="confirmarSenha"
                            type={
                                mostrarConfirmarSenha
                                    ? "text"
                                    : "password"
                            }
                            placeholder="Confirme sua senha"
                            autoComplete="new-password"
                            required
                            value={
                                confirmarSenha
                            }
                            onChange={(e) =>
                                onConfirmarSenhaChange(
                                    e.target.value
                                )
                            }
                        />

                        <button
                            type="button"
                            className={
                                styles.botaoOlho
                            }
                            onClick={() =>
                                setMostrarConfirmarSenha(
                                    (valor) =>
                                        !valor
                                )
                            }
                            aria-label={
                                mostrarConfirmarSenha
                                    ? "Ocultar confirmação de senha"
                                    : "Mostrar confirmação de senha"
                            }
                        >
                            {mostrarConfirmarSenha ? (
                                <EyeOff
                                    size={18}
                                />
                            ) : (
                                <Eye
                                    size={18}
                                />
                            )}
                        </button>
                    </div>
                </div>
            )}

            

            {isLogin && (
                <label
                    className={
                        styles.lembrar
                    }
                >
                    <input
                        type="checkbox"
                        checked={
                            lembrarUsuario
                        }
                        onChange={(e) =>
                            onLembrarUsuarioChange(
                                e.target.checked
                            )
                        }
                    />

                    <span>
                        Lembrar-me
                    </span>
                </label>
            )}

           

            <button
                type="submit"
                className={
                    styles.botaoSubmit
                }
                disabled={loading}
            >
                {loading
                    ? "Aguarde..."
                    : isLogin
                        ? "Entrar"
                        : "Cadastrar"}
            </button>

           

            {sucesso && (
                <p
                    className={
                        styles.sucesso
                    }
                    role="status"
                >
                    {sucesso}
                </p>
            )}

           

            {erro && (
                <p
                    className={
                        styles.erro
                    }
                    role="alert"
                >
                    {erro}
                </p>
            )}

            

            <div
                className={
                    styles.alternativa
                }
            >
                <span>
                    {isLogin
                        ? "Não possui conta?"
                        : "Já possui uma conta?"}
                </span>

                <button
                    type="button"
                    onClick={() =>
                        onChangeMode(
                            isLogin
                                ? "cadastro"
                                : "login"
                        )
                    }
                >
                    {isLogin
                        ? "Cadastre-se"
                        : "Entrar"}
                </button>
            </div>
        </form>
    );
}