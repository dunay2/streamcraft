import { Node } from "./Node"; // Importamos la clase Node
import { INode } from "@/interfaces/INode";

/**
 * @class Graph
 * @description
 * Esta clase representa un grafo que puede contener múltiples nodos y gestiona
 * las conexiones entre ellos. Permite la serialización a JSON y la restauración desde JSON.
 */
export class Graph {
  private nodes: Map<string, INode>; // Mapa de nodos con ID como clave y Nodo como valor

  constructor() {
    this.nodes = new Map(); // Inicializamos el mapa de nodos
  }

  /**
   * @method addNode
   * @description Agrega un nodo al grafo si no existe previamente.
   * @param {INode} node - El nodo que se va a agregar.
   */
  addNode(node: INode): void {
    if (!this.nodes.has(node.id)) {
      this.nodes.set(node.id, node);
    } else {
      console.error(`Node with id ${node.id} already exists.`);
    }
  }

  /**
   * @method connectNodes
   * @description Conecta dos nodos utilizando sus IDs.
   * @param {string} sourceId - El ID del nodo fuente.
   * @param {string} targetId - El ID del nodo objetivo.
   */
  connectNodes(sourceId: string, targetId: string): void {
    const sourceNode = this.nodes.get(sourceId);
    const targetNode = this.nodes.get(targetId);

    if (sourceNode && targetNode) {
      sourceNode.connect(targetNode); // Conectamos los nodos
    } else {
      console.error("One of the nodes does not exist.");
    }
  }

  /**
   * @method disconnectNodes
   * @description Desconecta dos nodos utilizando sus IDs.
   * @param {string} sourceId - El ID del nodo fuente.
   * @param {string} targetId - El ID del nodo objetivo.
   */
  disconnectNodes(sourceId: string, targetId: string): void {
    const sourceNode = this.nodes.get(sourceId);
    const targetNode = this.nodes.get(targetId);

    if (sourceNode && targetNode) {
      sourceNode.disconnect(targetNode); // Desconectamos los nodos
    } else {
      console.error("One of the nodes does not exist.");
    }
  }

  /**
   * @method removeNode
   * @description Elimina un nodo del grafo y desconecta todos los nodos conectados a él.
   * @param {string} nodeId - El ID del nodo que se va a eliminar.
   */
  removeNode(nodeId: string): void {
    const nodeToRemove = this.nodes.get(nodeId);

    if (nodeToRemove) {
      // Desconectar todos los nodos conectados antes de eliminar el nodo
      nodeToRemove.getConnectedNodes().forEach((connectedNode) => {
        connectedNode.disconnect(nodeToRemove);
      });
      this.nodes.delete(nodeId); // Eliminamos el nodo del mapa
    } else {
      console.error(`Node with id ${nodeId} does not exist.`);
    }
  }

  /**
   * @method getConnections
   * @description Devuelve los nodos conectados a un nodo por su ID.
   * @param {string} nodeId - El ID del nodo del que se desean obtener las conexiones.
   * @returns {INode[] | undefined} - Lista de nodos conectados o undefined si no se encuentra el nodo.
   */
  getConnections(nodeId: string): INode[] | undefined {
    return this.nodes.get(nodeId)?.getConnectedNodes();
  }

  /**
   * @method getNodesByType
   * @description Obtiene todos los nodos de un tipo específico.
   * @param {string} type - El tipo de nodo (por ejemplo, "Table", "View", etc.).
   * @returns {Node[]} - Lista de nodos que coinciden con el tipo especificado.
   */
  getNodesByType(type: string): INode[] {
    return Array.from(this.nodes.values()).filter((node) => node.type === type);
  }

  /**
   * @method toJSON
   * @description Devuelve una representación JSON del grafo, mostrando los IDs de los nodos conectados.
   * @returns {string} - Cadena en formato JSON con la representación del grafo.
   */
  toJSON(): string {
    const graphObj: { [key: string]: string[] } = {};
    this.nodes.forEach((node, id) => {
      graphObj[id] = node.getConnectedNodes().map((conn) => conn.id);
    });
    return JSON.stringify(graphObj, null, 2);
  }

  /**
   * @method fromJSON
   * @description Restaura un grafo desde una representación JSON.
   * @param {string} jsonString - El JSON que representa el grafo.
   */
  fromJSON(jsonString: string): void {
    const graphObj: { [key: string]: string[] } = JSON.parse(jsonString);

    // Crear nodos
    Object.keys(graphObj).forEach((nodeId) => {
      const node = new Node(nodeId, "defaultType"); // Usar un tipo por defecto o almacenarlo en el JSON
      this.addNode(node);
    });

    // Restaurar conexiones
    Object.entries(graphObj).forEach(([nodeId, connectedNodeIds]) => {
      const node = this.nodes.get(nodeId);
      connectedNodeIds.forEach((connectedNodeId) => {
        const connectedNode = this.nodes.get(connectedNodeId);
        if (node && connectedNode) {
          node.connect(connectedNode, false); // Conexión no bidireccional
        }
      });
    });
  }
}
