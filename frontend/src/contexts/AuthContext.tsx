import {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from "react";

interface Usuario {
    login: string;
}

interface AuthContextData {
    token: string | null;
    usuario: Usuario | null;
    isAuthenticated: boolean;
    login: (token: string, usuario: Usuario) => void;
    logout: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextData | undefined>(
    undefined
);

export function AuthProvider({ children }: AuthProviderProps) {
    const [token, setToken] = useState<string | null>(
        localStorage.getItem("token")
    );

    const [usuario, setUsuario] = useState<Usuario | null>(() => {
        const usuarioSalvo = localStorage.getItem("usuario");

        if (!usuarioSalvo) {
            return null;
        }

        return JSON.parse(usuarioSalvo);
    });

    function login(token: string, usuario: Usuario) {
        localStorage.setItem("token", token);
        localStorage.setItem("usuario", JSON.stringify(usuario));

        setToken(token);
        setUsuario(usuario);
    }

    function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");

        setToken(null);
        setUsuario(null);
    }

    return (
        <AuthContext.Provider
            value={{
                token,
                usuario,
                isAuthenticated: !!token,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth deve ser usado dentro de um AuthProvider"
        );
    }

    return context;
}