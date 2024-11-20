import "@/styles/Home.css";
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { InputWithLabel } from "@/components/InputWithLabel";
import Alerta from "@/components/Alerta";
import { Deposito } from "../peticiones/hacerDeposito";
import { ButtonLoading } from "@/components/ButtonLoading"; 

export default function Depositar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    idCuenta, 
    idCliente, 
    cedula, 
    nombre, 
    saldo: saldoAnterior, 
    correo 
  } = location.state || {};

  const [monto, setMonto] = useState("");
  const [loading, setLoading] = useState(false);
  const [alerta, setAlerta] = useState("");
  const [mostrarAlerta, setMostrarAlerta] = useState(false);

  const handleDeposito = async () => {
    if (!monto || isNaN(parseFloat(monto))) {
      setAlerta("Por favor, ingrese un monto válido");
      setMostrarAlerta(true);
      return;
    }
    setLoading(true); 
    try {
      const data = {
        id: idCuenta,
        idCliente: idCliente,
        cedula: cedula,
        nombre: nombre,
        saldoAnterior: parseFloat(saldoAnterior),
        monto: parseFloat(monto),
        correo: correo,
      };
      await Deposito(data);
      
      setAlerta("Deposito realizado con exito");
      setMostrarAlerta(true);
    } catch (error) {
      setAlerta("Error al realizar el depósito");
      setMostrarAlerta(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseAlert = () => {
    setMostrarAlerta(false);
  };

  const handleVolver = () => {
    navigate("/cuentas");
  };

  return (
    <main>
      <section className="nav">
        <h1 className="titulo">Depósito</h1>
      </section>
      <div className="formulario">
        <InputWithLabel
          nombre="Monto"
          type="number"
          nombreLabel="Monto"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
        />

        <Button 
          className="registrar" 
          onClick={handleDeposito} 
          disabled={loading}
        >
          {loading ? <ButtonLoading /> : "Depositar"}
        </Button>

        <Alerta
          mostrar={mostrarAlerta}
          Dialogo={alerta === "Deposito realizado con exito" ? "¡Éxito!" : "Error"}
          Descripcion={alerta}
          cerrarAlerta={handleCloseAlert}
        />

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