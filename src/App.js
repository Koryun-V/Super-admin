import {Route, Routes} from "react-router-dom";
import Layout from "./common/Layout";
import Home from "./common/Home";
import Login from "./common/Login";
import Stores from "./common/Stores";
import Store from "./common/Store";



const token = localStorage.getItem("token");

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={!token ? <Login/> : <Home/>}/>
                <Route path="/stores" element={!token ? <Login/> : <Stores/>}/>
                <Route path="/stores/:name/:id" element={!token ? <Login/> : <Store/>}/>
            </Route>
        </Routes>
    );
}

export default App;
