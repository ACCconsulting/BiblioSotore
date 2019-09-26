import React, { Component } from "react";

import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "../layout/spinner";

class EditarSubscriptor extends Component {
  //Crear los refs en lugar de state
  nombreInput = React.createRef();
  apellidoInput = React.createRef();
  matriculaInput = React.createRef();
  carreraInput = React.createRef();

  editarSubscriptor = e => {
    e.preventDefault();

    const suscriptoresAutorizados = {
      nombre: this.nombreInput.current.value,
      apellido: this.apellidoInput.current.value,
      matricula: this.matriculaInput.current.value,
      carrera: this.carreraInput.current.value
    };

    const { suscriptor, firestore, history } = this.props;

    firestore
      .update(
        {
          collection: "subscriptores",
          doc: suscriptor.id
        },
        suscriptoresAutorizados
      )
      .then(history.push("/subscriptores"));
  };

  render() {
    const { suscriptor } = this.props;

    if (!suscriptor) return <Spinner />;

    return (
      <div className="row">
        <div className="col-12 mb-4">
          <Link to={"/subscriptores"} className="btn tbn-secondary">
            <i className="fas fa-arrow-circle-left"></i> Volver al Listado
          </Link>
        </div>
        <div className="col-12">
          <h2>
            <i className="fas fa-user"></i> Editar suscriptor
          </h2>
          <div className="row justify-content-center">
            <div className="col md-8 mt-5">
              <form onSubmit={this.editarSubscriptor}>
                <div className="form-group">
                  <label>Nombre:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nombre"
                    placeholder="Nomnbre del suscriotor"
                    required
                    ref={this.nombreInput}
                    defaultValue={suscriptor.nombre}
                  />
                  <label>Apellido:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="apellido"
                    placeholder="Apellido del suscriotor"
                    required
                    ref={this.apellidoInput}
                    defaultValue={suscriptor.apellido}
                  />
                  <label>Carrera:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="carrera"
                    placeholder="Carrera del suscriotor"
                    required
                    ref={this.carreraInput}
                    defaultValue={suscriptor.carrera}
                  />
                  <label>Matricula:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="matricula"
                    placeholder="Matricula del suscriotor"
                    required
                    ref={this.matriculaInput}
                    value={suscriptor.matricula}
                  />
                </div>
                <input
                  type="submit"
                  value="Editar Suscriptor"
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

export default compose(
  firestoreConnect(props => [
    {
      collection: "subscriptores",
      storeAs: "suscriptor",
      doc: props.match.params.id
    }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    suscriptor: ordered.suscriptor && ordered.suscriptor[0]
  }))
)(EditarSubscriptor);
