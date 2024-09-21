// /interfaces/SQLDialect.ts
export interface ISQLDialect {
  generateSelect(tableName: string, columns: string[]): string;
  generateCreateTable(
    tableName: string,
    columns: string[],
    primaryKey?: string,
    foreignKeys?: string[],
    tableType?: "temporary" | "transient" | "permanent" | "external"
  ): string;
  generateDropTable(tableName: string): string;
}
