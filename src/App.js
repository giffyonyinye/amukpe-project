import {useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } 
    from 'react-router-dom';

import AuthToken from './auth/authToken';
import Login from "./auth/Login";
import Register from "./auth/Register";
import ForgottenPassword from "./auth/ForgottenPassword";
import Navbar from "./components/navigation/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import JobOpenings from "./pages/JobOpenings";
import axios from "axios";

// const prodApi = "http://localhost:9500/api/";
// const prodURL = "http://localhost:9500/";
const prodApi = "https://amukpe.herokuapp.com/api/";
const prodURL = "https://amukpe.herokuapp.com/";

export default function App(){

    const { token, removeToken, setToken, removeUser, setUser } = AuthToken();
    const [currentComponent, setCurrentComponent] = useState("home");
    const [current_user, setCurrentUser] = useState(null);
    const [changedPassword, setChangedPassword] = useState(false)

    const logout = () => {
        removeToken();
        removeUser();
    }

    useEffect(() => {
        if (token){
            axios({
                method: 'GET',
                url: `${prodApi}current_user/`,
                headers: {
                    'Authorization': token
                }
            }).then((res) => {
                if (res.data.message === false){
                    window.localStorage.clear();
                }else{
                    setCurrentUser(res.data.user);
                }
            });
        }
    }, [token]);

    const reloadUser = () => {
        if (token){
            axios({
                method: 'GET',
                url: `${prodApi}current_user/`,
                headers: {
                    'Authorization': token
                }
            }).then((res) => {
                setCurrentUser(res.data.user);
            });
        }  
    }

    return (
        <>
            <Router>
                <Navbar
                    logout={logout}
                    activeComponent={currentComponent}
                    token={token}
                />
                <Switch>
                    <Route exact path="/">
                        <Home
                            devURL={prodURL}
                        />
                    </Route>
                    <Route exact path="/contact">
                        <h1>contact us</h1>
                    </Route>
                    <Route exact path="/jobopenings">
                        <JobOpenings
                            devURL={prodURL}
                            devApi={prodApi}
                        />
                    </Route>
                    <Route path="/dashboard">
                        {
                            token?
                            <Dashboard
                                devURL={prodURL}
                                devApi={prodApi}
                                logout={logout}
                                token={token}
                                reloadUser={reloadUser}
                                current_user={current_user !== null?current_user:''}
                                setChangedPassword={setChangedPassword}
                                changedPassword={changedPassword}
                            />
                            :
                            <Login
                                setUser={setUser}
                                devApi={prodApi}
                                setCurrentComponent={
                                    () => setCurrentComponent("login")
                                }
                                setToken={setToken}
                            />
                        }
                    </Route>
                    <Route exact path="/login">
                        {
                            token?
                            <Redirect to="/dashboard" />
                            :
                            <Login
                                setUser={setUser}
                                devApi={prodApi}
                                setCurrentComponent={
                                    () => setCurrentComponent("login")
                                }
                                setToken={setToken}
                            />
                        }
                    </Route>
                    <Route exact path="/register">
                        {
                            token?
                            <Redirect to="/dashboard" />
                            :
                            <Register
                                devApi={prodApi}
                            />
                        }
                    </Route>
                    <Route exact path="/forgotten/password">
                        {
                            token?
                            <Redirect to="/dashboard" />
                            :
                            <ForgottenPassword
                                devApi={prodApi}
                                setUser={setUser}
                                setChangedPassword={setChangedPassword}
                                setToken={setToken}
                            />
                        }
                    </Route>
                    <Route>
                        <h1>Not Found</h1>
                    </Route>
                </Switch>
            </Router>
        </>
    )
}
