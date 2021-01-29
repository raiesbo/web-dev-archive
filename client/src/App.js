import React from "react";
import './App.css';

import Home from "./pages/home.page";
import Admin from "./pages/admin.page";

import {
  Switch,
  Route
} from "react-router-dom";


function App() {
  return (
    <div className="App">

      <Switch>

        <Route path="/admin">
          <Admin />
        </Route>

        <Route path="/" >
        <Home />
        </Route>

      </Switch>

    </div>
  );
}

export default App;
