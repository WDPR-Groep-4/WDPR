import { Route, Routes } from "react-router-dom";
import HomePage from "./components/pages/home/HomePage";
import { CssBaseline } from "@mui/material";
import Navbar from "./components/navbar/Navbar";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function App() {
    return (
        <div className="App">
            <CssBaseline />
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} exact />
            </Routes>
        </div>
    );
}

export default App;
