export interface GeneradorDistribucion {
  generarDistribucion(n: number, cantIntervalos: number, metodo: string, a?: number, b?: number, media?: number, desviacion?: number, metodoNormal?: string): Promise<any>
}