//const TextController = require("./controllers/textController")
let mainController = require("./controllers/mainController");

const routes = {
  '/connectOperator': {
    'GET': mainController.connectOperator.bind(mainController)
  },
  '/availableOperators': {
    'POST': mainController.updateAvailableOperators.bind(mainController)
  }
}


class Router {
  navigate(req, res, next) {
    let url = req.url.split('?')[0];
    let functionToCall = routes && routes[url] && routes[url][req.method];
    //console.log(req.url, req.method, routes[req.url], functionToCall);
    if (functionToCall) {
      functionToCall(req, res, next);
    } else {
      console.log("route not found:", url, req.method)
      //next(new Error("Route not found"));
    }
  }
}

module.exports = Router
