import { GeneradorLenguaje } from "./GeneradorLenguaje";
import { GeneradorLineal } from "./GeneradorLineal";
import { GeneradorNumeros } from "./GeneradorNumeros";
import { contarEnRango, contarSi, factorial, quickSort } from "./utils";

export class GeneradorPoisson {
  private rnds: number[];
  private tabla: number[][];

  public async generarDistribucion(n: number, cantIntervalos: number, lambda: number): Promise<any> {
    this.rnds = [];
    this.tabla = [];

    for (let i: number = 0; i < n; i++) {
      let p: number = 1;
      let rnd: number = -1;
      let a: number = Math.exp(-lambda);
      do {
        let u: number = Math.random();
        p = p * u;
        rnd = rnd + 1;
      } while (p >= a);
      this.rnds.push(rnd);
    }

    quickSort(this.rnds);

    const min: number = this.rnds[0];
    const max: number = this.rnds[n - 1];

    for (let i: number = min; i <= max; i++) {
      let valor: number = i;
      let frecObservada = contarSi(this.rnds, valor);
      let probEsperada: number = Math.pow(lambda, valor) * Math.exp(-lambda) / factorial(valor);
      let frecEsperada: number = Math.round(probEsperada * n);
      this.tabla.push([
        valor,
        frecObservada,
        probEsperada,
        frecEsperada
      ]);
    }
  }

  public getRnds(): number[] {
    return this.rnds;
  }

  public getTabla(): number[][] {
    return this.tabla;
  }
}