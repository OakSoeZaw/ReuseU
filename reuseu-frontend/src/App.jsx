import { useState } from "react";
import { Route, Routes} from 'react-router-dom'
import WelcomePage from "./components/WelcomePage";
import Login from "./components/Login";
import MainPage from "./components/MainPage";


function App() {
  return(
    
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/main" element={<MainPage />} />

    </Routes>
  )
}

export default App;
