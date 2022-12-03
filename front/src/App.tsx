import { Routes, Route } from "react-router-dom";
import AppContextProvider from "./context/AppContext";

// views
import { SignIn } from "./views/SignIn";
import { Register } from "./views/Register";
import { Dashboard } from "./views/Dashboard";
import { Profil } from "./views/Profil";

function App() {
  return (
    <AppContextProvider>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/profil/:id" element={<Profil />} />
      </Routes>
    </AppContextProvider>
  );
}

export default App;
