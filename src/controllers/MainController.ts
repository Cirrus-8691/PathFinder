import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import GraphFactory from "../views/GraphFactory";
import Graph from "../domain/Graph";
import fs from 'fs';
/**
 * Main application Controller
 */
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

        router.get("/favicon",
            this.favicon.bind(this));

        router.get("/logo",
            this.logo.bind(this));
    }

    /**
     * Home page
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
     * Browser tab icon
     * @param request 
     * @param reply 
     */
    async favicon(request : FastifyRequest,reply : FastifyReply)
    {
       try
       {
            request.log.info( "SW - /favicon" );

            const stream = fs.createReadStream('./assets/images/favicon.ico');
            reply.type('vnd.microsoft.icon').send(stream);
       }
       catch(error) {
            request.log.error( error );
           return Promise.reject(error);
       }
    }

    /**
     * logo
     * @param request 
     * @param reply 
     */
    async logo(request : FastifyRequest,reply : FastifyReply)
    {
       try
       {
            request.log.info( "SW - /logo" );

         const stream = fs.createReadStream('./assets/images/logo.jpeg');
            reply.type('jpeg').send(stream);

       }
       catch(error) {
            request.log.error( error );
           return Promise.reject(error);
       }
    }
}