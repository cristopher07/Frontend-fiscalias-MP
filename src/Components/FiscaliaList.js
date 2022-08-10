import React, { useState, useEffect } from "react";
import FiscaliaService from "../services/fiscalia.service";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Stack } from "@mui/material";
import { IconButton } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import SearchIcon from "@mui/icons-material/Search";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Doc from "./Doc";
import { useToasts } from "react-toast-notifications";

export const FiscaliaList = () => {

  const [fiscalias, setFiscalias] = useState([]);
  const [currentFiscalia, setCurrentFiscalia] = useState(null);
  const [searchAgencia, setSearchAgencia] = useState("");
  const { addToast } = useToasts(); 

  useEffect(() => {
    retrieveFiscalias();
  }, []);

  const onChangeSearchAgencia = (e) => {
    const searchAgencia = e.target.value;
    setSearchAgencia(searchAgencia);
  };

  const retrieveFiscalias = () => {
    FiscaliaService.getAll()
      .then((response) => {
        setFiscalias(response.data);
        // console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshData = () => {
    retrieveFiscalias();
    setCurrentFiscalia(null);
  };

  const removeAllFiscalias = () => {
    FiscaliaService.removeAll()
      .then((response) => {
        console.log(response);
        refreshData();
        addToast("La información se ha eliminado correctamente.", {
          appearance: "error",
          autoDismiss: true,});
      })
      .catch((e) => {
        console.log(e);
        
      });
  };

  const findByAgencia = () => {
     if(searchAgencia.length >0 ){
    FiscaliaService.findByAgencia(searchAgencia)
      .then((response) => {
        setFiscalias(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
    }
    else{
      retrieveFiscalias();
    }
  };

console.log("todas las fiscalias",fiscalias);

  const columns = [
    {
      field: "agencia",
      headerName: "Agencia",
      sortable: true,
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "codigo",
      headerName: "Codigo",
      sortable: true,
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "tipo",
      headerName: "Tipo fiscalía",
      sortable: true,
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "departamento",
      headerName: "Departamento",
      sortable: true,
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "municipio",
      headerName: "Municipio",
      sortable: true,
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "telefono",
      headerName: "Teléfono",
      sortable: true,
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "datetime",
      headerName: "Fecha ingreso",
      sortable: true,
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "action",
      headerAlign: "center",
      headerName: "Acciones",
      renderCell: (params) => {
        return (
          <Link
            to={"/fiscalias/" + params.row.id_fiscalia}
            className="btn btn-warning btn-sm"
          >
            Editar
          </Link>
        );
      },
      align: "center",
    },
  ];

  return (
    <div>
      <div style={{
            display: "flex",
            justifyContent: "space-between",
            height: "100%",
            width: "90%",
          }} 
      className="col-md-8">
        <div className="input-group mb-3">
          <input style={{
            marginRight: "10px",
          }}
            type="text"
            className="form-control"
            placeholder="Buscar por agencia"
            value={searchAgencia}
            onChange={onChangeSearchAgencia}
          />
          
          <div 
          className="input-group-append">
           
            <IconButton
          style={{ marginLeft: "1%" }}
          onClick={findByAgencia}
          aria-label="search"
        >
          <SearchIcon style={{ color: "#000F8C" }} />
        </IconButton>

          </div>

          <PDFDownloadLink
          document={<Doc fiscalias={fiscalias} />}
          fileName={"Reportes-Fiscalias"}
        >
          <IconButton
            style={{ marginLeft: "1%" }}
            aria-label="print"
          >
            <PrintIcon style={{ color:"#000F8C" }} />
          </IconButton>
        </PDFDownloadLink>
        
        </div>
      </div>

      <div className="col-md-12">
        <h4>Listado de Fiscalias</h4>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={fiscalias || []}
            columns={columns || []}
            disableSelectionOnClick
            getRowId={(row) => row.id_fiscalia}
            components={{
              NoRowsOverlay: () => (
                <Stack
                  height="100%"
                  alignItems="center"
                  justifyContent="center"
                >
                  Sin resultados
                </Stack>
              ),
              NoResultsOverlay: () => (
                <Stack
                  height="100%"
                  alignItems="center"
                  justifyContent="center"
                >
                  Sin resultados
                </Stack>
              ),
            }}
          />
        </div>
        {fiscalias.length === 0 ? (
          <></>
        ) : (
          <div>
            <button
              style={{
                height: 35,
                width: "25%",
                borderRadius: "5px",
                margin: "15px 0px",
              }}
              className="m-3 btn btn-sm btn-danger"
              onClick={removeAllFiscalias}
            >
              Eliminar todas las fiscalías
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
