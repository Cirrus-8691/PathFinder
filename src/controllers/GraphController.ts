import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import { FindPathParameters } from "./requestParameters/FindPathParameters";
import PathFactory from "../views/PathFactory";
import Graph from "../domain/Graph";
import GraphFactory from "../views/GraphFactory";
import MainController from "./MainController";

/**
 * Controller for Pages
 */
export default class GraphController {

    private router: FastifyInstance;
    private graph : Graph;

    constructor(router: FastifyInstance) {
        this.router = router
        this.graph = new Graph();

        router.get<FindPathParameters>("/findPath",
            this.findedPathPage.bind(this));

    }

    /**
     * Graph find path result
     * @param request 
     * @param reply 
     */
    async findedPathPage(request : FastifyRequest<FindPathParameters> ,reply : FastifyReply)
    {
       try
       {
           request.log.info( "SW - findedPathPage" );
           const params = request.query as FindPathParameters;
           params.from  = +params.from; // cast "from" string to number
           params.to    = +params.to;   // cast "to"   string to number
   
           request.log.info(`SW - graphPage from vertex id:${params.from} to vertex id:${params.to} by ${params.by}`);

           const path  = PathFactory.Build( params, this.graph.find(params) );
           const graph = GraphFactory.Build( this.graph.Graph );
           reply.view("./assets/templates/findedPath.ejs", { ...path, graph } );
       }
       catch(error) {
           request.log.error( error );
           return MainController.errorPage( error, reply);
       }
    }

}