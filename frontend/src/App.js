import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

function App() {
  return (<div className="App">
    <Router>
      <div>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */
        }
        <Switch>
          <Route path="/admin">
            <Admin/>
          </Route>
          <Route path="/">
            <Client/>
          </Route>
        </Switch>
      </div>
    </Router>
  </div>);
}

function Admin() {
  const [operators, setOperators] = useState([0, 0, 0]);

  function updateOperators(index) {
    return function(evt) {
      let operatorsArr = [...operators];
      operatorsArr[index] = evt.target.value;
      setOperators(operatorsArr);
    }
  }

  function postOperators() {
    //no me importa el callback, no deberia fallar nunca
    fetch("http://localhost:3001/availableOperators", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({operators})
    });
  }

  return <div>
    <div>
      <label for="operador">Operadores disponibles</label>
      <input id="operador" value={operators[0]} onChange={updateOperators(0)}></input>
    </div>
    <div>
      <label for="supervisor">Supervisores disponibles</label>
      <input id="supervisor" value={operators[1]} onChange={updateOperators(1)}></input>
    </div>
    <div>
      <label for="gerente">Gerentes disponibles</label>
      <input id="gerente" value={operators[2]} onChange={updateOperators(2)}></input>
    </div>
    <button onClick={postOperators}>Aceptar</button>
  </div>
}

function Client() {

  const [message, setMessage] = useState("");

  function connectOperator() {
    (async function() {
      let response = await fetch("http://localhost:3001/connectOperator", {method: "GET"});
      let responseMessage = await response.text();
      setMessage(responseMessage);
    }())
  }

  return <div>
    <span>{message}</span>
    {
      message
        ? <button onClick={connectOperator}>Buscar otro operador</button>
        : <button onClick={connectOperator}>Buscar operador</button>
    }
  </div>
}

export default App;
