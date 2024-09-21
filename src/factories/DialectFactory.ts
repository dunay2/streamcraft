// /factories/DialectFactory.ts
import { ISQLDialect } from "../interfaces/ISQLDialect";
import { MySQLDialect } from "../dialects/MySQLDialect";
import { PostgreSQLDialect } from "../dialects/PostgreSQLDialect";
import { SnowflakeDialect } from "../dialects/SnowflakeDialect";

export function getDialect(dialectType: string): ISQLDialect {
  switch (dialectType) {
    case "MySQL":
      return new MySQLDialect();
    case "PostgreSQL":
      return new PostgreSQLDialect();
    case "Snowflake":
      return new SnowflakeDialect();
    default:
      throw new Error(`Unknown dialect type: ${dialectType}`);
  }
}
