import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import "@/Styles/cuentas.css";
import Tables from '@/components/Tables';

export default function Cuentas() {
 const navigate = useNavigate();

 const handleVolver = () => {
   navigate('/');
 };

 return (
   <main>
     <section className="nav">
       <h1 className="titulo">Cuentas</h1>
     </section>
     <Tables /> 
     <div className="boton">
       <Button onClick={handleVolver}>
         Volver
       </Button> 
     </div>
   </main>
 );
}