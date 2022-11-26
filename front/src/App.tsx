import { Routes, Route } from "react-router-dom";

// views
import { SignIn } from "./views/SignIn";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
    </Routes>
  );
}

export default App;
