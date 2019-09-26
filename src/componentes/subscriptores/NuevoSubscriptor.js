import React, { Component } from "react";
import { Link } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import PropTypes from "prop-types";

class NuevoSubscriptor extends Component {
  state = {
    nombre: "",
    apellido: "",
    carrera: "",
    matricula: ""
  };

  //Agrega un nuevo subscritor
  agregarSubscriptor = e => {
    e.preventDefault();

    //Extraer los valores del state

    const nuevoSuscriptor = { ...this.state };

    // utilizar firestore
    const { firestore, history } = this.props;

    firestore
      .add({ collection: "subscriptores" }, nuevoSuscriptor)
      .then(() => history.push("/subscriptores"));
    //Guardarlos en la bd
  };

  //Mapear valores de input
  mapearDato = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div className="row">
        <div className="col-12 mb-4">
          <Link to={"/subscriptores"} className="btn tbn-secondary">
            <i className="fas fa-arrow-circle-left"></i> Volver al Listado
          </Link>
        </div>
        <div className="col-12">
          <h2>
            <i className="fas fa-user-plus"></i> Nuevo suscriptor
          </h2>
          <div className="row justify-content-center">
            <div className="col md-8 mt-5">
              <form onSubmit={this.agregarSubscriptor}>
                <div className="form-group">
                  <label>Nombre:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nombre"
                    placeholder="Nomnbre del suscriotor"
                    required
                    onChange={this.mapearDato}
                    value={this.state.nombre}
                  />
                  <label>Apellido:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="apellido"
                    placeholder="Apellido del suscriotor"
                    required
                    onChange={this.mapearDato}
                    value={this.state.apellido}
                  />
                  <label>Carrera:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="carrera"
                    placeholder="Carrera del suscriotor"
                    required
                    onChange={this.mapearDato}
                    value={this.state.carrera}
                  />
                  <label>Matricula:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="matricula"
                    placeholder="Matricula del suscriotor"
                    required
                    onChange={this.mapearDato}
                    value={this.state.matricula}
                  />
                </div>
                <input
                  type="submit"
                  value="Agregar Suscriptor"
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

NuevoSubscriptor.propTypes = {
  firestore: PropTypes.object.isRequired
};
export default firestoreConnect()(NuevoSubscriptor);
