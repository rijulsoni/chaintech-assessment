import { Routes, Route } from "react-router";
import Signup from "./components/Signup";
import Login from "./components/Login";
import User from "./components/User";

function App() {

  return (
    <Routes>
    <Route index element={<Login />} />
    <Route path="signup" element={<Signup />} />
    <Route path="/user/:userId" element={<User/>} />
    <Route path="/edit/:userId" element={<Signup />} />
    EditDatails
  </Routes>

  );
}

export default App;
