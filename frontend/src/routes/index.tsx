import {
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import { Login } from "../pages/Login/login";
import { Home } from "../pages/Home/home";

import { PrivateRoute } from "./PrivateRoute";

export function RootRoutes() {
    return (
        <Routes>

            <Route
                path="/login"
                element={<Login />}
            />

            <Route element={<PrivateRoute />}>
                <Route
                    path="/home"
                    element={<Home />}
                />
            </Route>

            <Route
                path="*"
                element={
                    <Navigate
                        to="/login"
                        replace
                    />
                }
            />

        </Routes>
    );
}