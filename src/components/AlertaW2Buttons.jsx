import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
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
  const [loadingDelete, setLoadingDelete] = useState(false);
  const navigate = useNavigate();

  const handleVolver = () => {
    setIsOpen(false);
    navigate(path2);
  };

  const handleEliminarClick = async () => {
    setLoadingDelete(true);
    await click();
    setLoadingDelete(false);
    navigate(path1);
  };

  return (
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
  );
};

export default AlertaW2Buttons;