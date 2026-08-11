const CHAVE_USUARIO = "usuario_salvo";

export function salvarUsuario(usuario: string) {
    localStorage.setItem(CHAVE_USUARIO, usuario);
}

export function obterUsuarioSalvo() {
    return localStorage.getItem(CHAVE_USUARIO) ?? "";
}

export function removerUsuarioSalvo() {
    localStorage.removeItem(CHAVE_USUARIO);
}