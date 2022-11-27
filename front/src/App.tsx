import { Routes, Route } from "react-router-dom";
import { HelloWorld } from "./components/HelloWorld";

// views
import { SignIn } from "./views/SignIn";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/dashboard" element={<HelloWorld />} />
    </Routes>
  );
}

export default App;
