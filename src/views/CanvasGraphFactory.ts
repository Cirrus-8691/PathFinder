import { Vertex } from "../domain/interfaces/Vertex";

/**
 * To build path as expected by ihm
 */
export default class CanvasGraphFactory {

    private static Metric1unit = "km";
    private static Metric2unit = "co2";
    /**
     * Build the path "view"
     * @param graph
     */
    public static Build(graph : ReadonlyArray<Vertex>) : string[]
    {
       return [""];
    };
}