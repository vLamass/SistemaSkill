import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

interface Usuario {
  login: string;
}

interface AuthContextData {
  token: string | null;
  usuario: Usuario | null;
  isAuthenticated: boolean;
  carregando: boolean;

  login: (token: string, usuario: Usuario) => Promise<void>;
  logout: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<
  AuthContextData | undefined
>(undefined);

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(null);

  const [usuario, setUsuario] =
    useState<Usuario | null>(null);

  const [carregando, setCarregando] =
    useState(true);

  // =========================
  // CARREGAR LOGIN SALVO
  // =========================

  useEffect(() => {
    async function carregarDados() {
      try {
        const tokenSalvo =
          await AsyncStorage.getItem('token');

        const usuarioSalvo =
          await AsyncStorage.getItem('usuario');

        if (tokenSalvo) {
          setToken(tokenSalvo);
        }

        if (usuarioSalvo) {
          setUsuario(
            JSON.parse(usuarioSalvo)
          );
        }
      } catch (error) {
        console.error(
          'Erro ao carregar autenticação:',
          error
        );
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, []);

  // =========================
  // LOGIN
  // =========================

  async function login(
    token: string,
    usuario: Usuario
  ) {
    await AsyncStorage.setItem(
      'token',
      token
    );

    await AsyncStorage.setItem(
      'usuario',
      JSON.stringify(usuario)
    );

    setToken(token);
    setUsuario(usuario);
  }

  // =========================
  // LOGOUT
  // =========================

  async function logout() {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('usuario');

    setToken(null);
    setUsuario(null);
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        usuario,
        isAuthenticated: !!token,
        carregando,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// =========================
// HOOK
// =========================

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth deve ser usado dentro de um AuthProvider'
    );
  }

  return context;
}