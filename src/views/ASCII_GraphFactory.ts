import { Edge } from "../domain/interfaces/Edge";
import { Vertex } from "../domain/interfaces/Vertex";

/**
 * To build path as expected by ihm
 */
export default class ASCII_GraphFactory {

    private static Metric1unit = "km";
    private static Metric2unit = "co";
    /**
     * Build the path "view"
     * @param graph 
     */
    public static Build(graph : ReadonlyArray<Vertex>) : string[]
    {
        // no so easy to do.
        /*
        simple view
        return [
            "...................",
            ".+-----+ . +-----+.",
            ".| 000 |---| 004 |.",
            ".+-----+ . +-----+.",
            "... | ....... | ...",
            ".+-----+ . +-----+.",
            ".| 003 |---| 001 |.",
            ".+-----+ . +-----+.",
            "... | .............",
            ".+-----+ ..........",
            ".| 002 | ..........",
            ".+-----+ ..........",
            "..................."
        ];
        */
       /*
       wanted
       return [
        "..................................",
        ". +-----+ 126.5km +-----+ ........",
        ". | 000 |---------| 004 | ........",
        ". +-----+ 018.7co +-----+ ........",
        "... | ............. | ............",
        "... | 080.2km ..... | 005.3km ....",
        "... | 014.3co ..... | 000.2co ....",
        "... | ............. | ............",
        ". +-----+ 030.7km +-----+ ........",
        ". | 003 |---------| 001 | ........",
        ". +-----+ 004.0co +-----+ ........",
        "... | ............................",
        "... | 030.8km ....................",
        "... | 004.0co ....................",
        "... | ............................",
        ". +-----+ ........................",
        ". | 002 | ........................",
        ". +-----+ ........................",
        ".................................."
       ];
       */
       const vertex0_edge_vertex4 : string [] = 
            this.concatH(
                this.drawVertex(0),
                this.drawHedge(graph[0],4),
                this.drawVertex(4),
            );
        const edge03_______edge41 : string[]=
            this.concatH(
                this.drawVedge(graph[0],3),
                this.drawVedge(graph[4],1),
                []
            );
        const vertex3_edge_vertex1 : string [] = 
            this.concatH(
                this.drawVertex(3),
                this.drawHedge(graph[3],1),
                this.drawVertex(1),
            );
        const edge32 : string [] = this.drawVedge(graph[3],2);
        const vertex2 : string [] =
            this.drawVertex(3);
    
        return          vertex0_edge_vertex4
                .concat(edge03_______edge41)
                .concat(vertex3_edge_vertex1)
                .concat(edge32)
                .concat(vertex2);
    }

    private static drawVertex(id : number) : string [] {
       return [
           "+-----+",
           `| ${this.drawInteger(id)} |`,
           "+-----+",
       ];
    }
    //-----------------------
    private static drawHedge(vertex : Vertex, idVertex2 : number) : string [] {
        const edge : Edge | undefined = vertex.find(e => e.vertex_id===idVertex2);
        if(edge) {
            return this.drawHEdge(edge.distance_km, edge.co2_g);
        }
        return [];
    }
    private static drawHEdge(metric1: number, metric2: number) : string [] {
        return [
            ` ${this.drawReal(metric1)}${ASCII_GraphFactory.Metric1unit} `,
            "<------->",
            ` ${this.drawReal(metric2)}${ASCII_GraphFactory.Metric2unit} `,
        ];
    }
    //-----------------------
    private static drawVedge(vertex : Vertex, idVertex2 : number) : string [] {
        const edge : Edge | undefined = vertex.find(e => e.vertex_id===idVertex2);
        if(edge) {
            return this.drawVEdge(edge.distance_km, edge.co2_g);
        }
        return [];
    }
    private static drawVEdge(metric1: number, metric2: number) : string [] {
        return [
            ". | ............",
            `. | ${this.drawReal(metric1)}${ASCII_GraphFactory.Metric1unit} ....`,
            `. | ${this.drawReal(metric2)}${ASCII_GraphFactory.Metric2unit} ....`,
            ". | ............",
            ];
    }

    private static drawReal(value : number) : string {
        const arr = value.toString().split(".");
        arr[0] = arr[0].padStart(3, "0");
        arr[1] = arr[1] ? arr[1].substring(0,1).padEnd(1, "0") : "0";
        return arr.join(".");
    }
    private static drawInteger(value : number) : string {
        return value.toString().padStart(3, "0");
    }

    private static concatH(rows1 : string[], rows2 : string[], rows3 : string[]) : string [] {
        const rows : string [] = [];
        for(let line : number =0; line<rows1.length; line++) {
            if(line<rows2.length && line<rows3.length) {
                rows[line] = rows1[line] + rows2[line] + rows3[line];
            }
            else if(line<rows2.length) {
                rows[line] = rows1[line] + rows2[line]
            } 
            else {
                rows[line] = rows1[line] + rows2[line] + rows3[line];
            }
        }
        return rows;

    }
}