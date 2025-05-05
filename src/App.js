import {Route, Routes} from "react-router-dom";
import Layout from "./common/Layout";
import Home from "./common/Home";
import Login from "./common/Login";
import Stores from "./common/Stores";
import Store from "./common/Store";
import Profile from "./common/Profile";
import Projects from "./common/Projects";
import Users from "./common/Users";


const token = localStorage.getItem("token");

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={!token ? <Login/> : <Home/>}/>
                <Route path="/stores" element={!token ? <Login/> : <Stores/>}/>
                <Route path="/stores/:name/:id" element={!token ? <Login/> : <Store/>}/>
                <Route path="/projects" element={!token ? <Login/> : <Projects/>}/>

                <Route path="/profile" element={!token ? <Login/> : <Profile/>}/>
                <Route path="/users" element={!token ? <Login/> : <Users/>}/>

            </Route>
        </Routes>
    );
}

export default App;
