import { contarEnRango, quickSort } from "./utils";

export class GeneradorNormal {
  private tabla: number[][];

  public generarDistribucionNormal(n: number, cantIntervalos: number, media: number, desviacion: number, metodoNormal: string): void {
    this.tabla = [];


    let rndsUniformes: number[] = [];
    let rnds: number[] = [];
    switch (metodoNormal) {
      case 'box-muller':
        for (let i: number = 0; i < n * 2; i++) {
          let rndUniforme: number = Math.random();
          rndsUniformes.push(rndUniforme);
        }

        for (let i: number = 0; i < rndsUniformes.length; i += 2) {
          let rnd1: number = rndsUniformes[i];
          let rnd2: number = rndsUniformes[i + 1];
          let n1: number = (Math.sqrt(-2 * Math.log(rnd1)) * Math.cos(2 * Math.PI * rnd2)) * desviacion + media;
          let n2: number = (Math.sqrt(-2 * Math.log(rnd1)) * Math.sin(2 * Math.PI * rnd2)) * desviacion + media;
          rnds.push(n1);
          rnds.push(n2);
        }
        break;
      case 'convolucion':
        let rndsUniformes: number[] = [];
        let suma: number = 0;
        for (let i: number = 0; i < 12; i++) {
          let rndUniforme: number = Math.random();

        }
        break;
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