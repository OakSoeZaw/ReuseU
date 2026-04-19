import { useState } from "react";
import { Route, Routes} from 'react-router-dom'
import WelcomePage from "./components/WelcomePage";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import ItemCard from "./components/ItemCard"
import PostPage from "./components/PostPage"

function App() {
  return(
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/itemcard" element={<ItemCard />} />
      <Route path="/postpage" element={<PostPage />} />
    </Routes>
  )
}

export default App;
