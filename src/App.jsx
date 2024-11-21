import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CrearCliente from "./pages/CrearCliente";
import CrearCuenta from "./pages/CrearCuenta";
import Cuentas from "./pages/Cuentas";
import Depositar from "./pages/Depositar";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crearCliente" element={<CrearCliente />} />
        <Route path="/crearCuenta" element={<CrearCuenta />} />
        <Route path="/cuentas" element={<Cuentas />} />
        <Route path="/depositar" element={<Depositar />} />
      </Routes>
  );
}

export default App;
