import { useState } from "react";
import { Route, Routes} from 'react-router-dom'
import WelcomePage from "./components/WelcomePage";
import Login from "./components/Login";
import Header from "./components/Header";


function App() {
  return(
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/login" element={<WelcomePage />} />

    </Routes>
  )
}

export default App;
