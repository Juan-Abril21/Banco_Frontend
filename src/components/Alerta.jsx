import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Alerta = ({ mostrar, Dialogo, Descripcion, cerrarAlerta }) => {
  return (
    <AlertDialog open={mostrar} onOpenChange={cerrarAlerta}>
      <AlertDialogContent className="AlertDialogContent bg-white dark:bg-gray-800 dark:text-white">
        <AlertDialogHeader>
          <AlertDialogTitle>{Dialogo}</AlertDialogTitle>
          <AlertDialogDescription>{Descripcion}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={cerrarAlerta}>Aceptar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Alerta;
