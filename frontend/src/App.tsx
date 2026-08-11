import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import { RootRoutes } from "./routes";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <RootRoutes />
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;