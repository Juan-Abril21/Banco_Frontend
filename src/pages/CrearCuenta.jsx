import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { InputWithLabel } from "@/components/InputWithLabel";
import "@/styles/cuenta.css";
import { InputWithButton } from "@/components/InputWithButton";
import { postCuenta } from "../peticiones/crearCuenta";
import { getCliente } from "../peticiones/getCliente";
import { ButtonLoading } from "@/components/ButtonLoading";

export default function CrearCuenta() {
  const navigate = useNavigate();
  const [cedula, setCedula] = useState("");
  const [nombre, setNombre] = useState("");
  const [inputsVisibles, setInputsVisibles] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState(null); 
  const [cuentaCreada, setCuentaCreada] = useState(null);

  const handleCrear = async () => {
    const cuenta = {
      nombre: nombre,
      cedula: cedula,
    };
    setCuentaCreada(cuenta);
    setIsCreating(true);

    try {
      await postCuenta(cedula);
      setIsCreating(false);
    } catch (error) {
      console.error("Error al crear cuenta:", error);
      setIsCreating(false);
    }
  };

  const verificarCedula = async () => {
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
        setError("Ha ocurrido un error al verificar la cédula.");
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
    </main>
  );
}