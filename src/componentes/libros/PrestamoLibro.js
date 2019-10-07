import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "../layout/spinner";

import FichaSuscriptor from "../subscriptores/FichaSuscriptor";

class PrestamoLibro extends Component {
  state = {
    noResultados: false,
    busqueda: "",
    resultado: {}
  };

  solicitarPrestamo = () => {
    const suscriptor = this.state.resultado;
    suscriptor.fecha_solicitud = new Date().toDateString();

    const libroActualizado = this.props.libro;

    libroActualizado.prestados.push(suscriptor);

    const { firestore, history } = this.props;

    firestore
      .update(
        {
          collection: "libros",
          doc: libroActualizado.id
        },
        libroActualizado
      )
      .then(history.push("/"));
  };
  leerDato = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  buscarAlumno = e => {
    e.preventDefault();
    const { busqueda } = this.state;

    const { firestore } = this.props;

    const coleccion = firestore.collection("subscriptores");
    const consulta = coleccion.where("matricula", "==", busqueda).get();

    consulta.then(resultado => {
      if (resultado.empty) {
        //no hay resultados
        this.setState({
          resultado: {},
          noResultados: true
        });
      } else {
        //si hay resultado
        const datos = resultado.docs[0];
        this.setState({
          resultado: datos.data(),
          noResultados: false
        });
      }
    });
  };

  render() {
    const { libro } = this.props;
    if (!libro) return <Spinner />;

    const { noResultados, resultado } = this.state;

    let fichaAlumno, btnSolicitar;
    console.log(resultado);
    if (resultado.nombre) {
      fichaAlumno = (
        <FichaSuscriptor alumno={resultado} titulo="Datos del solicitante" />
      );

      btnSolicitar = (
        <button
          type="button"
          className="btn btn-primary btn-block"
          onClick={this.solicitarPrestamo}
        >
          Solicitar prestamo
        </button>
      );
    } else {
      fichaAlumno = null;
      btnSolicitar = null;
    }

    return (
      <div className="row">
        <div className="col-12 mb-4">
          <Link to={"/"} className="btn tbn-secondary">
            <i className="fas fa-arrow-circle-left"></i> Volver al listado
          </Link>
        </div>

        <div className="col-12">
          <h3>
            <i className="fas fa-book"></i> prestamos de libros
          </h3>
          <p className="color-primary">{libro.titulo}</p>
          <div className="row justify-content-center mt-5">
            <div className="col-md-8">
              <form onSubmit={this.buscarAlumno} className="mn-4">
                <legend className="color-primary">
                  Buscar el suscriptor por código
                </legend>
                <div className="form-group">
                  <input
                    type="text"
                    name="busqueda"
                    className="form-control"
                    onChange={this.leerDato}
                  />
                </div>
                <input
                  type="submit"
                  value="Buscar alumno"
                  className="btn btn-success btn-block"
                />
              </form>

              {fichaAlumno}
              {btnSolicitar}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  firestoreConnect(props => [
    {
      collection: "libros",
      storeAs: "libro",
      doc: props.match.params.id
    }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    libro: ordered.libro && ordered.libro[0]
  }))
)(PrestamoLibro);
