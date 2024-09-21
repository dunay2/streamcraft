// /strategies/TransformationStrategy.ts
import { CardStrategy } from "@/interfaces/CardStrategy";

export class TransformationStrategy implements CardStrategy {
  // Definimos las propiedades específicas para las transformaciones
  private transformationType: string;

  constructor(transformationType: string) {
    // Puedes inicializar el tipo de transformación (por ejemplo, "filter", "join", "aggregate")
    this.transformationType = transformationType;
  }

  // Implementamos el método `execute` de la interfaz
  execute(): void {
    console.log(
      "Executing TransformationStrategy of type:",
      this.transformationType
    );
    // Aquí podrías agregar la lógica específica para cada tipo de transformación
    switch (this.transformationType) {
      case "filter":
        console.log("Applying filter transformation...");
        // Lógica para aplicar filtros a los datos
        break;
      case "join":
        console.log("Applying join transformation...");
        // Lógica para hacer JOIN entre tablas
        break;
      case "aggregate":
        console.log("Applying aggregate transformation...");
        // Lógica para agregar datos
        break;
      default:
        console.warn("Unknown transformation type");
    }
  }

  // Retorna el tipo de card
  getType(): string {
    return "Transformation";
  }
}
