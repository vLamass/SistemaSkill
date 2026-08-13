import { useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import {
    createNativeStackNavigator,
} from "@react-navigation/native-stack";

import Welcome from "../pages/Welcome/welcome";
import Login from "../pages/Login/login";
import Home from "../pages/Home/home";

import { useAuth } from "../context/AuthContext";

export type RootStackParamList = {
    Welcome: undefined;
    Login: undefined;
    Home: undefined;
};

const Stack =
    createNativeStackNavigator<RootStackParamList>();

export function RootRoutes() {
    const { isAuthenticated } = useAuth();

    const [mostrarWelcome, setMostrarWelcome] =
        useState(true);

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
                ) : mostrarWelcome ? (
                    <Stack.Screen name="Welcome">
                        {({ navigation }) => (
                            <Welcome
                                onComecar={() => {
                                    setMostrarWelcome(false);

                                    navigation.navigate("Login");
                                }}
                            />
                        )}
                    </Stack.Screen>
                ) : (
                    <Stack.Screen
                        name="Login"
                        component={Login}
                    />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}