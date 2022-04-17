import { GeneradorDistribucion } from "./GeneradorDistribucion";
import { contarEnRango, quickSort } from "./utils";

export class GeneradorExponencial implements GeneradorDistribucion {
  private tabla: number[][];

  public async generarDistribucion(n: number, cantIntervalos: number, media: number): Promise<any> {
    let lambda: number = 1 / media;
    this.tabla = [];

    let rnds: number[] = [];
    for (let i: number = 0; i < n; i++) {
      let rnd: number = -1 * media * Math.log(1 - Math.random());
      rnds.push(rnd);
    }

    quickSort(rnds);

    let min: number = Math.floor(rnds[0]);
    let max: number = Math.ceil(rnds[rnds.length - 1]);
    let limInferior: number = min;
    const anchoIntervalo: number = (max - min) / cantIntervalos;
  

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