import fastify, {FastifyInstance} from "fastify"
import pointOfView from "point-of-view";
import ejs from "ejs";
/**
 * Define the HttpGateway server
 */
export default class HttpGateway  {

    private readonly instance: FastifyInstance

    constructor() {
        this.instance = fastify( {logger: true} );
        const option = {
            engine : {
                ejs
            }
        };
        this.instance.register( pointOfView , option);
    }

    get router() {
        return this.instance;
    }

    get port() {
        return 3000;
    }

    async start() {
        //await this.instance.listen(this.port, "127.0.0.1");
        await this.instance.listen(this.port, "localhost");
    }

}
