import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatPage from "./pages/chatPage";
import HomePage from "./pages/homePage";
import Navbar from "./components/navbar";

function App() {
  return (
    <div
      // style={{
      //   backgroundImage: `linear-gradient(to left, rgb(var(--primary)), rgb(var(--secondary)))`,
      // }}
      className=" h-screen bg-gradient-to-r from-secondary to-primary"
    >
      <Router>
        {/* <Navbar></Navbar> */}
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/chats" element={<ChatPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
