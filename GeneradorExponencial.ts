import { contarEnRango, quickSort } from "./utils";

export class GeneradorExponencial {
  private tabla: number[][];

  public generarDistribucionExponencial(n: number, cantIntervalos: number, lambda: number): void {
    this.tabla = [];

    let rnds: number[] = [];
    for (let i: number = 0; i < n; i++) {
      let rnd: number = (-1 / lambda) * Math.log(1 - Math.random());
      rnds.push(rnd);
    }

    quickSort(rnds);

    let limInferior: number = rnds[0];
    const anchoIntervalo: number = 1 / cantIntervalos;
    

    for (let i: number = 0; i < cantIntervalos; i++) {
      let limSuperior: number = limInferior + anchoIntervalo;
      let frecObservada = contarEnRango(rnds, limInferior, limSuperior);
      let probEsperada: number = 1 - Math.exp(-lambda * limSuperior) - (1 - Math.exp(-lambda * limInferior));
      let frecEsperada: number = probEsperada * n;
      this.tabla.push([
        limInferior,
        limSuperior,
        (limSuperior + limInferior) / 2,
        frecObservada,
        probEsperada,
        frecEsperada
      ]);
      limInferior = limSuperior;
    }
  }
}