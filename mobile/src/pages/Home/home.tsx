import { useEffect, useState } from 'react';

import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    Text,
    View,
} from 'react-native';

import { Header } from '../../components/Header/header';
import { CardResumo } from '../../components/CardResumo/cardResumo';
import { CardMinhasSkills } from '../../components/CardMinhasSkills/cardMinhasSkills';
import { ModalEditarNivel } from '../../components/ModalEditarNivel/modalEditarNivel';
import { ModalAdicionarSkill } from '../../components/ModalAdicionarSkill/modalAdicionarSkill';

import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

import { createStyles } from './home.styles';

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

export default function Home() {
    const { usuario, token } = useAuth();

    const { colors } = useTheme();

    const styles = createStyles(colors);

    const [skills, setSkills] = useState<MinhaSkill[]>([]);
    const [todasSkills, setTodasSkills] = useState<Skill[]>([]);

    /*
     * ID do usuário encontrado através
     * do login no endpoint /api/users
     */
    const [usuarioId, setUsuarioId] =
        useState<number | null>(null);

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
                setLoading(true);

                if (!token) {
                    console.log(
                        'Token não encontrado.'
                    );

                    setSkills([]);
                    return;
                }

                if (!usuario?.login) {
                    console.log(
                        'Usuário não identificado.'
                    );

                    setSkills([]);
                    return;
                }

                const headers = {
                    'Content-Type':
                        'application/json',

                    Authorization:
                        `Bearer ${token}`,
                };

                /*
                 * =========================
                 * BUSCAR USUÁRIOS
                 * =========================
                 *
                 * O AuthContext possui somente
                 * o login.
                 *
                 * Então buscamos /api/users
                 * para descobrir o ID.
                 */

                const respostaUsers =
                    await fetch(
                        'http://localhost:8080/api/users',
                        {
                            method: 'GET',
                            headers,
                        }
                    );

                if (!respostaUsers.ok) {
                    throw new Error(
                        'Erro ao buscar usuários.'
                    );
                }

                const usuarios: User[] =
                    await respostaUsers.json();

                /*
                 * Encontrar o usuário logado
                 * através do login.
                 */

                const usuarioLogado =
                    usuarios.find(
                        (user) =>
                            user.login ===
                            usuario.login
                    );

                if (!usuarioLogado) {
                    throw new Error(
                        'Usuário logado não foi encontrado.'
                    );
                }

                /*
                 * Guardar o ID para usar
                 * posteriormente.
                 */

                const idUsuario =
                    usuarioLogado.id;

                setUsuarioId(idUsuario);

                console.log(
                    'Usuário logado:',
                    usuarioLogado
                );

                /*
                 * =========================
                 * BUSCAR TODAS AS SKILLS
                 * =========================
                 */

                const respostaSkills =
                    await fetch(
                        'http://localhost:8080/api/skills',
                        {
                            method: 'GET',
                            headers,
                        }
                    );

                if (!respostaSkills.ok) {
                    throw new Error(
                        'Erro ao buscar Skills disponíveis.'
                    );
                }

                const dadosSkills: Skill[] =
                    await respostaSkills.json();

                setTodasSkills(
                    dadosSkills
                );

                /*
                 * =========================
                 * BUSCAR USER-SKILLS
                 * =========================
                 *
                 * Esse endpoint retorna
                 * user-skills de todos os
                 * usuários.
                 */

                const respostaUserSkills =
                    await fetch(
                        'http://localhost:8080/api/user-skills',
                        {
                            method: 'GET',
                            headers,
                        }
                    );

                if (!respostaUserSkills.ok) {
                    throw new Error(
                        'Erro ao buscar Skills do usuário.'
                    );
                }

                const todasUserSkills:
                    UserSkill[] =
                    await respostaUserSkills.json();

                /*
                 * =========================
                 * FILTRAR PELO USUÁRIO
                 * =========================
                 *
                 * Aqui está a parte mais
                 * importante.
                 *
                 * Só ficam as skills que
                 * pertencem ao usuário logado.
                 */

                const userSkills =
                    todasUserSkills.filter(
                        (userSkill) =>
                            Number(
                                userSkill.userId
                            ) ===
                            Number(
                                idUsuario
                            )
                    );

                console.log(
                    'Todas as UserSkills:',
                    todasUserSkills
                );

                console.log(
                    'UserSkills do usuário:',
                    userSkills
                );

                /*
                 * =========================
                 * BUSCAR DADOS DAS SKILLS
                 * =========================
                 */

                const minhasSkills:
                    MinhaSkill[] =
                    await Promise.all(
                        userSkills.map(
                            async (
                                userSkill
                            ) => {
                                const respostaSkill =
                                    await fetch(
                                        `http://localhost:8080/api/skills/${userSkill.skillId}`,
                                        {
                                            method: 'GET',
                                            headers,
                                        }
                                    );

                                if (
                                    !respostaSkill.ok
                                ) {
                                    throw new Error(
                                        `Erro ao buscar Skill ${userSkill.skillId}.`
                                    );
                                }

                                const skill:
                                    Skill =
                                    await respostaSkill.json();

                                return {
                                    id:
                                        userSkill.id,

                                    skillId:
                                        userSkill.skillId,

                                    level:
                                        userSkill.level,

                                    name:
                                        skill.name,

                                    description:
                                        skill.description,

                                    imageUrl:
                                        skill.imageUrl,
                                };
                            }
                        )
                    );

                setSkills(
                    minhasSkills
                );

                setPaginaAtual(1);
            } catch (error) {
                console.error(
                    'Erro ao buscar dados:',
                    error
                );

                setSkills([]);
            } finally {
                setLoading(false);
            }
        }

        buscarDados();
    }, [
        token,
        usuario?.login,
    ]);

    /*
     * =========================
     * PAGINAÇÃO
     * =========================
     */

    const totalPaginas = Math.ceil(
        skills.length /
            skillsPorPagina
    );

    const indiceInicial =
        (paginaAtual - 1) *
        skillsPorPagina;

    const skillsVisiveis =
        skills.slice(
            indiceInicial,
            indiceInicial +
                skillsPorPagina
        );

    function paginaAnterior() {
        setPaginaAtual(
            (pagina) =>
                Math.max(
                    pagina - 1,
                    1
                )
        );
    }

    function proximaPagina() {
        setPaginaAtual(
            (pagina) =>
                Math.min(
                    pagina + 1,
                    Math.max(
                        totalPaginas,
                        1
                    )
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
            throw new Error(
                'Nenhuma Skill selecionada.'
            );
        }

        if (!token) {
            throw new Error(
                'Usuário não autenticado.'
            );
        }

        const resposta =
            await fetch(
                `http://localhost:8080/api/user-skills/${skillSelecionada.id}?level=${novoNivel}`,
                {
                    method: 'PUT',

                    headers: {
                        'Content-Type':
                            'application/json',

                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );

        if (!resposta.ok) {
            let mensagem =
                'Erro ao atualizar o nível.';

            try {
                const dados =
                    await resposta.json();

                if (dados.message) {
                    mensagem =
                        dados.message;
                }
            } catch {
                // mantém mensagem padrão
            }

            throw new Error(
                mensagem
            );
        }

        const skillAtualizada:
            UserSkill =
            await resposta.json();

        setSkills(
            (skillsAtuais) =>
                skillsAtuais.map(
                    (skill) =>
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

        fecharModalEditarNivel();
    }

    /*
     * =========================
     * ADICIONAR SKILL
     * =========================
     */

    function abrirModalAdicionar() {
        setModalAdicionarAberto(
            true
        );
    }

    function fecharModalAdicionar() {
        setModalAdicionarAberto(
            false
        );
    }

    async function adicionarSkill(
        skillId: number,
        nivel: number
    ) {
        /*
         * Precisamos ter o ID encontrado
         * através do /api/users.
         */

        if (!usuarioId) {
            throw new Error(
                'Não foi possível identificar o ID do usuário logado.'
            );
        }

        if (!token) {
            throw new Error(
                'Usuário não autenticado.'
            );
        }

        /*
         * =========================
         * VERIFICAR DUPLICIDADE
         * =========================
         */

        const jaPossuiSkill =
            skills.some(
                (skill) =>
                    Number(
                        skill.skillId
                    ) ===
                    Number(
                        skillId
                    )
            );

        if (jaPossuiSkill) {
            throw new Error(
                'Você já possui essa Skill cadastrada.'
            );
        }

        /*
         * =========================
         * ADICIONAR USER-SKILL
         * =========================
         */

        const resposta =
            await fetch(
                'http://localhost:8080/api/user-skills',
                {
                    method: 'POST',

                    headers: {
                        'Content-Type':
                            'application/json',

                        Authorization:
                            `Bearer ${token}`,
                    },

                    body: JSON.stringify({
                        userId:
                            usuarioId,

                        skillId:
                            skillId,

                        level:
                            nivel,
                    }),
                }
            );

        if (!resposta.ok) {
            let mensagem =
                'Erro ao adicionar Skill.';

            try {
                const dados =
                    await resposta.json();

                if (dados.message) {
                    mensagem =
                        dados.message;
                }
            } catch {
                // mantém mensagem padrão
            }

            /*
             * Trata também o erro
             * de skill duplicada.
             */

            if (
                mensagem.includes(
                    'duplicate'
                ) ||
                mensagem.includes(
                    'uk_user_skill'
                )
            ) {
                mensagem =
                    'Você já possui essa Skill cadastrada.';
            }

            throw new Error(
                mensagem
            );
        }

        const novaUserSkill:
            UserSkill =
            await resposta.json();

        /*
         * =========================
         * ENCONTRAR A SKILL
         * =========================
         */

        const skill =
            todasSkills.find(
                (item) =>
                    Number(
                        item.id
                    ) ===
                    Number(
                        skillId
                    )
            );

        if (!skill) {
            throw new Error(
                'Skill adicionada, mas os dados dela não foram encontrados.'
            );
        }

        /*
         * =========================
         * CRIAR MINHA SKILL
         * =========================
         */

        const novaSkill:
            MinhaSkill = {
                id:
                    novaUserSkill.id,

                skillId:
                    novaUserSkill.skillId,

                level:
                    novaUserSkill.level,

                name:
                    skill.name,

                description:
                    skill.description,

                imageUrl:
                    skill.imageUrl,
            };

        /*
         * =========================
         * ATUALIZAR LISTA
         * =========================
         */

        setSkills(
            (skillsAtuais) => [
                ...skillsAtuais,
                novaSkill,
            ]
        );

        /*
         * =========================
         * ATUALIZAR PAGINAÇÃO
         * =========================
         */

        const novaQuantidade =
            skills.length + 1;

        const novaPagina =
            Math.ceil(
                novaQuantidade /
                    skillsPorPagina
            );

        setPaginaAtual(
            Math.max(
                novaPagina,
                1
            )
        );

        fecharModalAdicionar();
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
        <View
            style={styles.container}
        >
            <Header />

            <ScrollView
                contentContainerStyle={
                    styles.scrollContent
                }
                showsVerticalScrollIndicator={
                    false
                }
            >
                <View
                    style={
                        styles.conteudo
                    }
                >
                    {/* APRESENTAÇÃO */}

                    <View
                        style={
                            styles.apresentacao
                        }
                    >
                        <View
                            style={
                                styles.apresentacaoTexto
                            }
                        >
                            <Text
                                style={
                                    styles.titulo
                                }
                            >
                                Bem-vindo!
                            </Text>

                            <Text
                                style={
                                    styles.subtitulo
                                }
                            >
                                Continue
                                desenvolvendo
                                suas
                                habilidades.
                            </Text>
                        </View>

                        <Pressable
                            style={
                                styles.botaoAdicionar
                            }
                            onPress={
                                abrirModalAdicionar
                            }
                        >
                            <Text
                                style={
                                    styles.botaoAdicionarTexto
                                }
                            >
                                + Adicionar
                                Skill
                            </Text>
                        </Pressable>
                    </View>

                    {/* CARDS DE RESUMO */}

                    <View
                        style={
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
                    </View>

                    {/* MINHAS SKILLS */}

                    <View
                        style={
                            styles.minhasSkills
                        }
                    >
                        <Text
                            style={
                                styles.tituloSecao
                            }
                        >
                            Minhas Skills
                        </Text>

                        {loading ? (
                            <View
                                style={
                                    styles.carregando
                                }
                            >
                                <ActivityIndicator
                                    size="small"
                                    color={
                                        colors.primary
                                    }
                                />

                                <Text
                                    style={
                                        styles.textoSecundario
                                    }
                                >
                                    Carregando
                                    Skills...
                                </Text>
                            </View>
                        ) : skills.length ===
                          0 ? (
                            <Text
                                style={
                                    styles.textoSecundario
                                }
                            >
                                Você ainda
                                não possui
                                Skills
                                cadastradas.
                            </Text>
                        ) : (
                            <>
                                <View
                                    style={
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
                                </View>

                                {/* PAGINAÇÃO */}

                                {totalPaginas >
                                    1 && (
                                    <View
                                        style={
                                            styles.paginacao
                                        }
                                    >
                                        <Pressable
                                            onPress={
                                                paginaAnterior
                                            }
                                            disabled={
                                                paginaAtual ===
                                                1
                                            }
                                            style={[
                                                styles.botaoPagina,

                                                paginaAtual ===
                                                    1 &&
                                                    styles.botaoPaginaDisabled,
                                            ]}
                                        >
                                            <Text
                                                style={
                                                    styles.botaoPaginaTexto
                                                }
                                            >
                                                ←
                                                Anterior
                                            </Text>
                                        </Pressable>

                                        <Text
                                            style={
                                                styles.paginaTexto
                                            }
                                        >
                                            Página{' '}
                                            {
                                                paginaAtual
                                            }{' '}
                                            de{' '}
                                            {
                                                totalPaginas
                                            }
                                        </Text>

                                        <Pressable
                                            onPress={
                                                proximaPagina
                                            }
                                            disabled={
                                                paginaAtual ===
                                                totalPaginas
                                            }
                                            style={[
                                                styles.botaoPagina,

                                                paginaAtual ===
                                                    totalPaginas &&
                                                    styles.botaoPaginaDisabled,
                                            ]}
                                        >
                                            <Text
                                                style={
                                                    styles.botaoPaginaTexto
                                                }
                                            >
                                                Próxima
                                                →
                                            </Text>
                                        </Pressable>
                                    </View>
                                )}
                            </>
                        )}
                    </View>
                </View>
            </ScrollView>

            {/* MODAL EDITAR */}

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

            {/* MODAL ADICIONAR */}

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
        </View>
    );
}