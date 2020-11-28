import HttpGateway from "./HttpGateway";
import MainController from "./controllers/MainController";
import GraphController from "./controllers/GraphController";

/**
 * Main function to start server
 */
(async function main() {
    // Init Fastify router
    const http = new HttpGateway();

    // Controllers
    new MainController(http.router);
    new GraphController(http.router);

    // Fastify router start
    await http.start();
})()
