import { useState } from "react";
import { Route, Routes} from 'react-router-dom'
import WelcomePage from "./components/WelcomePage";
import Login from "./components/Login";
import Header from "./components/NavBar";


function App() {
  return(
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/login" element={<Login />} />

    </Routes>
  )
}

export default App;
