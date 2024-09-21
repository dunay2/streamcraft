import { CardStrategy } from "@/interfaces/CardStrategy";
import { TableStrategy } from "@/strategies/TableStrategy";
import { ViewStrategy } from "@/strategies/ViewStrategy";
import { TransformationStrategy } from "@/strategies/TransformationStrategy";
import { getDialect } from "@/factories/DialectFactory"; // Asumiendo que usas una fábrica de dialectos

export function getStrategyByType(
  type: string,
  transformationType?: string
): CardStrategy {
  switch (type) {
    case "Table": {
      // Obtenemos el dialecto
      const dialect = getDialect("Snowflake"); // O el dialecto que estés usando
      const tableStrategy = new TableStrategy("my_table", dialect, "permanent"); // Puedes ajustar el tipo de tabla

      // Agregamos las columnas
      tableStrategy.addColumn({ name: "id", type: "INT", isNullable: false });
      tableStrategy.addColumn({
        name: "name",
        type: "VARCHAR(255)",
        isNullable: false,
      });
      tableStrategy.addColumn({
        name: "email",
        type: "VARCHAR(255)",
        isNullable: true,
      });

      // Establecemos la clave primaria
      tableStrategy.setPrimaryKey("id");

      return tableStrategy;
    }

    case "View": {
      return new ViewStrategy();
    }

    case "Transformation": {
      return new TransformationStrategy(transformationType || "filter");
    }

    default: {
      throw new Error(`Unknown type: ${type}`);
    }
  }
}
