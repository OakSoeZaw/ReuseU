import { useState } from "react";
import WelcomePage from "./components/WelcomePage";

function App() {
    const [started, setStarted] = useState(false);
    return <WelcomePage onStart={() => setStarted(true)} />;
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
