import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import GraphFactory from "../views/GraphFactory";
import Graph from "../domain/Graph";

export default class MainController {

    private router: FastifyInstance;
    private graph : Graph;

    private version : string = "1.0";
    private apiName : string = "pathfinder-api";

    constructor(router: FastifyInstance) {
        this.router = router
        this.graph = new Graph();

        router.get("/",
            this.homePage.bind(this));
    }

    /**
     * 
     * @param request 
     * @param reply 
     */
    async homePage(request : FastifyRequest,reply : FastifyReply)
    {
       try
       {
            request.log.info( "SW - /" );
            const graphInfo = this.graph.Info;
            const graph = GraphFactory.Build( this.graph.Graph );
            reply.view("./assets/templates/index.ejs", { ...graphInfo, graph } );
       }
       catch(error) {
            request.log.error( error );
           return Promise.reject(error);
       }
    }
}