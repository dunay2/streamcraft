import { CardStrategy } from "../interfaces/CardStrategy";
import { ISQLDialect } from "../interfaces/ISQLDialect";
import { ITable } from "../interfaces/ITable";
import { ITableColumn } from "../interfaces/ITableColumn";

export class TableStrategy implements CardStrategy {
  private table: ITable;
  private dialect: ISQLDialect;

  constructor(
    tableName: string,
    dialect: ISQLDialect,
    tableType: "temporary" | "transient" | "permanent" | "external"
  ) {
    this.table = {
      name: tableName,
      columns: [],
      tableType: tableType, // Asignamos el tipo de tabla
    };
    this.dialect = dialect;
  }

  // Método para agregar columnas
  addColumn(column: ITableColumn): void {
    this.table.columns.push(column);
  }

  // Método para establecer la clave primaria
  setPrimaryKey(key: string): void {
    this.table.primaryKey = key;
    const primaryKeyColumn = this.table.columns.find((col) => col.name === key);
    if (primaryKeyColumn) {
      primaryKeyColumn.isPrimaryKey = true;
    }
  }

  // Método para agregar claves foráneas
  addForeignKey(column: string, reference: string): void {
    if (!this.table.foreignKeys) {
      this.table.foreignKeys = [];
    }
    this.table.foreignKeys.push({ column, reference });
    const foreignKeyColumn = this.table.columns.find(
      (col) => col.name === column
    );
    if (foreignKeyColumn) {
      foreignKeyColumn.isForeignKey = true;
      foreignKeyColumn.foreignKeyRef = reference;
    }
  }

  // Generar el SQL de selección
  execute(): void {
    const columnNames = this.table.columns.map((col) => col.alias || col.name);
    const query = this.dialect.generateSelect(this.table.name, columnNames);
    console.log("Executing SQL Query:", query);

    if (this.table.primaryKey) {
      console.log(`Primary Key is set: ${this.table.primaryKey}`);
    } else {
      console.warn("Primary Key is not set");
    }
  }

  // Generar el SQL de creación de tabla
  generateCreateTable(): void {
    const columnDefinitions = this.table.columns.map((col) => {
      let colDef = `${col.name} ${col.type}`;
      if (!col.isNullable) {
        colDef += " NOT NULL";
      }
      if (col.comment) {
        colDef += ` COMMENT '${col.comment}'`;
      }
      return colDef;
    });

    const createTableSQL = this.dialect.generateCreateTable(
      this.table.name,
      columnDefinitions,
      this.table.primaryKey,
      this.table.foreignKeys?.map(
        (fk) => `${fk.column} REFERENCES ${fk.reference}`
      ),
      this.table.tableType
    );
    console.log("Create Table SQL:", createTableSQL);
  }

  getType(): string {
    return "Table";
  }
}
