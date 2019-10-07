import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";

import Libros from "./componentes/libros/Libros";
import MostrarLibros from "./componentes/libros/MostrarLibro";
import NuevoLibro from "./componentes/libros/NuevoLibro";
import EditarLibro from "./componentes/libros/EditarLibro";
import PrestamoLibro from "./componentes/libros/PrestamoLibro";

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
            <Route exact path="/" component={Libros} />
            <Route exact path="/libros/mostrar/:id" component={MostrarLibros} />
            <Route exact path="/libros/nuevo" component={NuevoLibro} />
            <Route exact path="/libros/editar/:id" component={EditarLibro} />
            <Route
              exact
              path="/libros/prestamo/:id"
              component={PrestamoLibro}
            />

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
