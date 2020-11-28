import { Vertex } from "../domain/interfaces/Vertex";
import { Path } from "./interfaces/Path";

/**
 * To build path as expected by ihm
 */
export default class GraphFactory {

    private static Metric1unit = "km";
    private static Metric2unit = "co";
    /**
     * Build the path "view"
     * @param params 
     * @param vertices 
     * @param totalWeight 
     */
    public static Build(graph : ReadonlyArray<Vertex>) : string[]
    {
        // no so easy to do.
        /*
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
   }

   private static drawVertex(id : number) : string [] {
       return [
           "+-----+",
           `| ${this.drawInteger(id)} |`,
           "+-----+",
       ];
   }
   private static drawHEdge(metric1: number, metric2: number) : string [] {
        return [
            ` ${this.drawReal(metric1)}${GraphFactory.Metric1unit} `,
            "<------->",
            ` ${this.drawReal(metric2)}${GraphFactory.Metric2unit} `,
        ];
   }

   private static drawReal(value : number) : string {
        const arr = value.toString().split(".");
        arr[0] = arr[0].padStart(3, "0");
        arr[1] = arr[1].substring(0,1).padEnd(1, "0");
        return arr.join(".");
   }
   private static drawInteger(value : number) : string {
    return value.toString().padStart(3, "0");
}

}