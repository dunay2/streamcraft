import { Node } from "./Node";
import { jsPlumbInstance, EndpointOptions } from "jsplumb";
import { Graph } from "./Graph";

export class Card {
  node: Node;
  top: number;
  left: number;
  instance: jsPlumbInstance;
  graph: Graph;

  constructor(
    node: Node,
    top: number,
    left: number,
    instance: jsPlumbInstance,
    graph: Graph
  ) {
    this.node = node;
    this.top = top;
    this.left = left;
    this.instance = instance;
    this.graph = graph;
  }

  /**
   * @method init
   * Inicializa el nodo visual en el canvas. Agrega puntos de conexión, lo hace arrastrable y vincula eventos.
   */
  init(cardRef: HTMLDivElement): void {
    if (cardRef && this.instance) {
      // Opciones del endpoint que definen cómo se conectará el nodo visual
      const endpointOptions: EndpointOptions = {
        anchor: "Continuous", // Usamos "Continuous" como un string válido para el anchor
        isSource: true,
        isTarget: true,
        connector: ["Straight", {}], // Conexión recta entre nodos
        endpoint: "Dot", // Punto visual de conexión como un círculo
        maxConnections: -1, // Permitir conexiones ilimitadas
      };

      // Añadimos el punto de conexión al nodo visual
      this.instance.addEndpoint(cardRef, endpointOptions);

      // Hacemos el nodo arrastrable
      this.instance.draggable(cardRef);

      // Escuchamos el evento de conexión para reflejarlo en el grafo
      this.instance.bind("connection", (info) => {
        const sourceId = info.sourceId;
        const targetId = info.targetId;
        console.log(`Conectando ${sourceId} con ${targetId}`);

        // Obtenemos los nodos del grafo y conectamos
        const sourceNode = this.graph.getNodeById(sourceId);
        const targetNode = this.graph.getNodeById(targetId);

        if (sourceNode && targetNode && sourceNode.canConnect(targetNode)) {
          sourceNode.connect(targetNode); // Conectamos los nodos en el grafo
        } else {
          console.warn(`No se pudo conectar ${sourceId} con ${targetId}`);
        }
      });

      // Escuchamos el evento de desconexión para reflejarlo en el grafo
      this.instance.bind("connectionDetached", (info) => {
        // Sin tipo específico aquí

        const sourceId = info.sourceId;
        const targetId = info.targetId;
        console.log(`Desconectando ${sourceId} de ${targetId}`);

        // Obtenemos los nodos del grafo y desconectamos
        const sourceNode = this.graph.getNodeById(sourceId);
        const targetNode = this.graph.getNodeById(targetId);

        if (sourceNode && targetNode) {
          sourceNode.disconnect(targetNode); // Desconectamos los nodos en el grafo
        }
      });
    }
  }
}
