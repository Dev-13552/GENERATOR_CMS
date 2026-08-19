import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AppRoutes from "./routes/AppRoutes.jsx";
import { AuthProvider } from "./features/auth/state/AuthContext.jsx";

createRoot(document.getElementById("root")).render(<AuthProvider><AppRoutes /></AuthProvider>);
