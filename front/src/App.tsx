import { Routes, Route } from "react-router-dom";
import AppContextProvider from "./context/AppContext";

// views
import { SignIn } from "./views/SignIn";
import { Register } from "./views/Register";
import { Dashboard } from "./views/Dashboard";
import { Profil } from "./views/Profil";
import { EditProfil } from "./views/EditProfil";

function App() {
  return (
    <AppContextProvider>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/profil/:id" element={<Profil />} />
        <Route path="/dashboard/edit-profil" element={<EditProfil />} />
      </Routes>
    </AppContextProvider>
  );
}

export default App;
