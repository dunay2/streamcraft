// /dialects/SnowflakeDialect.ts
import { ISQLDialect } from "../interfaces/ISQLDialect";

export class SnowflakeDialect implements ISQLDialect {
  generateSelect(tableName: string, columns: string[]): string {
    return `SELECT ${columns.join(", ")} FROM ${tableName};`;
  }

  generateCreateTable(
    tableName: string,
    columns: string[],
    primaryKey?: string,
    foreignKeys?: string[],
    tableType?: "temporary" | "transient" | "permanent" | "external"
  ): string {
    const columnsDefinition = columns.join(", ");
    let createSQL = `CREATE ${
      tableType ? tableType.toUpperCase() : ""
    } TABLE ${tableName} (${columnsDefinition}`;

    if (primaryKey) {
      createSQL += `, PRIMARY KEY(${primaryKey})`;
    }

    if (foreignKeys && foreignKeys.length) {
      foreignKeys.forEach((fk) => {
        createSQL += `, FOREIGN KEY (${fk})`;
      });
    }

    createSQL += ");";
    return createSQL;
  }

  generateDropTable(tableName: string): string {
    return `DROP TABLE IF EXISTS ${tableName};`;
  }
}
