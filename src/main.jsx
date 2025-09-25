import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShopContextProvider from "./context/ShopContext.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <ShopContextProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </ShopContextProvider>
    </AuthProvider>
  </BrowserRouter>
);


