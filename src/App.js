import React, { useEffect } from "react";
import { Routes, Route, Link , useNavigate} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { FiscaliaList } from "./Components/FiscaliaList";
import { AddFiscalia } from "./Components/AddFiscalia";
import { Fiscalia } from "./Components/Fiscalia";
import { Login } from "./Components/Login";
import Cookies from "universal-cookie";
import { isObjEmpty } from "./utils/utils";

function App() {

  const cookies = new Cookies();
  let navigate = useNavigate();

  const cerrarSesion = () => {
    cookies.remove("id", { path: "/" });
    cookies.remove("apellido_paterno", { path: "/" });
    cookies.remove("apellido_materno", { path: "/" });
    cookies.remove("nombre", { path: "/" });
    cookies.remove("correo", { path: "/" });
    cookies.remove("username", { path: "/" });
    cookies.remove("password", { path: "/" });
    navigate("/");
    window.location.reload(false);

  };

  useEffect(() => {
    if (!cookies.get("id")) {
      navigate("/");
    }
  }, []);

  return (
    <div className="App">
      <nav  className="navbar navbar-expand navbar-dark bg-dark" >
        <div className="navbar-nav mr-auto" style={{ width: "150%"}} >
          
          {isObjEmpty(cookies.getAll())? (
            <li to={"/"} className="navbar-brand" style={{marginLeft:"1%"}}>
              Login
            </li>
          ) : (
            < >
           
           <div className="navbar-nav mr-auto"  style={{width: "100%", height: "100%", }}>
           <a href="/fiscalias" className="navbar-brand">
                Ministerio Público
              </a>
              <li className="nav-item">
                <Link to={"/fiscalias"} className="nav-link">
                  Fiscalias
                </Link>
              </li>
              <li className="nav-item"
              >
                <Link to={"/agregar"} className="nav-link">
                  Agregar
                </Link>
              </li>
           </div>
           

            
              <div className="container" style={{width: "40%", height: "100%",
              justifySelf: "center" }}>
              <button style={{ fontSize: "white", color: "white", }}
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => cerrarSesion()}
              >
                Cerrar Sesión
              </button>
              </div>
            
            </>
          )}
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/fiscalias" element={<FiscaliaList />} />
          <Route path="/agregar" element={<AddFiscalia />} />
          <Route path="/fiscalias/:id" element={<Fiscalia />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
