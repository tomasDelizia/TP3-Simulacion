import { contarEnRango, quickSort } from "./utils";

export class GeneradorUniforme {
  private tabla: number[][];

  public generarDistribucionUniforme(n: number, cantIntervalos: number, a: number, b: number): void {
    this.tabla = [];

    let rnds: number[] = [];
    for (let i: number = 0; i < n; i++) {
      let rnd: number = a + (Math.random() * (b - a));
      rnds.push(rnd);
    }

    quickSort(rnds);

    let limInferior: number = a;
    const anchoIntervalo: number = 1 / cantIntervalos;
    const frecEsperada: number = n / cantIntervalos;

    for (let i: number = 0; i < cantIntervalos; i++) {
      let limSuperior: number = limInferior + anchoIntervalo;
      let frecObservada: number = contarEnRango(rnds, limInferior, limSuperior);
      this.tabla.push([
        limInferior,
        limSuperior,
        (limInferior + limSuperior) / 2,
        frecObservada,
        frecEsperada
      ]);
      limInferior = limSuperior;
    }
  }
}