// /strategies/ViewStrategy.ts
import { CardStrategy } from "@/interfaces/CardStrategy";

export class ViewStrategy implements CardStrategy {
  // Aquí puedes definir propiedades específicas para las vistas
  private viewQuery: string;

  constructor() {
    // Aquí puedes definir una consulta de ejemplo para la vista
    this.viewQuery = "SELECT * FROM my_view";
  }

  // Implementa el método `execute` de la interfaz
  execute(): void {
    console.log("Executing ViewStrategy with query:", this.viewQuery);
    // Aquí podrías agregar la lógica de ejecución específica para las vistas, como ejecutar una consulta
  }

  // Devuelve el tipo de estrategia
  getType(): string {
    return "View";
  }
}
