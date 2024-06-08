import { Routes, Route, BrowserRouter } from "react-router-dom";
import App from "./App"
import Register from "./Components/Register";
import Login from "./Components/Login";

function AppRouter(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter