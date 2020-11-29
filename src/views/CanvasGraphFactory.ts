import { ByEcoPath, ByFastestPath } from "../domain/Graph";
import { Vertex } from "../domain/interfaces/Vertex";

/**
 * To build path as expected by ihm
 */
export default class CanvasGraphFactory {
    /**
     * Build the path "view"
     * @param graph
     */
    public static Build(graph : ReadonlyArray<Vertex>)
    {
      return  { 
            vertices : [
                "0, 0",
                "1, 1",
                "0, 2",
                "0, 1",
                "1, 0",
            ],
            edges : [
                `0, 0, 1, 0, 125.6, 18.7`,
                `1, 0, 1, 1,  5.3, 0.2`,
                `0, 1, 1, 1, 30.7, 4.0`,
                `0, 0, 0, 1, 80.2, 4.0`,
                `0, 1, 0, 2, 30.8, 4.0`
            ],
            metrics : [
                ByFastestPath,
                ByEcoPath
            ]
        };
    };
}