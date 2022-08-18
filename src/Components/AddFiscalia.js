import React, { useState, useEffect } from "react";
import FiscaliaService from "../services/fiscalia.service";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useToasts } from "react-toast-notifications";
import { Guatemala } from "../const/Guatemala";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

export const AddFiscalia = () => {
  let navigate = useNavigate();

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

  const [fiscalia, setFiscalia] = useState(initialFiscaliaState);
  const [deptos, setDepto] = useState([]);
  const [towns, setTown] = useState([]);
  const { addToast } = useToasts();

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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFiscalia({ ...fiscalia, [name]: value });
  };

  const handleSelectChange = async (event) => {
    const { name, value } = event.target;
    setFiscalia({ ...fiscalia, [name]: value });
    let data = Guatemala[value];
    setTown(data);
  };
 
  const saveFiscalia = () => {
    const data = {
      agencia: fiscalia.agencia,
      codigo: fiscalia.codigo,
      tipo: fiscalia.tipo,
      departamento: fiscalia.departamento,
      municipio: fiscalia.municipio,
      telefono: fiscalia.telefono,
      datetime: moment().format("YYYY-MM-DD HH:mm:ss"),
    };

    FiscaliaService.create(data)
      .then((data) => {
        setFiscalia({
          id: data.id,
          agencia: data.agencia,
          codigo: data.codigo,
          tipo: data.tipo,
          departamento: data.departamento,
          municipio: data.municipio,
          telefono: data.telefono,
          datetime: moment().format("YYYY-MM-DD HH:mm:ss"),
        });
        addToast("La información se ha insertado correctamente.", {
          appearance: "success",
          autoDismiss: true,
        });
        setFiscalia(initialFiscaliaState);
        navigate("/fiscalias");
      })
      .catch((e) => {
        console.log(e);
        addToast("La información no se insertó", {
          appearance: "error",
          autoDismiss: true,
        });
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
            Crear Fiscalía
          </h4>
        </div>
        <Grid container style={{ padding: "2%" }} spacing={3}>
          <Grid item xs={6}>
            <label htmlFor="title">Agencia</label>
            <input
              type="text"
              className="form-control"
              id="agencia"
              required
              value={fiscalia.agencia}
              onChange={handleInputChange}
              name="agencia"
            />
          </Grid>

          <Grid item xs={6}>
            <label htmlFor="description">Código</label>
            <input
              type="text"
              className="form-control"
              id="codigo"
              required
              value={fiscalia.codigo}
              onChange={handleInputChange}
              name="codigo"
            />
          </Grid>

          <Grid item xs={6}>
            <div>
              <label>Tipo:</label>
              <div>
                <select
                  className="form-control"
                  name="tipo"
                  value={fiscalia.tipo}
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
            </div>
          </Grid>

          <Grid item xs={6} style={{ justifyContent: "center" }}>
            <div className="form-group">
              <label htmlFor="description">Teléfono</label>
              <input
                type="text"
                className="form-control"
                id="telefono"
                required
                value={fiscalia.telefono}
                onChange={handleInputChange}
                name="telefono"
              />
            </div>
          </Grid>

          <Grid item xs={6}>
            <label htmlFor="title">Departamento </label>
            <div style={{ width: "100%" }} className="col-md-6">
              <select
                className="form-control"
                name="departamento"
                value={fiscalia.departamento}
                onChange={handleSelectChange}
                required
              >
                <option value=""> Selecciona una opción... </option>
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
              <label>Municipio</label>
              <select
                className="form-control"
                name="municipio"
                defaultValue={fiscalia.municipio}
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
          <Grid item xs={8} style={{ justifyContent: "center" }}></Grid>
          <Grid item xs={4} style={{ justifyContent: "center" }}>
            <button
              onClick={saveFiscalia}
              className="btn btn-success"
              style={{
                height: 35,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                margin: "15px 0px",
              }}
            >
              Agregar
            </button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};
