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
    public static Build(graph : ReadonlyArray<Vertex>) //: string[]
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
                "0, 0, 1, 0",
                "1, 0, 1, 1",
                "0, 1, 1, 1",
                "0, 0, 0, 1",
                "0, 1, 0, 2",
            ]
        };
    };
}