import React, { useState, useEffect } from "react";
import md5 from "md5";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import Cookies from "universal-cookie";
import axios from "axios";

export function Login() {
  let navigate = useNavigate();

  //almacenar lo que el usuario vaya escribiendo
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const cookies = new Cookies();
  const baseUrl = "https://localhost:44322/api/usuarios";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const iniciarSesion = async (url) => {
    await axios
      .get(baseUrl + `/${form.username}/${md5(form.password)}`)
      .then((response) => {
        return response.data;
      })
      .then((response) => {
        if (response.length > 0) {
          let respuesta = response[0];
          cookies.set("id", respuesta.id, { path: "/" });
          cookies.set("apellido_paterno", respuesta.apellido_paterno, {
            path: "/",
          });
          cookies.set("apellido_materno", respuesta.apellido_materno, {
            path: "/",
          });
          cookies.set("nombre", respuesta.nombre, { path: "/" });
          cookies.set("correo", respuesta.correo, { path: "/" });
          cookies.set("username", respuesta.username, { path: "/" });
          cookies.set("password", respuesta.password, { path: "/" });
          alert(
            "Bienvenido: " + respuesta.nombre + " " + respuesta.apellido_paterno
          );

          navigate("/fiscalias");
          window.location.reload(false);
        } else {
          alert("El usuario o la contraseña no son correctos");
        }
      })

      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (cookies.get("id")) {
      navigate("/fiscalias");
    }
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        border: "1px solid blue",
        padding: "40px",
        backgroundColor: "white",
        display: "flex",
      }}
    >
      <img
        style={{
          width: "50%",
          height: "50%",
          marginTop: "5%",
          marginRight: "10%",
        }}
        src={Logo}
        alt="Logo"
      />
      <div
        style={{
          textAlign: "center",
        }}
      >
        <div className="form-group">
          <label
            style={{
              marginBottom: "15%",
              fontWeight: "bold",
              color: "#000F8C",
            }}
          >
            Iniciar Sesión{" "}
          </label>
          <br />
          <input
            style={{ marginBottom: "-5%" }}
            type="text"
            className="form-control"
            name="username"
            onChange={handleChange}
            placeholder="Usuario"
          />
          <br />

          <br />
          <input
            type="password"
            className="form-control"
            name="password"
            onChange={handleChange}
            placeholder="Contraseña"
          />
          <br />
          <button
            style={{
              width: "100%",
              backgroundColor: "#000F8C",
              color: "white",
              borderRadius: "5px",
            }}
            className="btn btn-primary"
            onClick={() => iniciarSesion()}
          >
            Ingresar
          </button>
        </div>
      </div>
    </div>
  );
}
