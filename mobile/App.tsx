import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AuthProvider, useAuth } from "./src/context/AuthContext";
import { ThemeProvider } from "./src/context/ThemeContext";

import Welcome from "./src/pages/Welcome/welcome";
import Login from "./src/pages/Login/login";
import Home from "./src/pages/Home/home";

export type RootStackParamList = {
    Welcome: undefined;
    Login: undefined;
    Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function Routes() {
    const { isAuthenticated } = useAuth();

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                {isAuthenticated ? (
                    <Stack.Screen
                        name="Home"
                        component={Home}
                    />
                ) : (
                    <>
                        <Stack.Screen
                            name="Welcome"
                            component={Welcome}
                        />

                        <Stack.Screen
                            name="Login"
                            component={Login}
                        />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <Routes />
            </AuthProvider>
        </ThemeProvider>
    );
}