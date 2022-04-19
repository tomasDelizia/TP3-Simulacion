// Interfaz que genera números pseudoaleatorios con distribución uniforme (0, 1).
export interface GeneradorNumeros {
  generarNumerosPseudoaleatorios(n : number): Promise<any>;
  getRnds(): number[];
}