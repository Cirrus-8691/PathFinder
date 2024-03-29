import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import AsciiGraphFactory from "../views/AsciiGraphFactory";
import Graph from "../domain/Graph";
import fs from 'fs';
import CanvasGraphFactory from "../views/CanvasGraphFactory";
/**
 * Main application Controller
 */
export default class MainController {

    private router: FastifyInstance;
    private graph : Graph;

    constructor(router: FastifyInstance) {
        this.router = router
        this.graph = new Graph();

        router.head("/",
            this.head.bind(this));

        router.get("/",
            this.homePage.bind(this));

        router.get("/favicon",
            this.favicon.bind(this));

        router.get("/logo",
            this.logo.bind(this));

        router.get("/globalStyle",
            this.globalStyle.bind(this));
    }


    /**
     * Just test if server is alive
     * @param request 
     * @param reply 
     */
    async head(request : FastifyRequest,reply : FastifyReply)
    {
       try
       {
            request.log.info( "HEAD - /" );
            const buffer = fs.readFileSync("./assets/templates/components/head.ejs");
            reply.type('text/html').send(buffer);
       }
       catch(error) {
           request.log.error( error );
           return MainController.errorPage( error, reply);
       }
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
            const graphAscii = AsciiGraphFactory.Build( this.graph.Graph );
            const graphCanvas = CanvasGraphFactory.Build( this.graph.Graph );
            return reply.view("./assets/templates/index.ejs", { ...graphInfo, graphAscii, graphCanvas } );
       }
       catch(error) {
            request.log.error( error );
           return MainController.errorPage( error, reply);
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

            const buffer = fs.readFileSync('./assets/images/favicon.ico');
            reply.type('vnd.microsoft.icon').send(buffer);
       }
       catch(error) {
            request.log.error( error );
           return Promise.reject(error);
       }
    }

    /**
     * Logo
     * @param request 
     * @param reply 
     */
    async logo(request : FastifyRequest,reply : FastifyReply)
    {
       try
       {
            request.log.info( "SW - /logo" );

            const buffer = fs.readFileSync('./assets/images/logo.jpeg');
            reply.type('image/jpeg').send(buffer);

       }
       catch(error) {
            request.log.error( error );
           return Promise.reject(error);
       }
    }

    /**
     * Style CSS
     * @param request 
     * @param reply 
     */
    async globalStyle(request : FastifyRequest,reply : FastifyReply)
    {
       try
       {
            request.log.info( "SW - /globalStyle" );

            const buffer = fs.readFileSync('./assets/styles/globals.css');
            reply.type('text/css').send(buffer);

       }
       catch(error) {
            request.log.error( error );
           return Promise.reject(error);
       }
    }

    /**
     * Error page
     * @param request 
     * @param reply 
     */
    static errorPage(error : any,reply : FastifyReply)
    {
       try
       {
            reply.view("./assets/templates/error.ejs", { error } );
       }
       catch(error) {
           return Promise.reject(error);
       }
    }
}