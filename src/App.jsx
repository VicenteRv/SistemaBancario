import "../public/styles/app.css";

import Home from "../public/pages/Home";
import Login from "../public/pages/Login";
import Deposito from "../public/pages/Deposito";
import Retiro from "../public/pages/Retiro";
import Saldo from "../public/pages/Saldo";
import Movimientos from "../public/pages/Movimientos";
import PagoTC from "../public/pages/PagoTC";
import PagoServ from "../public/pages/PagoServ";

function App() {

  return (
    <>
      <div className="atm-container">
        <Saldo/>
      </div>
    </>
  )
}

export default App
