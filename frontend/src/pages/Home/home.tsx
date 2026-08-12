import { useEffect, useState } from "react";

import { Header } from "../../components/Header/header";
import { CardResumo } from "../../components/CardResumo/cardResumo";
import { CardMinhasSkills } from "../../components/CardMinhasSkills/cardMinhasSkills";
import { ModalEditarNivel } from "../../components/ModalEditarNivel/modalEditarNivel";
import { ModalAdicionarSkill } from "../../components/ModalAdicionarSkill/modalAdicionarSkill";

import { useAuth } from "../../contexts/AuthContext";

import styles from "./home.module.css";

interface User {
    id: number;
    login: string;
}

interface UserSkill {
    id: number;
    userId: number;
    skillId: number;
    level: number;
}

interface Skill {
    id: number;
    name: string;
    description: string;
    imageUrl: string | null;
}

interface MinhaSkill {
    id: number;
    skillId: number;
    level: number;
    name: string;
    description: string;
    imageUrl: string | null;
}

export function Home() {
    const { usuario } = useAuth();

    const [skills, setSkills] = useState<MinhaSkill[]>([]);
    const [todasSkills, setTodasSkills] = useState<Skill[]>([]);

    const [loading, setLoading] = useState(true);

    const [modalEditarAberto, setModalEditarAberto] =
        useState(false);

    const [skillSelecionada, setSkillSelecionada] =
        useState<MinhaSkill | null>(null);

    const [modalAdicionarAberto, setModalAdicionarAberto] =
        useState(false);

    const [paginaAtual, setPaginaAtual] = useState(1);

    const skillsPorPagina = 3;

    /*
     * =========================
     * BUSCAR DADOS
     * =========================
     */

    useEffect(() => {
        async function buscarDados() {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    throw new Error(
                        "Usuário não autenticado."
                    );
                }

                if (!usuario?.login) {
                    throw new Error(
                        "Não foi possível identificar o usuário logado."
                    );
                }

                const headers = {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                };

                /*
                 * =========================
                 * BUSCAR TODAS AS SKILLS
                 * =========================
                 */

                const respostaSkills = await fetch(
                    "http://localhost:8080/api/skills",
                    {
                        method: "GET",
                        headers,
                    }
                );

                if (!respostaSkills.ok) {
                    throw new Error(
                        "Erro ao buscar Skills disponíveis."
                    );
                }

                const dadosSkills: Skill[] =
                    await respostaSkills.json();

                setTodasSkills(dadosSkills);

                /*
                 * =========================
                 * BUSCAR USUÁRIOS
                 * =========================
                 *
                 * Precisamos descobrir o ID do
                 * usuário que está logado.
                 */

                const respostaUsers = await fetch(
                    "http://localhost:8080/api/users",
                    {
                        method: "GET",
                        headers,
                    }
                );

                if (!respostaUsers.ok) {
                    throw new Error(
                        "Erro ao buscar usuários."
                    );
                }

                const usuarios: User[] =
                    await respostaUsers.json();

                const usuarioLogado = usuarios.find(
                    (user) =>
                        user.login === usuario.login
                );

                if (!usuarioLogado) {
                    throw new Error(
                        "Usuário logado não foi encontrado."
                    );
                }

                /*
                 * =========================
                 * BUSCAR USER-SKILLS
                 * =========================
                 */

                const respostaUserSkills = await fetch(
                    "http://localhost:8080/api/user-skills",
                    {
                        method: "GET",
                        headers,
                    }
                );

                if (!respostaUserSkills.ok) {
                    throw new Error(
                        "Erro ao buscar Skills do usuário."
                    );
                }

                const todasUserSkills: UserSkill[] =
                    await respostaUserSkills.json();

                /*
                 * =========================
                 * FILTRAR PELO USUÁRIO LOGADO
                 * =========================
                 *
                 * O endpoint retorna as skills de
                 * todos os usuários.
                 *
                 * Aqui pegamos somente as que
                 * pertencem ao usuário logado.
                 */

                const userSkills = todasUserSkills.filter(
                    (userSkill) =>
                        userSkill.userId ===
                        usuarioLogado.id
                );

                /*
                 * =========================
                 * BUSCAR DADOS DAS SKILLS
                 * =========================
                 */

                const minhasSkills: MinhaSkill[] =
                    await Promise.all(
                        userSkills.map(
                            async (userSkill) => {
                                const respostaSkill =
                                    await fetch(
                                        `http://localhost:8080/api/skills/${userSkill.skillId}`,
                                        {
                                            method: "GET",
                                            headers,
                                        }
                                    );

                                if (!respostaSkill.ok) {
                                    throw new Error(
                                        `Erro ao buscar Skill ${userSkill.skillId}.`
                                    );
                                }

                                const skill: Skill =
                                    await respostaSkill.json();

                                return {
                                    id: userSkill.id,
                                    skillId:
                                        userSkill.skillId,
                                    level:
                                        userSkill.level,
                                    name: skill.name,
                                    description:
                                        skill.description,
                                    imageUrl:
                                        skill.imageUrl,
                                };
                            }
                        )
                    );

                setSkills(minhasSkills);

                setPaginaAtual(1);
            } catch (error) {
                console.error(
                    "Erro ao buscar dados:",
                    error
                );

                setSkills([]);
            } finally {
                setLoading(false);
            }
        }

        buscarDados();
    }, [usuario]);

    /*
     * =========================
     * PAGINAÇÃO
     * =========================
     */

    const totalPaginas = Math.ceil(
        skills.length / skillsPorPagina
    );

    const indiceInicial =
        (paginaAtual - 1) * skillsPorPagina;

    const skillsVisiveis = skills.slice(
        indiceInicial,
        indiceInicial + skillsPorPagina
    );

    function paginaAnterior() {
        setPaginaAtual((pagina) =>
            Math.max(pagina - 1, 1)
        );
    }

    function proximaPagina() {
        setPaginaAtual((pagina) =>
            Math.min(
                pagina + 1,
                totalPaginas
            )
        );
    }

    /*
     * =========================
     * EDITAR NÍVEL
     * =========================
     */

    function abrirModalEditarNivel(
        skill: MinhaSkill
    ) {
        setSkillSelecionada(skill);
        setModalEditarAberto(true);
    }

    function fecharModalEditarNivel() {
        setModalEditarAberto(false);
        setSkillSelecionada(null);
    }

    async function salvarNovoNivel(
        novoNivel: number
    ) {
        if (!skillSelecionada) {
            return;
        }

        const token =
            localStorage.getItem("token");

        if (!token) {
            throw new Error(
                "Usuário não autenticado."
            );
        }

        const resposta = await fetch(
            `http://localhost:8080/api/user-skills/${skillSelecionada.id}?level=${novoNivel}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type":
                        "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (!resposta.ok) {
            let mensagem =
                "Erro ao atualizar o nível.";

            try {
                const dados =
                    await resposta.json();

                if (dados.message) {
                    mensagem = dados.message;
                }
            } catch {
                // mantém mensagem padrão
            }

            throw new Error(mensagem);
        }

        const skillAtualizada: UserSkill =
            await resposta.json();

        setSkills((skillsAtuais) =>
            skillsAtuais.map((skill) =>
                skill.id ===
                skillAtualizada.id
                    ? {
                          ...skill,
                          level:
                              skillAtualizada.level,
                      }
                    : skill
            )
        );
    }

    /*
     * =========================
     * ADICIONAR SKILL
     * =========================
     */

    function abrirModalAdicionar() {
        setModalAdicionarAberto(true);
    }

    function fecharModalAdicionar() {
        setModalAdicionarAberto(false);
    }

    async function adicionarSkill(
        skillId: number,
        nivel: number
    ) {
        if (!usuario?.login) {
            throw new Error(
                "Não foi possível identificar o usuário logado."
            );
        }

        const token =
            localStorage.getItem("token");

        if (!token) {
            throw new Error(
                "Usuário não autenticado."
            );
        }

        /*
         * =========================
         * BUSCAR USUÁRIO
         * =========================
         */

        const respostaUsers = await fetch(
            "http://localhost:8080/api/users",
            {
                method: "GET",
                headers: {
                    "Content-Type":
                        "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (!respostaUsers.ok) {
            throw new Error(
                "Erro ao buscar usuários."
            );
        }

        const usuarios: User[] =
            await respostaUsers.json();

        const usuarioLogado =
            usuarios.find(
                (user) =>
                    user.login ===
                    usuario.login
            );

        if (!usuarioLogado) {
            throw new Error(
                "Usuário logado não foi encontrado."
            );
        }

        /*
         * =========================
         * EVITAR DUPLICAR SKILL
         * =========================
         */

        const respostaUserSkills =
            await fetch(
                "http://localhost:8080/api/user-skills",
                {
                    method: "GET",
                    headers: {
                        "Content-Type":
                            "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

        if (!respostaUserSkills.ok) {
            throw new Error(
                "Erro ao verificar Skills do usuário."
            );
        }

        const todasUserSkills: UserSkill[] =
            await respostaUserSkills.json();

        const skillJaExiste =
            todasUserSkills.some(
                (userSkill) =>
                    userSkill.userId ===
                        usuarioLogado.id &&
                    userSkill.skillId ===
                        skillId
            );

        if (skillJaExiste) {
            throw new Error(
                "Você já possui essa Skill cadastrada."
            );
        }

        /*
         * =========================
         * CADASTRAR USER-SKILL
         * =========================
         */

        const resposta = await fetch(
            "http://localhost:8080/api/user-skills",
            {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    userId:
                        usuarioLogado.id,
                    skillId: skillId,
                    level: nivel,
                }),
            }
        );

        if (!resposta.ok) {
            let mensagem =
                "Erro ao adicionar Skill.";

            try {
                const dados =
                    await resposta.json();

                if (dados.message) {
                    mensagem = dados.message;
                }
            } catch {
                // mantém mensagem padrão
            }

            throw new Error(mensagem);
        }

        const novaUserSkill: UserSkill =
            await resposta.json();

        /*
         * =========================
         * ENCONTRAR SKILL
         * =========================
         */

        const skill = todasSkills.find(
            (item) =>
                item.id === skillId
        );

        if (!skill) {
            throw new Error(
                "Skill adicionada, mas seus dados não foram encontrados."
            );
        }

        /*
         * =========================
         * ADICIONAR NA HOME
         * =========================
         */

        const novaSkill: MinhaSkill = {
            id: novaUserSkill.id,
            skillId:
                novaUserSkill.skillId,
            level:
                novaUserSkill.level,
            name: skill.name,
            description:
                skill.description,
            imageUrl: skill.imageUrl,
        };

        setSkills((skillsAtuais) => [
            ...skillsAtuais,
            novaSkill,
        ]);

        /*
         * =========================
         * PAGINAÇÃO
         * =========================
         */

        const novaQuantidade =
            skills.length + 1;

        const novaPagina = Math.ceil(
            novaQuantidade /
                skillsPorPagina
        );

        setPaginaAtual(novaPagina);

        /*
         * FECHAR MODAL
         */

        setModalAdicionarAberto(false);
    }

    /*
     * =========================
     * RESUMO
     * =========================
     */

    const totalSkills =
        skills.length;

    const totalIntermediarias =
        skills.filter(
            (skill) =>
                skill.level === 3
        ).length;

    const totalAvancadas =
        skills.filter(
            (skill) =>
                skill.level === 4 ||
                skill.level === 5
        ).length;

    /*
     * =========================
     * SKILLS JÁ CADASTRADAS
     * =========================
     */

    const skillsJaCadastradas =
        skills.map(
            (skill) =>
                skill.skillId
        );

    /*
     * =========================
     * TELA
     * =========================
     */

    return (
        <main
            className={
                styles.container
            }
        >
            <Header />

            <section
                className={
                    styles.conteudo
                }
            >
                {/* APRESENTAÇÃO */}

                <div
                    className={
                        styles.apresentacao
                    }
                >
                    <div>
                        <h1>
                            Bem-vindo!
                        </h1>

                        <p>
                            Continue
                            desenvolvendo
                            suas
                            habilidades.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={
                            abrirModalAdicionar
                        }
                    >
                        + Adicionar Skill
                    </button>
                </div>

                {/* CARDS DE RESUMO */}

                <section
                    className={
                        styles.resumo
                    }
                >
                    <CardResumo
                        valor={
                            loading
                                ? 0
                                : totalSkills
                        }
                        titulo="Skills"
                    />

                    <CardResumo
                        valor={
                            loading
                                ? 0
                                : totalIntermediarias
                        }
                        titulo="Intermediárias"
                    />

                    <CardResumo
                        valor={
                            loading
                                ? 0
                                : totalAvancadas
                        }
                        titulo="Avançadas"
                    />
                </section>

                {/* MINHAS SKILLS */}

                <section
                    className={
                        styles.minhasSkills
                    }
                >
                    <h2>
                        Minhas Skills
                    </h2>

                    {loading ? (
                        <p>
                            Carregando
                            Skills...
                        </p>
                    ) : skills.length ===
                      0 ? (
                        <p>
                            Você ainda
                            não possui
                            Skills
                            cadastradas.
                        </p>
                    ) : (
                        <>
                            <div
                                className={
                                    styles.listaSkills
                                }
                            >
                                {skillsVisiveis.map(
                                    (
                                        skill
                                    ) => (
                                        <CardMinhasSkills
                                            key={
                                                skill.id
                                            }
                                            nome={
                                                skill.name
                                            }
                                            descricao={
                                                skill.description
                                            }
                                            nivel={
                                                skill.level
                                            }
                                            imagem={
                                                skill.imageUrl
                                            }
                                            onEditarNivel={() =>
                                                abrirModalEditarNivel(
                                                    skill
                                                )
                                            }
                                        />
                                    )
                                )}
                            </div>

                            {/* PAGINAÇÃO */}

                            {totalPaginas >
                                1 && (
                                <div
                                    className={
                                        styles.paginacao
                                    }
                                >
                                    <button
                                        type="button"
                                        onClick={
                                            paginaAnterior
                                        }
                                        disabled={
                                            paginaAtual ===
                                            1
                                        }
                                    >
                                        ←
                                        Anterior
                                    </button>

                                    <span>
                                        Página{" "}
                                        {
                                            paginaAtual
                                        }{" "}
                                        de{" "}
                                        {
                                            totalPaginas
                                        }
                                    </span>

                                    <button
                                        type="button"
                                        onClick={
                                            proximaPagina
                                        }
                                        disabled={
                                            paginaAtual ===
                                            totalPaginas
                                        }
                                    >
                                        Próxima
                                        →
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </section>
            </section>

            {/* MODAL EDITAR NÍVEL */}

            {skillSelecionada && (
                <ModalEditarNivel
                    aberto={
                        modalEditarAberto
                    }
                    nivelAtual={
                        skillSelecionada.level
                    }
                    onFechar={
                        fecharModalEditarNivel
                    }
                    onSalvar={
                        salvarNovoNivel
                    }
                />
            )}

            {/* MODAL ADICIONAR SKILL */}

            <ModalAdicionarSkill
                aberto={
                    modalAdicionarAberto
                }
                skills={
                    todasSkills
                }
                skillsJaCadastradas={
                    skillsJaCadastradas
                }
                onFechar={
                    fecharModalAdicionar
                }
                onAdicionar={
                    adicionarSkill
                }
            />
        </main>
    );
}