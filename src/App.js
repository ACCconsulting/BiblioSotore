import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";

import Subscriptores from "./componentes/subscriptores/Subscriptores";
import NuevoSubscriptor from "./componentes/subscriptores/NuevoSubscriptor";
import MostrarSubscriptor from "./componentes/subscriptores/MostrarSubscriptor";
import EditarSubscriptor from "./componentes/subscriptores/EditarSubscriptor";
import Navbar from "./componentes/layout/Navbar";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/subscriptores" component={Subscriptores} />
            <Route
              exact
              path="/subscriptores/nuevo"
              component={NuevoSubscriptor}
            />
            <Route
              exact
              path="/subscriptores/:id"
              component={MostrarSubscriptor}
            />
            <Route
              exact
              path="/subscriptores/editar/:id"
              component={EditarSubscriptor}
            />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
