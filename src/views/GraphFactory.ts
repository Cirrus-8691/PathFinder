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
        // no so easy to do.

        return [
            "...................",
            ".+-----+...+-----+.",
            ".| 000 |---| 004 |.",
            ".+-----+...+-----+.",
            "....|.........|....",
            ".+-----+...+-----+.",
            ".| 003 |---| 001 |.",
            ".+-----+...+-----+.",
            "....|..............",
            ".+-----+...........",
            ".| 002 |...........",
            ".+-----+...........",
            "..................."
        ];
   }

   private static createVertex(id : number) : string [] {
       return [
           "+-----+",
           `| ${id.toString(2)} |`,
           "+-----+",
       ];
   }
}