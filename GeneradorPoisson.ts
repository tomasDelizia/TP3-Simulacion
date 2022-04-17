import { GeneradorDistribucion } from "./GeneradorDistribucion";
import { contarSi, factorial, quickSort } from "./utils";

export class GeneradorPoisson extends GeneradorDistribucion {

  public async generarDistribucion(n: number, lambda: number): Promise<any> {
    this.n = n;
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
      let probObservada: number = frecObservada / n;
      let probEsperada: number = Math.pow(lambda, valor) * Math.exp(-lambda) / factorial(valor);
      let frecEsperada: number = Math.round(probEsperada * n);
      this.tabla.push([
        valor,
        valor,
        valor,
        probObservada,
        frecObservada,
        probEsperada,
        frecEsperada
      ]);
    }
  }

  public getIntervalos(): string[] {
    let valores: string[] = [];
    for (let i: number = 0; i < this.rnds.length; i++) {
      let valor: string = this.rnds[i][0];
      valores.push(valor);
    }
    return valores;
  }
}