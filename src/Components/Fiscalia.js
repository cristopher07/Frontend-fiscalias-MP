import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FiscaliaService from "../services/fiscalia.service";
import { useToasts } from "react-toast-notifications";
import { Guatemala } from "../const/Guatemala";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

const initialFiscaliaState = {
  id: null,
  agencia: "",
  codigo: "",
  tipo: "",
  departamento: "",
  municipio: "",
  telefono: "",
  datetime: "",
};

export const Fiscalia = (props) => {
  const [currentFiscalia, setCurrentFiscalia] = useState(initialFiscaliaState);
  const [deptos, setDepto] = useState([]);
  const [towns, setTown] = useState([]);
  const { addToast } = useToasts();

  const { id } = useParams();
  let navigate = useNavigate();
  //
  useEffect(() => {
    let data = [];
    for (let depto in Guatemala) {
      data.push({
        id: depto,
        value: depto,
      });
    }
    setDepto(data);
  }, []);

  useEffect(() => {
    if (id) getFiscalia(id);
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentFiscalia({ ...currentFiscalia, [name]: value });
  };

  //
  const handleSelectChange = async (event) => {
    const { name, value } = event.target;
    setCurrentFiscalia({ ...currentFiscalia, [name]: value });
    let data = Guatemala[value];
    setTown(data);
  };

  const getFiscalia = (id) => {
    FiscaliaService.get(id)
      .then((response) => {
        setCurrentFiscalia(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateFiscalia = () => {
    FiscaliaService.update(currentFiscalia.id_fiscalia, currentFiscalia)
      .then((response) => {
        console.log(response.data);
        addToast("La información se ha actualizado correctamente.", {
          appearance: "info",
          autoDismiss: true,
        });
        console.log(response.data);
        navigate("/fiscalias");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteFiscalia = () => {
    FiscaliaService.remove(currentFiscalia.id_fiscalia)
      .then((response) => {
        addToast("La información se ha eliminado correctamente.", {
          appearance: "error",
          autoDismiss: true,
        });
        console.log(response.data);
        navigate("/fiscalias");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div
      style={{
        width: "95vh",
        height: "100%",
        alignContent: "center",
        justifyItems: "center",
        margin: "auto",
      }}
    >
      <Paper
        style={{
          justifyContent: "center",
          alignSelf: "center",
          margin: "3%",
          width: "90%",
         
        }}
      >
        <div style={{ marginTop: "15%" }}>
          <br />
          <h4
            style={{
              width: "100%",
              textAlign: "center",
            }}
          >
            Detalle Fiscalía
          </h4>
        </div>

        <Grid container style={{ padding: "2%" }} spacing={3}>
          <Grid item xs={6}>
            <div className="form-group">
              <label htmlFor="title">Agencia</label>
              <input
                type="text"
                className="form-control"
                id="agencia"
                name="agencia"
                value={currentFiscalia.agencia}
                onChange={handleInputChange}
              />
            </div>
          </Grid>

          <Grid item xs={6}>
            <div className="form-group">
              <label htmlFor="description">Codigo</label>
              <input
                type="text"
                className="form-control"
                id="codigo"
                name="codigo"
                value={currentFiscalia.codigo}
                onChange={handleInputChange}
              />
            </div>
          </Grid>

          <Grid item xs={6}>
            <div style={{ width: "100%" }} className="col-md-6">
            <label htmlFor="title">Departamento</label>
              <select
                className="form-control"
                name="departamento"
                value={currentFiscalia.departamento}
                onChange={handleSelectChange}
                required
              >
                <option value="">Selecciona una opción...</option>
                {deptos.map((depto) => (
                  <option key={depto.id} value={depto.id}>
                    {depto.value}
                  </option>
                ))}
              </select>
            </div>
          </Grid>

          <Grid item xs={6}>
            <div style={{ width: "100%" }} className="col-md-6">
              <label>Municipio:</label>
              <select
                className="form-control"
                name="municipio"
                defaultValue={currentFiscalia.municipio}
                onChange={handleInputChange}
                multiple={false}
                required
              >
                <option value="">Selecciona una opción...</option>
                {towns.map((town) => (
                  <option key={town} value={town}>
                    {town}
                  </option>
                ))}
              </select>
            </div>
          </Grid>

          <Grid item xs={6}>
            <div className="form-group">
              <label>Tipo:</label>
              <select
                className="form-control"
                name="tipo"
                value={currentFiscalia.tipo}
                onChange={handleInputChange}
                required
              >
                <option value="">Selecciona una opción...</option>
                <option key={1} value={"Seccion"}>
                  Seccion
                </option>
                <option key={2} value={"Municipal"}>
                  Municipal
                </option>
                <option key={3} value={"Distrital"}>
                  Distrital
                </option>
              </select>
            </div>
          </Grid>

          <Grid item xs={6} style={{ justifyContent: "center" }}>
            <div className="form-group">
              <label htmlFor="description">Teléfono</label>
              <input
                type="text"
                className="form-control"
                id="telefono"
                name="telefono"
                value={currentFiscalia.telefono}
                onChange={handleInputChange}
              />
            </div>
          </Grid>

              
        <Grid item xs={12}>
            <button
              className="btn btn-danger btn-sm"
              onClick={deleteFiscalia}
              style={{
                height: 35,
                width: "25%",
                borderRadius: "5px",
                
              }}
            > Eliminar
            </button>

          <button
            type="submit"
            className="btn btn-success btn-sm"
            onClick={updateFiscalia}
            style={{
              height: 35,
              width: "25%",
              borderRadius: "5px",
              marginLeft: "2%",
            }}
          >Actualizar
          </button>
          </Grid>
         
        </Grid>
      </Paper>
    </div>
  );
};
