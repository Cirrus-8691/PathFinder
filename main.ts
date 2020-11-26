import HttpGateway from "./HttpGateway";
import MainController from "./controllers/MainController";
import PathFinderController from "./controllers/PathFinderController";
import PagesController from "./controllers/PagesController";

/**
 * Main function to start server
 */
(async function main() {
    // Init Fastify router
    const http = new HttpGateway();

    // Controllers
    new MainController(http.router);
    new PathFinderController(http.router);
    new PagesController(http.router);

    // Fastify router start
    await http.start();
})()
