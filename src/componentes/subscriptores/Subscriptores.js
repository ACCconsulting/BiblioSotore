import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Spinner from "../layout/spinner";

const Subscriptores = props => {
  if (!props.suscriptores) return <Spinner />;

  const { firestore } = props;
  //Eliminar suscriptores
  const EliminarSuscriptore = id => {
    firestore.delete({
      collection: "subscriptores",
      doc: id
    });
  };

  return (
    <div className="row">
      <div className="col-md-12 mb-4">
        <Link to={"/subscriptores/nuevo"} className="btn btn-primary">
          <i className="fas fa-plus"> </i> Nuevo Suscriptor
        </Link>
      </div>
      <div className="col-md-8">
        <h2>
          <i className="fas fa-users"></i> suscriptores
        </h2>
      </div>
      <table className="table table-striped mt-4">
        <thead className="text-light bg-primary">
          <tr>
            <th>Nombre</th>
            <th>Carrera</th>
            <th>Matricula</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {props.suscriptores.map(s => (
            <tr key={s.id}>
              <td>
                {" "}
                {s.nombre} {s.apellido}{" "}
              </td>
              <td>{s.carrera}</td>
              <td>{s.matricula}</td>
              <td>
                <Link
                  to={`/subscriptores/${s.id}`}
                  className="btn btn-success "
                >
                  <i className="fas fa-angle-double-right"></i> Mas informacion
                </Link>{" "}
                <button
                  type="button"
                  className="btn btn-danger "
                  onClick={() => EliminarSuscriptore(s.id)}
                >
                  <i className="fas fa-trash-alt"></i> Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Subscriptores.propTypes = {
  firestore: PropTypes.object.isRequired,
  suscriptores: PropTypes.array
};
export default compose(
  firestoreConnect([{ collection: "subscriptores" }]),
  connect((state, props) => ({
    suscriptores: state.firestore.ordered.subscriptores
  }))
)(Subscriptores);
