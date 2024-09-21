// /dialects/PostgreSQLDialect.ts
import { ISQLDialect } from "../interfaces/ISQLDialect";

export class PostgreSQLDialect implements ISQLDialect {
  generateSelect(tableName: string, columns: string[]): string {
    return `SELECT ${columns.join(", ")} FROM ${tableName};`;
  }

  generateCreateTable(
    tableName: string,
    columns: string[],
    primaryKey?: string,
    indexes?: string[]
  ): string {
    const columnsDefinition = columns.join(", ");
    let createSQL = `CREATE TABLE ${tableName} (${columnsDefinition}`;

    if (primaryKey) {
      createSQL += `, PRIMARY KEY(${primaryKey})`;
    }
    if (indexes && indexes.length) {
      createSQL += `, INDEX (${indexes.join(", ")})`;
    }
    createSQL += ");";
    return createSQL;
  }

  generateDropTable(tableName: string): string {
    return `DROP TABLE IF EXISTS ${tableName};`;
  }
}
