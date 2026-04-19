import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";

import NavBar from "./components/NavBar";
import ItemCard from "./components/ItemCard";
import PostPage from "./pages/PostPage";
import MainPage from "./pages/Mainpage";
import ProfilePage from "./pages/ProfilePage";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/itemcard" element={<ItemCard />} />
      <Route path="/postpage" element={<PostPage />} />
      <Route path="/NavBar" element={<NavBar />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/profilepage" element={<ProfilePage />} />
    </Routes>
  );
}

export default App;
