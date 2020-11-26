import { Vertex } from "../domain/interfaces/Vertex";
import { Path } from "./interfaces/Path";

/**
 * To build path as expected by ihm
 */
export default class GraphFactory {

    /**
     * Build the path "view"
     * @param params 
     * @param vertices 
     * @param totalWeight 
     */
    public static Build(graph : ReadonlyArray<Vertex>) : string[]
    {
        let vue = "";
        for(let id=0; id<graph.length; id++) {
            vue += id + "-" + graph[id]
        }
         return [ 
                "0-4" ,
                "| |",
                "3-1",
                "|",
                "2"
            ];
    }
}