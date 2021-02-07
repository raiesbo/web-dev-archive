import React, { useState, useEffect } from "react";
import './App.css';

import Home from "./pages/home.page";
import Admin from "./pages/admin.page";

import {
  Switch,
  Route
} from "react-router-dom";


function App() {

  ////////////////////////////
  //DARK MODE//LOCAL STORAGE//
  ////////////////////////////

  const [darkMode, setDarkMode] = useState(false);
  let storedDarkMode = localStorage.getItem("darkMode");

  useEffect(() => {
    if (storedDarkMode === "true") {
      setDarkMode(true);
      document.getElementById("body").classList.toggle("darkmode");
    }
  }, [])

  const darkModeHandler = () => {
    // CLICK ON TOGGLE HANDLER
    setDarkMode(!darkMode)
    document.getElementById("body").classList.toggle("darkmode");
    localStorage.setItem("darkMode", !darkMode)
  }

  // const url = "http://localhost:5000/";
  const url = "https://webdevarchive-server.herokuapp.com/";


  return (
    <div className="App">

      <Switch>

        <Route path="/admin/:action" >
          <Admin url={url}/>
        </Route>

        <Route path="/admin" exact>
          <Admin url={url}/>
        </Route>

        <Route path="/" exact>
          <Home darkModeHandler={darkModeHandler} url={url}/>
        </Route>

      </Switch>

    </div>
  );
}

export default App;
