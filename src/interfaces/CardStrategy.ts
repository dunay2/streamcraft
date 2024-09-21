// Definimos la interfaz base para las estrategias
export interface CardStrategy {
  execute(): void; // Método común para todos los subtipos
  getType(): string; // Retorna el tipo de card (tabla, vista, transformación, etc.)
}
