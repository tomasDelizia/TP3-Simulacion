import { GeneradorNumeros } from "./GeneradorNumeros";

export abstract class GeneradorDistribucion {
  protected generador: GeneradorNumeros;
  protected rnds: number[];
  protected tabla: number[][];
  protected n: number;

  public async generarDistribucionUniforme(n: number, metodo: string, cantIntervalos: number, a: number, b: number): Promise<any> {
    return null;
  }

  public async generarDistribucionExponencial(n: number, metodo: string, cantIntervalos: number, media: number): Promise<any> {
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
    for (let i: number = 0; i < this.rnds.length; i++) {
      let intervalo: string = this.rnds[i][0] + ' - ' + this.rnds[i][1];
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

  public getFrecuenciasEsperadas(): number[] {
    let frecEsperadas: number[] = [];
    if (this.tabla != null) {
      for (let i: number = 0; i < this.tabla.length; i++) {
        let frecEsperada: number = this.tabla[i][6];
        frecEsperadas.push(frecEsperada);
      }
    }
    return frecEsperadas;
  }

  public getN(): number {
    return this.n;
  }
}