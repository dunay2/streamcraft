// /interfaces/ITable.ts

import { ITableColumn } from "./ITableColumn";

export interface ITable {
  name: string; // Nombre de la tabla
  alias?: string; // Alias opcional para la tabla
  columns: ITableColumn[]; // Lista de columnas
  primaryKey?: string; // Clave primaria, si está definida
  foreignKeys?: {
    // Lista de claves foráneas, si existen
    column: string; // Columna que actúa como FK
    reference: string; // Referencia a otra tabla.columna
  }[];
  comment?: string; // Comentario o descripción de la tabla
  lineage?: string; // Información de procedencia de los datos en la tabla
  dataGovernance?: {
    // Información de gobernanza de datos
    classification?: string; // Clasificación de la tabla (ej: confidencial)
    accessControlLevel?: string; // Nivel de control de acceso
  };

  // Tipo de tabla (temporal, transitoria, etc.)
  tableType: "temporary" | "transient" | "permanent" | "external"; // Dependiendo del dialecto
  diskSize?: number; // Tamaño en disco
  memoryUsage?: number; // Tamaño en memoria
  fragmentationLevel?: number; // Nivel de fragmentación
  creationDate?: Date; // Fecha de creación
  lastModified?: Date; // Última modificación
  queryHistory?: string[]; // Histórico de consultas
  tableState?: "active" | "archived" | "deprecated"; // Estado de la tabla
  nullPercentage?: number; // Proporción de datos nulos
  lastBatchSize?: number; // Tamaño del último batch de carga
  compressionRate?: number; // Nivel de compresión de la tabla
  lockWaitTime?: number; // Tiempo de espera por bloqueos
  dataSkew?: number; // Índice de desbalance de datos
  schemaChangeHistory?: string[]; // Histórico de cambios en el esquema
  criticalEvents?: string[]; // Lista de eventos críticos
}
