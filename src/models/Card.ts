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

  init(cardRef: HTMLDivElement): void {
    if (cardRef && this.instance) {
      const endpointOptions: EndpointOptions = {
        anchor: "Continuous",
        isSource: true,
        isTarget: true,
        connector: ["Straight", {}],
        endpoint: "Dot",
        maxConnections: -1,
      };

      this.instance.addEndpoint(cardRef, {
        ...endpointOptions, // Expansión del objeto para permitir sobrescritura de opciones
        isSource: true, // Confirmar que actúa como fuente
        isTarget: true, // Confirmar que actúa como destino
      });

      this.instance.draggable(cardRef);

      // Uso de `bind` en lugar de `on` para manejar conexiones
      this.instance.bind("connection", (info) => {
        const sourceId = info.sourceId;
        const targetId = info.targetId;
        console.log(`Conectando ${sourceId} con ${targetId}`);

        this.handleConnection(sourceId, targetId);
      });

      // Evento para manejar desconexiones
      this.instance.bind("connectionDetached", (info) => {
        const sourceId = info.sourceId;
        const targetId = info.targetId;
        console.log(`Desconectando ${sourceId} de ${targetId}`);

        this.handleDisconnection(sourceId, targetId);
      });

      this.instance.bind("beforeDrop", (info) => {
        console.log("Intentando conectar", info.sourceId, "con", info.targetId);
        if (info.sourceId === info.targetId) {
          console.warn("No se puede conectar un nodo consigo mismo");
          return false; // Rechazar la conexión
        }
        return true; // Permite la conexión
      });

      // Verificar errores en el proceso
      this.instance.bind("connectionMoved", (info) => {
        console.log(
          `Conexión movida: ${info.originalSourceId} -> ${info.newSourceId}`
        );
      });
    }
  }

  private handleConnection(sourceId: string, targetId: string): void {
    const sourceNode = this.graph.getNodeById(sourceId);
    const targetNode = this.graph.getNodeById(targetId);

    if (sourceNode && targetNode && sourceNode.canConnect(targetNode)) {
      sourceNode.connect(targetNode);
    } else {
      console.warn(`No se pudo conectar ${sourceId} con ${targetId}`);
    }
  }

  private handleDisconnection(sourceId: string, targetId: string): void {
    const sourceNode = this.graph.getNodeById(sourceId);
    const targetNode = this.graph.getNodeById(targetId);

    if (sourceNode && targetNode) {
      sourceNode.disconnect(targetNode);
    }
  }
}
