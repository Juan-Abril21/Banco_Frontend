import "../styles/Home.css";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Button } from "../components/ui/button";
import { ButtonLoading } from "@/components/ButtonLoading";
import { CiDark, CiLight } from "react-icons/ci";

export default function Home() {
  const navigate = useNavigate(); 
  const [loadingButton, setLoadingButton] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const handleClick = (buttonName) => {
    setLoadingButton(buttonName);
    
    switch(buttonName) {
      case 'crearCliente':
        navigate('/crearCliente');
        break;
      case 'crearCuenta':
        navigate('/crearCuenta');
        break;
      case 'consultarCuentas':
        navigate('/cuentas');
        break;
    }
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <>
      <div className={`container1 ${darkMode ? "dark-theme" : "light-theme"}`}>
        <section className="nav">
          <h1 className="titulo">Banco Fachero</h1>
        </section>
        <div className="theme-toggle" onClick={toggleTheme}>
          {darkMode ? (
            <CiLight size={40} style={{ cursor: "pointer" }} />
          ) : (
            <CiDark size={40} style={{ cursor: "pointer" }} />
          )}
        </div>
        <div className="container2">
          <div className="botones">
            {loadingButton === "crearCliente" ? (
              <ButtonLoading />
            ) : (
              <Button onClick={() => handleClick("crearCliente")}>
                Crear cliente
              </Button>
            )}

            {loadingButton === "crearCuenta" ? (
              <ButtonLoading />
            ) : (
              <Button onClick={() => handleClick("crearCuenta")}>
                Crear cuenta
              </Button>
            )}

            {loadingButton === "consultarCuentas" ? (
              <ButtonLoading />
            ) : (
              <Button onClick={() => handleClick("consultarCuentas")}>
                Consulta de cuentas
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}