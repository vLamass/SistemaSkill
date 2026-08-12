import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    lightColors,
    darkColors,
} from '../theme/colors';

export type Tema = 'light' | 'dark';

interface ThemeContextData {
    tema: Tema;
    alternarTema: () => void;
    colors: typeof lightColors;
}

interface ThemeProviderProps {
    children: ReactNode;
}

const ThemeContext = createContext<
    ThemeContextData | undefined
>(undefined);

export function ThemeProvider({
    children,
}: ThemeProviderProps) {
    const [tema, setTema] = useState<Tema>('light');

    useEffect(() => {
        async function carregarTema() {
            try {
                const temaSalvo =
                    await AsyncStorage.getItem('tema');

                if (temaSalvo === 'dark') {
                    setTema('dark');
                } else {
                    setTema('light');
                }
            } catch (error) {
                console.error(
                    'Erro ao carregar tema:',
                    error
                );
            }
        }

        carregarTema();
    }, []);

    useEffect(() => {
        async function salvarTema() {
            try {
                await AsyncStorage.setItem(
                    'tema',
                    tema
                );
            } catch (error) {
                console.error(
                    'Erro ao salvar tema:',
                    error
                );
            }
        }

        salvarTema();
    }, [tema]);

    function alternarTema() {
        setTema((temaAtual) =>
            temaAtual === 'light'
                ? 'dark'
                : 'light'
        );
    }

    const colors =
        tema === 'dark'
            ? darkColors
            : lightColors;

    return (
        <ThemeContext.Provider
            value={{
                tema,
                alternarTema,
                colors,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error(
            'useTheme deve ser usado dentro de um ThemeProvider'
        );
    }

    return context;
}