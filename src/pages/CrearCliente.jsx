import "@/styles/crearCliente.css";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Alerta from "@/components/Alerta";
import { InputWithLabel } from "@/components/InputWithLabel";
import { postCliente } from "../peticiones/crearCliente";
import { ButtonLoading } from "@/components/ButtonLoading"; 

export default function CrearCliente() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [cedula, setCedula] = useState("");
  const [correo, setCorreo] = useState("");
  const [isLoading, setIsLoading] = useState(false); 
  const [alerta, setAlerta] = useState(""); 
  const [mostrarAlerta, setMostrarAlerta] = useState(false);

  const handleRegistrar = async () => {
    if (!nombre || !cedula || !correo) {
      setAlerta("Todos los campos son obligatorios");
      setMostrarAlerta(true);
      return;
    }

    const cliente = { nombre, cedula, correo };
    setIsLoading(true); 
    setAlerta("");

    try {
      await postCliente(cliente);
      setAlerta("Cliente creado con éxito");
      setMostrarAlerta(true);
      setIsLoading(false);
    } catch (error) {
      console.error("Error al registrar cliente:", error);
      setAlerta("Ocurrió un error al registrar el cliente");
      setMostrarAlerta(true);
      setIsLoading(false);
    }
  };

  const handleVolver = () => {
    navigate('/');
  };

  return (
    <main>
      <section className="nav">
        <h1 className="titulo">Crear Cliente</h1>
      </section>
      <div className="formulario">
        <InputWithLabel
          nombre={"Nombre"}
          type={"text"}
          nombreLabel={"Nombre"}
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <InputWithLabel
          nombre={"Cedula"}
          type={"number"}
          nombreLabel={"Cedula"}
          value={cedula}
          inputMode={"numeric"}
          onChange={(e) => setCedula(e.target.value)}
        />
        <InputWithLabel
          nombre={"Correo"}
          type={"email"}
          nombreLabel={"Correo"}
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />

        <Button
          className="registrar"
          onClick={handleRegistrar}
          disabled={isLoading}
        >
          {isLoading ? <ButtonLoading /> : "Registrarse"}
        </Button>

        <Button 
          className="volver"
          onClick={handleVolver}
        >
          Volver
        </Button>
      </div>

      <Alerta
        mostrar={mostrarAlerta}
        Dialogo={alerta === "Cliente creado con éxito" ? "¡Éxito!" : "Error"}
        Descripcion={alerta}
        cerrarAlerta={() => setMostrarAlerta(false)}
      />
    </main>
  );
}