import React, { Component } from "react";
import { Link } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import PropTypes from "prop-types";

class NuevoLibro extends Component {
  state = {
    titulo: "",
    ISBN: "",
    editorial: "",
    existencia: ""
  };

  //Guardamos en la base de datos
  agregarLibro = e => {
    e.preventDefault();

    const nuevoLibro = this.state;

    //Arreglo de interesados
    nuevoLibro.prestados = [];

    const { firestore, history } = this.props;

    firestore
      .add({ collection: "libros" }, nuevoLibro)
      .then(() => history.push("/"));
  };

  //Almancena lo que el usuario escribe en el State
  leerDato = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div className="row">
        <div className="col-12 mb-4">
          <Link to={"/"} className="btn tbn-secundary">
            <i className="fas fa-arrow-circle-left"></i>
            {""} Volcer al listado
          </Link>
        </div>
        <div className="col-12">
          <h2>
            <i className="fas fa-book"></i> Nuevo libro
          </h2>

          <div className="row-justify-content-center">
            <div className="col-md-8 mt-5">
              <form onSubmit={this.agregarLibro}>
                <div className="form-grup">
                  <label>Titulo</label>
                  <input
                    type="text"
                    className="form-control"
                    name="titulo"
                    placeholder="Titulo o nombre del libro"
                    required
                    value={this.state.titulo}
                    onChange={this.leerDato}
                  />
                </div>

                <div className="form-grup">
                  <label>Editorial</label>
                  <input
                    type="text"
                    className="form-control"
                    name="editorial"
                    placeholder="Editorial del  libro"
                    required
                    value={this.state.editorial}
                    onChange={this.leerDato}
                  />
                </div>

                <div className="form-grup">
                  <label>ISBN</label>
                  <input
                    type="text"
                    className="form-control"
                    name="ISBN"
                    placeholder="ISBN del libro"
                    required
                    value={this.state.ISBN}
                    onChange={this.leerDato}
                  />
                </div>

                <div className="form-grup mb-3">
                  <label>Existencia</label>
                  <input
                    type="number"
                    min="0"
                    className="form-control"
                    name="existencia"
                    placeholder="Cantidad de existencia del libro"
                    required
                    value={this.state.existencia}
                    onChange={this.leerDato}
                  />
                </div>
                <input
                  type="submit"
                  value="Agregar libro"
                  className="btn btn-success"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default firestoreConnect()(NuevoLibro);
