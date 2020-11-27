import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import { Health } from "../views/interfaces/Health";
import fs from "fs";
import { FindPathParameters } from "./requestParameters/FindPathParameters";
import PathFactory from "../views/PathFactory";
import Graph from "../domain/Graph";
import { Path } from "../views/interfaces/Path";
import GraphFactory from "../views/GraphFactory";

export default class PagesController {

    private router: FastifyInstance;
    private graph : Graph;

    constructor(router: FastifyInstance) {
        this.router = router
        this.graph = new Graph();

        router.get("/",
            this.homePage.bind(this));

        router.get<FindPathParameters>("/graph",
            this.graphPage.bind(this));

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
    /**
     * 
     * @param request 
     * @param reply 
     */
    async graphPage(request : FastifyRequest<FindPathParameters> ,reply : FastifyReply)
    {
       try
       {
           request.log.info( "SW - graphPage" );
           const params = request.query as FindPathParameters;
           params.from  = +params.from; // cast "from" string to number
           params.to    = +params.to;   // cast "to"   string to number
   
           request.log.info(`SW - graphPage from vertex id:${params.from} to vertex id:${params.to} by ${params.by}`);

           const path  = PathFactory.Build( params, this.graph.find(params) );
           const graph = GraphFactory.Build( this.graph.Graph );
           reply.view("./assets/templates/graph.ejs", { ...path, graph } );
       }
       catch(error) {
            request.log.error( error );
           return Promise.reject(error);
       }
    }

}