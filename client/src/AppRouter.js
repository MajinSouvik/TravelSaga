import { Routes, Route, BrowserRouter } from "react-router-dom";
import App from "./App"
import Login from "./Components/Login";
import Login2 from "./Components/Login2";
import Register from "./Components/Register";

function AppRouter(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login2 />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter