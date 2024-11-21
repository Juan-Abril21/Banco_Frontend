import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import '../styles/crearCliente.css';
import { ButtonLoading } from "@/components/ButtonLoading";

const AlertaW2Buttons = ({
  TextoBoton,
  Dialogo,
  path1,
  Descripcion,
  alertButton1,
  path2,
  alertButton2,
  click,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const navigate = useNavigate();

  const handleVolver = () => {
    setIsOpen(false);
    navigate(path2);
  };

  const handleEliminarClick = async () => {
    try {
      setLoadingDelete(true);
      await click();
      setLoadingDelete(false);
      setIsOpen(false);
      setShowSuccessAlert(true);
    } catch (error) {
      console.error("Error al eliminar:", error);
      setLoadingDelete(false);
    }
  };

  const handleSuccessConfirm = () => {
    setShowSuccessAlert(false);
    navigate('/');
  };

  return (
    <>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogTrigger asChild>
          <Button onClick={() => setIsOpen(true)}>{TextoBoton}</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="AlertDialogContent bg-white dark:bg-gray-800 dark:text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>{Dialogo}</AlertDialogTitle>
            <AlertDialogDescription>{Descripcion}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {loadingDelete ? (
              <ButtonLoading className="boton1" />
            ) : (
              <AlertDialogAction className="boton1" onClick={handleEliminarClick}>
                {alertButton1}
              </AlertDialogAction>
            )}
            <AlertDialogAction className="boton2" onClick={handleVolver}>
              {alertButton2}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showSuccessAlert} onOpenChange={setShowSuccessAlert}>
        <AlertDialogContent className="AlertDialogContent bg-white dark:bg-gray-800 dark:text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>¡Éxito!</AlertDialogTitle>
            <AlertDialogDescription>
              La cuenta ha sido eliminada correctamente
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleSuccessConfirm}>
              Aceptar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AlertaW2Buttons;