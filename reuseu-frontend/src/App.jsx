import { useState } from "react";
import WelcomePage from "./components/WelcomePage";
import Login from "./components/Login";
import Header from "./components/Header";

function HeaderPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#05070b" }}>
      <Header />
    </div>
  );
}

function App() {
    const [page, setPage] = useState("welcome");

      if (page === "welcome") {
        return <WelcomePage onStart={() => setPage("login")} />;
      }

      if (page === "login") {
        return <Login onSuccess={() => setPage("header")} />;
      }

      return <HeaderPage />;
//     const [started, setStarted] = useState(false);
//     return <WelcomePage onStart={() => setStarted(true)} />;
//     if(!started){
//         return <WelcomePage onStart={() => setStarted(true)} />;
//     }
//
//     return(
//         <div>
//             <h2>Login Page</h2>
//             <p>Build next screen in here</p>
//         </div>
//     );
}

export default App;
