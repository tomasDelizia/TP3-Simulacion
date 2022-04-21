import { GeneradorVA } from './GeneradorVA';
import { Utils } from "./Utils";

// Clase que genera variables aleatorias con distribución Poisson.
export class GeneradorPoisson extends GeneradorVA {
  public async generarDistribucionPoisson(n: number, lambda: number): Promise<any> {
    this.n = n;
    this.rnds = [];
    this.tabla = [];

    // Generamos las variables aleatorias con distribución Poisson.
    for (let i: number = 0; i < n; i++) {
      // Producto de números uniformes (0, 1).
      let p: number = 1;
      // Iniciamos la variable Poisson en -1.
      let rnd: number = -1;
      // Constante de corte.
      let a: number = Math.exp(-lambda);
      do {
        // Obtenemos un RND uniforme (0, 1).
        let u: number = Math.random();
        p = p * u;
        rnd = rnd + 1;
      } while (p >= a);
      this.rnds.push(rnd);
    }

    // Ordenamos el vector de variables aleatorias generadas.
    Utils.quickSort(this.rnds);

    const min: number = this.rnds[0];
    const max: number = this.rnds[n - 1];

    // Armamos la tabla de distribución.
    for (let i: number = min; i <= max; i++) {
      let valor: number = i;
      let frecObservada = Utils.contarSi(this.rnds, valor);
      let probObservada: number = frecObservada / n;
      let probEsperada: number =
        (Math.pow(lambda, valor) * Math.exp(-lambda)) / Utils.factorial(valor);
      let frecEsperada: number = Math.round(probEsperada * n);
      this.tabla.push([
        valor,
        valor,
        valor,
        Number(probObservada.toFixed(4)),
        Number(frecObservada.toFixed(4)),
        Number(probEsperada.toFixed(4)),
        Number(frecEsperada.toFixed(4))
      ]);
    }
  }

  public getIntervalos(): string[] {
    let valores: string[] = [];
    for (let i: number = 0; i < this.tabla.length; i++) {
      let valor: string = this.tabla[i][0].toString();
      valores.push(valor);
    }
    return valores;
  }
}
