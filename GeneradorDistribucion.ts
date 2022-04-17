export interface GeneradorDistribucion {
  generarDistribucion(rndsUniformes: number[], cantIntervalos: number, a?: number, b?: number, media?: number, desviacion?: number, metodoNormal?: string): Promise<any>;
  getRnds(): number[];
  getTabla(): number[][];
}