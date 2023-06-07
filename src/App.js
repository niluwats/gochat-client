import { Route, Routes } from "react-router-dom";
import "./App.css";
import Landing from "./components/Landing/Landing";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import Chat from "./components/Chat/Chat";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
