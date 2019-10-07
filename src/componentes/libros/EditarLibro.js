import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "../layout/spinner";

class EditarLibro extends Component {
  tituloInput = React.createRef();
  ISBNInput = React.createRef();
  editorialInput = React.createRef();
  existenciaInput = React.createRef();

  editarLibro = e => {
    e.preventDefault();

    const LibroActualizar = {
      titulo: this.tituloInput.current.value,
      ISBN: this.ISBNInput.current.value,
      editorial: this.editorialInput.current.value,
      existencia: this.existenciaInput.current.value
    };

    const { libro, firestore, history } = this.props;

    firestore
      .update(
        {
          collection: "libros",
          doc: libro.id
        },
        LibroActualizar
      )
      .then(history.push("/"));
  };

  render() {
    const { libro } = this.props;

    if (!libro) return <Spinner />;

    return (
      <div className="row">
        <div className="col-12 mb-4">
          <Link to={"/"} className="btn tbn-secondary">
            <i className="fas fa-arrow-circle-left"></i> Volver al listado
          </Link>
        </div>
        <div className="col-12">
          <h2>
            <i className="fas fa-book"></i> Editar libro
          </h2>
          <div className="row justify-content-center">
            <div className="col md-8 mt-5">
              <form onSubmit={this.editarLibro}>
                <div className="form-group">
                  <label>Titulo:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="titulo"
                    placeholder="Titulo del libro"
                    required
                    ref={this.tituloInput}
                    defaultValue={libro.titulo}
                  />
                  <label>ISBN:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="ISBN"
                    placeholder="Apellido del suscriotor"
                    required
                    ref={this.ISBNInput}
                    defaultValue={libro.ISBN}
                  />
                  <label>Editorial:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="editorial"
                    placeholder="Editorial del libro"
                    required
                    ref={this.editorialInput}
                    defaultValue={libro.editorial}
                  />
                  <label>Existencia:</label>
                  <input
                    type="number"
                    min="0"
                    className="form-control"
                    name="existencia"
                    placeholder="existencia del libro"
                    required
                    ref={this.existenciaInput}
                    defaultValue={libro.existencia}
                  />
                </div>

                <input
                  type="submit"
                  value="Editar libro"
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
      collection: "libros",
      storeAs: "libro",
      doc: props.match.params.id
    }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    libro: ordered.libro && ordered.libro[0]
  }))
)(EditarLibro);
