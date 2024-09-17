import { INode } from "@/interfaces/INode";
import { NodeState } from "@/models/NodeState";

/**
 * @class Node
 * @implements INode
 * @description
 * Implementa la lógica de un nodo en el grafo de conexiones. Permite gestionar el estado,
 * las conexiones a otros nodos y añade metadatos adicionales. Usa `Set` para gestionar las conexiones.
 */
export class Node implements INode {
  id: string;
  type: string;
  connections: Set<INode>; // Usamos `Set` para evitar duplicados en las conexiones
  state: NodeState;
  metadata: Record<string, unknown>; // Metadatos adicionales para almacenar información variable

  constructor(
    id: string,
    type: string,
    metadata: Record<string, unknown> = {}
  ) {
    this.id = id;
    this.type = type;
    this.connections = new Set<INode>();
    this.state = NodeState.ACTIVE; // Por defecto, el nodo empieza en estado "activo"
    this.metadata = metadata; // Metadatos opcionales
  }

  /**
   * @method setState
   * @description Cambia el estado del nodo.
   * @param {NodeState} newState - El nuevo estado que queremos asignar al nodo.
   */
  setState(newState: NodeState): void {
    this.state = newState;
  }

  /**
   * @method connect
   * @description Conecta el nodo actual con otro nodo. No permite conexiones duplicadas.
   * @param {INode} targetNode - El nodo con el que queremos establecer la conexión.
   * @param {boolean} bidirectional - Si es true, también conectará el nodo destino al actual.
   */
  connect(targetNode: INode, bidirectional = true): void {
    if (!this.connections.has(targetNode)) {
      this.connections.add(targetNode);
      if (bidirectional) {
        targetNode.connect(this, false); // Conexión bidireccional
      }
    }
  }

  /**
   * @method disconnect
   * @description Desconecta el nodo actual de otro nodo.
   * @param {INode} targetNode - El nodo que queremos desconectar.
   * @param {boolean} bidirectional - Si es true, también desconectará el nodo destino del actual.
   */
  disconnect(targetNode: INode, bidirectional = true): void {
    this.connections.delete(targetNode);
    if (bidirectional) {
      targetNode.disconnect(this, false); // Desconexión bidireccional
    }
  }

  /**
   * @method getConnectedNodes
   * @description Devuelve una lista de nodos conectados al nodo actual.
   * @returns {INode[]} Lista de nodos conectados.
   */
  getConnectedNodes(): INode[] {
    return Array.from(this.connections);
  }

  /**
   * @method isConnectedTo
   * @description Verifica si el nodo está conectado a otro nodo.
   * @param {INode} targetNode - El nodo que queremos verificar si está conectado.
   * @returns {boolean} True si el nodo está conectado al targetNode, false en caso contrario.
   */
  isConnectedTo(targetNode: INode): boolean {
    return this.connections.has(targetNode);
  }

  /**
   * @method canConnect
   * @description Verifica si se puede conectar el nodo actual con otro nodo.
   * Puede ser útil para validar conexiones entre diferentes tipos de nodos.
   * @param {INode} targetNode - El nodo objetivo.
   * @returns {boolean} True si es posible realizar la conexión.
   */
  canConnect(targetNode: INode): boolean {
    if (this.type === "Table" && targetNode.type === "Transformation") {
      return true; // Permitir conexiones de Table a Transformation
    }

    return true; // Ejemplo básico: permitimos todas las conexiones
  }

  /**
   * @method toJSON
   * @description Convierte el nodo a formato JSON, incluyendo las conexiones.
   * @returns {string} Representación en JSON del nodo.
   */
  toJSON(): string {
    return JSON.stringify({
      id: this.id,
      type: this.type,
      state: this.state,
      metadata: this.metadata,
      connections: Array.from(this.connections).map((node) => node.id), // Solo incluimos los IDs de las conexiones
    });
  }

  /**
   * @method fromJSON
   * @description Carga un nodo a partir de datos JSON.
   * @param {string} jsonData - Los datos en formato JSON.
   */
  fromJSON(jsonData: string): void {
    const data = JSON.parse(jsonData);
    this.id = data.id;
    this.type = data.type;
    this.state = data.state;
    this.metadata = data.metadata;
    // La lógica para restaurar las conexiones debe manejarse externamente
  }
}
