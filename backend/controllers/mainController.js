const templateMessage = (role) => `Hola soy el ${role}, en que puedo ayudarle.`;
const errorMessage = "Lo siento, no hay ningun operador disponible actualmente, intente nuevamente mas tarde."
class MainController {
  constructor(){
    this.counter = 0;
    //maybe implement a db here to control users instead of just having them into memory
    this.freeOperators = [3,3,3],
    this.operatorsMessages = [
      templateMessage("operador nivel 1"),
      templateMessage("supervisor"),
      templateMessage("gerente")
    ]
  }

  connectOperator(req, res) {
    let index = this.freeOperators.findIndex((available) => available>0);
    if(index >= 0) {
      this.freeOperators[index]--;
      res.send(this.operatorsMessages[index]);
    } else {
      res.status(400).send(errorMessage);
    }
  }

  updateAvailableOperators(req, res) {
    let body = req.body;
    console.log(body, body.operators);
    this.freeOperators = body.operators;
    console.log(this.freeOperators);
    res.end();
  }
}

module.exports = new MainController();
