import "@/styles/cuenta.css";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { InputWithLabel } from "@/components/InputWithLabel";
import { InputWithButton } from "@/components/InputWithButton";
import { postCuenta } from "../peticiones/crearCuenta";
import { getCliente } from "../peticiones/getCliente";
import { ButtonLoading } from "@/components/ButtonLoading";
import Alerta from "@/components/Alerta";

export default function CrearCuenta() {
  const navigate = useNavigate();
  const [cedula, setCedula] = useState("");
  const [nombre, setNombre] = useState("");
  const [inputsVisibles, setInputsVisibles] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState(null);
  const [cuentaCreada, setCuentaCreada] = useState(null);
  const [alerta, setAlerta] = useState("");
  const [mostrarAlerta, setMostrarAlerta] = useState(false);

  const handleCrear = async () => {
    if (!cedula || !nombre) {
      setAlerta("Todos los campos son obligatorios");
      setMostrarAlerta(true);
      return;
    }

    const cuenta = {
      nombre: nombre,
      cedula: cedula,
    };
    setCuentaCreada(cuenta);
    setIsCreating(true);
    setAlerta("");

    try {
      await postCuenta(cedula);
      setAlerta("Cuenta creada con éxito");
      setMostrarAlerta(true);
      setIsCreating(false);
    } catch (error) {
      console.error("Error al crear cuenta:", error);
      setAlerta("Ocurrió un error al crear la cuenta");
      setMostrarAlerta(true);
      setIsCreating(false);
    }
  };

  const verificarCedula = async () => {
    if (!cedula) {
      setAlerta("Por favor ingrese una cédula");
      setMostrarAlerta(true);
      return;
    }

    setIsVerifying(true);
    setError(null);
    
    try {
      const cliente = await getCliente(cedula);
      if (cliente && cliente.nombre) {
        setNombre(cliente.nombre);
        setInputsVisibles(true);
      } else {
        navigate("/crearCliente");
      }
    } catch (error) {
      console.error("Error al verificar cédula:", error);
      if (error.response && error.response.status === 404) {
        navigate("/crearCliente");
      } else {
        setAlerta("Ha ocurrido un error al verificar la cédula");
        setMostrarAlerta(true);
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const handleVolver = () => {
    navigate('/');
  };

  return (
    <main>
      <section className="nav">
        <h1 className="titulo">Crear cuenta</h1>
      </section>
      <div className="formularioCedula">
        <InputWithLabel
          nombre={"Cedula"}
          type={"number"}
          nombreLabel={"Cedula"}
          value={cedula}
          inputMode={"numeric"}
          onChange={(e) => setCedula(e.target.value)}
        />

        {isVerifying ? (
          <ButtonLoading />
        ) : (
          <Button onClick={verificarCedula}>Verificar</Button>
        )}

        {inputsVisibles && (
          <InputWithButton
            nombre={"Nombre"}
            type={""}
            nombreLabel={"Nombre"}
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            click={handleCrear}
            buttonMessage={isCreating ? <ButtonLoading /> : "Crear"}
          />
        )}
        
        {error && <p className="error">{error}</p>}
        
        <Button 
          className="volver"
          onClick={handleVolver}
        >
          Volver
        </Button>
      </div>

      <Alerta
        mostrar={mostrarAlerta}
        Dialogo={alerta === "Cuenta creada con éxito" ? "¡Éxito!" : "Error"}
        Descripcion={alerta}
        cerrarAlerta={() => setMostrarAlerta(false)}
      />
    </main>
  );
}