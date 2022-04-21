import { GeneradorNumeros } from "./GeneradorNumeros";

// Clase abstracta que genera variables aleatorias de una determinada distribución.
export abstract class GeneradorVA {
  // El generador de números pseudoaleatorios con distribución uniforme (0, 1).
  protected generador: GeneradorNumeros;

  // El vector con las variables aleatorias a generar.
  protected rnds: number[];

  // Una matriz que lleva por columnas el límite inferior, el superior, la marca de clase, las probabilidades observada y esperada, y las frecuencias observada y esperada.
  protected tabla: number[][];

  // La cantidad de variables aleatorias a generar.
  protected n: number;

  public async generarDistribucionUniforme(n: number, metodo: string, cantIntervalos: number, a: number, b: number): Promise<any> {
    return null;
  }

  public async generarDistribucionExponencial(n: number, metodo: string, cantIntervalos: number, lambda: number): Promise<any> {
    return null;
  }

  public async generarDistribucionNormal(n: number, metodo: string, cantIntervalos: number, media: number, desviacion: number, metodoNormal: string): Promise<any> {
    return null;
  }

  public async generarDistribucionPoisson(n: number, lambda: number): Promise<any> {
    return null;
  }

  public getIntervalos(): string[] {
    let intervalos: string[] = [];
    for (let i: number = 0; i < this.tabla.length; i++) {
      let intervalo: string = this.tabla[i][0] + ' - ' + this.tabla[i][1];
      intervalos.push(intervalo);
    }
    return intervalos;
  }

  public getRnds(): number[] {
    return this.rnds;
  }

  public getTabla(): number[][] {
    return this.tabla;
  }

  public getFrecuenciasObservadas(): number[] {
    let frecObservadas: number[] = [];
    if (this.tabla != null) {
      for (let i: number = 0; i < this.tabla.length; i++) {
        let frecObservada: number = this.tabla[i][4];
        frecObservadas.push(frecObservada);
      }
    }
    return frecObservadas;
  }

  public getN(): number {
    return this.n;
  }
}