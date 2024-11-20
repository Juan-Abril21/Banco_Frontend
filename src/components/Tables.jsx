import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import "@/styles/tables.css";
import { useNavigate } from 'react-router-dom';
import AlertaW2Buttons from "@/components/AlertaW2Buttons.jsx";
import { getClientes } from "../peticiones/getClientes";
import { eliminarCuenta } from "../peticiones/eliminarCuenta";
import { ButtonLoading } from "@/components/ButtonLoading"; 
import { InputDemo } from "@/components/Input";

export default function Tables() {
  const [searchCedula, setSearchCedula] = useState("");
  const [clientes, setClientes] = useState([]);
  const [loadingDepositId, setLoadingDepositId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClientes = async () => {
      const data = await getClientes();
      setClientes(data);
    };
    fetchClientes();
  }, []);

  const filteredInvoices = clientes.filter((invoice) =>
    invoice.cedula.includes(searchCedula)
  );

  const handleEliminarCuenta = async (id) => {
    try {
      await eliminarCuenta(id);
      // Actualizar la lista de clientes después de eliminar
      setClientes(clientes.filter(cliente => cliente.cuentaId !== id));
      return true; // Indica éxito
    } catch (error) {
      console.error("Error al eliminar cuenta:", error);
      return false; // Indica fallo
    }
  };

  const handleDepositar = async (idCuenta, idCliente, cedulacliente, nombreCliente, saldoAnterior, correo) => {
    setLoadingDepositId(idCuenta);
    navigate(`/depositar`, {
      state: {
        idCuenta,
        idCliente,
        cedula: cedulacliente,
        nombre: nombreCliente,
        saldo: saldoAnterior,
        correo
      }
    });
  };

  return (
    <div>
      <div className="mb-4">
        <InputDemo
          nombre={"Ingrese el numero de cedula"}
          type={"number"}
          nombreLabel={"Cedula"}
          inputMode={"numeric"}
          onChange={(e) => setSearchCedula(e.target.value)}
        />
      </div>
      <Table>
        <TableCaption>Cuentas activas</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID Cliente</TableHead>
            <TableHead>ID Cuenta</TableHead>
            <TableHead>Cedula</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Saldo</TableHead>
            <TableHead>Fecha creacion</TableHead>
            <TableHead>Correo</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredInvoices.map((invoice) => (
            <TableRow key={`${invoice.ID}-${invoice.cuentaId}`}>
              <TableCell className="font-medium">{invoice.ID}</TableCell>
              <TableCell>{invoice.cuentaId}</TableCell>
              <TableCell>{invoice.cedula}</TableCell>
              <TableCell>{invoice.nombre}</TableCell>
              <TableCell>{"$" + invoice.saldo.toLocaleString("es-ES")}</TableCell>
              <TableCell>{invoice.fechaCreacion}</TableCell>
              <TableCell>{invoice.correo}</TableCell>
              <TableCell className="text-right">
                <AlertaW2Buttons
                  Descripcion={`ID de la cuenta: ${invoice.cuentaId}`}
                  click={() => handleEliminarCuenta(invoice.cuentaId)}
                  TextoBoton={"Eliminar"}
                  Dialogo={`¿Está seguro que quiere eliminar la cuenta?`}
                  path1={"/"}
                  alertButton1={"Eliminar"}
                  path2={"/cuentas"}
                  alertButton2={"Volver"}
                />
                {loadingDepositId === invoice.cuentaId ? (
                  <ButtonLoading className="depositar" />
                ) : (
                  <Button
                    className="depositar"
                    onClick={() => handleDepositar(invoice.cuentaId, invoice.ID, invoice.cedula, invoice.nombre, invoice.saldo, invoice.correo)}
                  >
                    Depositar
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}