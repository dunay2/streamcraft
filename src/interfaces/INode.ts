import { NodeState } from "../models/NodeState";

/**
 * @interface INode
 * @description
 * Representa un nodo en el sistema, con sus conexiones, estado, tipo y metadatos opcionales.
 * Los nodos pueden conectarse entre sí y mantener conexiones bidireccionales.
 */
export interface INode {
  id: string; // Identificador único del nodo
  type: string; // Tipo dinámico definido en el registro (por ejemplo: "Table", "View", etc.)

  /**
   * @property {Set<INode>} connections
   * @description
   * Conjunto de nodos a los que este nodo está conectado directamente. El uso de Set garantiza que no haya duplicados.
   */
  connections: Set<INode>; // Nodos conectados (Set para evitar duplicados)

  /**
   * @property {NodeState} state
   * @description
   * Estado actual del nodo (activo, inactivo, con error, advertencia).
   */
  state: NodeState; // Estado del nodo

  /**
   * @property {Record<string, unknown>} [metadata]
   * @description
   * Información adicional o metadatos que se pueden asociar al nodo. Este campo es opcional.
   */
  metadata?: Record<string, unknown>; // Metadatos opcionales para almacenamiento adicional

  /**
   * @method setState
   * @description
   * Cambia el estado actual del nodo.
   * @param {NodeState} newState - El nuevo estado que debe aplicarse al nodo.
   */
  setState(newState: NodeState): void;

  /**
   * @method connect
   * @description
   * Conecta el nodo actual con otro nodo. Si es bidireccional, se conecta en ambos sentidos.
   * @param {INode} targetNode - El nodo con el que queremos establecer la conexión.
   * @param {boolean} [bidirectional=true] - Si es true, también se conecta el nodo objetivo al nodo actual.
   */
  connect(targetNode: INode, bidirectional?: boolean): void;

  /**
   * @method disconnect
   * @description
   * Desconecta el nodo actual del nodo objetivo. Si es bidireccional, se desconecta en ambos sentidos.
   * @param {INode} targetNode - El nodo del que queremos desconectar el nodo actual.
   * @param {boolean} [bidirectional=true] - Si es true, también se desconecta el nodo objetivo del nodo actual.
   */
  disconnect(targetNode: INode, bidirectional?: boolean): void;

  /**
   * @method isConnectedTo
   * @description
   * Verifica si el nodo actual está directamente conectado al nodo objetivo.
   * @param {INode} targetNode - El nodo con el que queremos verificar la conexión.
   * @returns {boolean} - Retorna true si los nodos están conectados directamente, de lo contrario retorna false.
   */
  isConnectedTo(targetNode: INode): boolean;

  /**
   * @method canConnect
   * @description
   * Verifica si el nodo actual puede conectarse con otro nodo, basado en reglas de validación.
   * @param {INode} targetNode - El nodo objetivo al que queremos conectarnos.
   * @returns {boolean} - Retorna true si el nodo puede conectarse al nodo objetivo, de lo contrario retorna false.
   */
  canConnect(targetNode: INode): boolean;

  /**
   * @method getConnectedNodes
   * @description Devuelve una lista de nodos conectados al nodo actual.
   * @returns {INode[]} - Lista de nodos conectados.
   */
  getConnectedNodes(): INode[];

  /**
   * @method toJSON
   * @description
   * Serializa el nodo y sus conexiones a un formato JSON para persistencia.
   * @returns {string} - Representación JSON del nodo.
   */
  toJSON(): string;

  /**
   * @method fromJSON
   * @description
   * Carga los datos del nodo a partir de una representación en JSON.
   * @param {string} jsonData - El JSON con los datos del nodo.
   */
  fromJSON(jsonData: string): void;
}
