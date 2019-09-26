import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Spinner from "../layout/spinner";

const MostrarSubscriptor = ({ suscriptor }) => {
  if (!suscriptor) return <Spinner />;

  return (
    <div className="row">
      <div className="col-md-6 mb-4">
        <Link to={"/subscriptores"} className="btn btn-secundary">
          <i className="fas fa-arrow-circle-left"></i> Volver al listado
        </Link>
      </div>
      <div className="col-md-6">
        <Link
          to={`/subscriptores/editar/${suscriptor.id}`}
          className="btn btn-primary float-right"
        >
          <i className="fas fa-pencil-alt"></i> Editar suscriptor
        </Link>
      </div>
      <hr className="md-5 w-100" />
      <div className="col-12">
        <h2 className="mb-4">
          {suscriptor.nombre} {suscriptor.apellido}
        </h2>
        <p>
          <span className="font-weight-bold">carrera:</span>{" "}
          {suscriptor.carrera}
        </p>
        <p>
          <span className="font-weight-bold">Matricula:</span>{" "}
          {suscriptor.matricula}
        </p>
      </div>
    </div>
  );
};

MostrarSubscriptor.propTypes = {
  firestore: PropTypes.object.isRequired
};
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
)(MostrarSubscriptor);
