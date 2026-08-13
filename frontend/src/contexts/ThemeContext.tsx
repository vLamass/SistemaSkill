import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

type Tema = "light" | "dark";

type ThemeContextData = {
    tema: Tema;
    alternarTema: () => void;
};

type ThemeProviderProps = {
    children: ReactNode;
};

const ThemeContext = createContext<ThemeContextData | null>(null);

export function ThemeProvider({
    children,
}: ThemeProviderProps) {
    const [tema, setTema] = useState<Tema>(() => {
        const temaSalvo = localStorage.getItem("tema");

        return temaSalvo === "dark" ? "dark" : "light";
    });

    useEffect(() => {
        document.documentElement.setAttribute(
            "data-theme",
            tema
        );

        localStorage.setItem("tema", tema);
    }, [tema]);

    function alternarTema() {
        setTema((temaAtual) =>
            temaAtual === "light"
                ? "dark"
                : "light"
        );
    }

    return (
        <ThemeContext.Provider
            value={{
                tema,
                alternarTema,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);

    if (context === null) {
        throw new Error(
            "useTheme deve ser usado dentro de um ThemeProvider"
        );
    }

    return context;
}