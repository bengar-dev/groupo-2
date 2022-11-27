import { Routes, Route } from "react-router-dom";
import { HelloWorld } from "./components/HelloWorld";

// views
import { SignIn } from "./views/SignIn";
import { Register } from "./views/Register";
import AppContextProvider from "./context/AppContext";

function App() {
  return (
    <AppContextProvider>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<HelloWorld />} />
      </Routes>
    </AppContextProvider>
  );
}

export default App;
