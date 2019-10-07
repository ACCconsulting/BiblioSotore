import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Spinner from "../layout/spinner";

class MostrarLibro extends Component {
  devolverLibro = id => {
    const { firestore } = this.props;
    const libtoActualizado = { ...this.props.libro };
    const prestadosL = libtoActualizado.prestados.filter(
      elemento => elemento.matricula !== id
    );
    libtoActualizado.prestados = prestadosL;

    firestore.update(
      {
        collection: "libros",
        doc: libtoActualizado.id
      },
      libtoActualizado
    );
  };

  render() {
    const { libro } = this.props;
    if (!libro) return <Spinner />;

    //boton para solicutar un libro
    let botonPrestamo;
    if (libro.existencia - libro.prestados.length > 0) {
      botonPrestamo = (
        <Link
          to={`/libros/prestamo/${libro.id}`}
          className="btn btn-success my-3"
        >
          Solicitar prestamo
        </Link>
      );
    } else botonPrestamo = null;

    return (
      <div className="row">
        <div className="col-md-6 mb-4">
          <Link to={"/"} className="btn btn-secundary">
            <i className="fas fa-arrow-circle-left"></i> Volver al listado
          </Link>
        </div>
        <div className="col-md-6">
          <Link
            to={`/libros/editar/${libro.id}`}
            className="btn btn-primary float-right"
          >
            <i className="fas fa-pencil-alt"></i> Editar libro
          </Link>
        </div>

        <hr className="md-5 w-100" />
        <div className="col-12">
          <h2 className="mb-4">{libro.titulo}</h2>
          <p>
            <span className="font-weight-bold">ISBN:</span> {libro.ISBN}
          </p>
          <p>
            <span className="font-weight-bold">Editorial:</span>{" "}
            {libro.editorial}
          </p>
          <p>
            <span className="font-weight-bold">Existencia:</span>{" "}
            {libro.existencia}
          </p>

          <p>
            <span className="font-weight-bold">Disponibles:</span>{" "}
            {libro.existencia - libro.prestados.length}
          </p>

          {botonPrestamo}

          <h3 className="my-2"> Persona que tien el libro prestado</h3>
          <div className="row">
            {libro.prestados.map(obj => (
              <div className="col-5" key={obj.matricula}>
                <div className="card my-2">
                  <div className="card-body">
                    <h5 className="card-title">
                      {obj.nombre} {obj.apellido}
                    </h5>
                    <p>
                      <span className="font-weight-bold">Matricula:</span>{" "}
                      {obj.matricula}
                    </p>

                    <p>
                      <span className="font-weight-bold">Carrera:</span>{" "}
                      {obj.carrera}
                    </p>

                    <p>
                      <span className="font-weight-bold">Fecha solicitud:</span>{" "}
                      {obj.fecha_solicitud}
                    </p>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => this.devolverLibro(obj.matricula)}
                    >
                      Realizar devolución
                    </button>
                  </div>

                  {/* <button
                type="button"
                className=""
                // onClick={this.devolverLibro(obj.matricula)}
              >
                Realizar Devolucion
              </button> */}
                </div>
              </div>
            ))}
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
)(MostrarLibro);
