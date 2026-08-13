import AsyncStorage from "@react-native-async-storage/async-storage";

const CHAVE_USUARIO = "usuario_salvo";

export async function salvarUsuario(
    usuario: string
) {
    await AsyncStorage.setItem(
        CHAVE_USUARIO,
        usuario
    );
}

export async function obterUsuarioSalvo() {
    return (
        (await AsyncStorage.getItem(
            CHAVE_USUARIO
        )) ?? ""
    );
}

export async function removerUsuarioSalvo() {
    await AsyncStorage.removeItem(
        CHAVE_USUARIO
    );
}