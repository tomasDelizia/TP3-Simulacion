export interface GeneradorNumeros {
  generarNumerosPseudoaleatorios
  (n : number): Promise<any>;
  getRnds(): number[];
}