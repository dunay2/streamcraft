// /interfaces/ITableColumn.ts
export interface ITableColumn {
  name: string; // Nombre de la columna
  type: string; // Tipo de dato (ej: INT, VARCHAR(255))
  isNullable: boolean; // Si permite valores nulos
  isPrimaryKey?: boolean; // Si es clave primaria (opcional)
  isForeignKey?: boolean; // Si es clave foránea (opcional)
  foreignKeyRef?: string; // Referencia a la tabla y columna de la FK
  alias?: string; // Alias opcional para la columna
  comment?: string; // Comentario o descripción de la columna
  lineage?: string; // Datos de procedencia de la columna
  dataGovernance?: {
    // Información de gobernanza de datos
    sensitiveData?: boolean; // Si la columna contiene datos sensibles
    accessControlLevel?: string; // Nivel de control de acceso
  };
}
