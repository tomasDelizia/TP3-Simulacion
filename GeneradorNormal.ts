import { GeneradorDistribucion } from "./GeneradorDistribucion";
import { contarEnRango, quickSort } from "./utils";

export class GeneradorNormal implements GeneradorDistribucion {
  private tabla: number[][];

  public async generarDistribucion(n: number, cantIntervalos: number, media: number, desviacion: number, metodoNormal: string): Promise<any> {
    this.tabla = [];

    let rnds: number[] = [];
    switch (metodoNormal) {
      case 'box-muller':
        for (let i: number = 0; i < Math.floor(n / 2) + 1; i += 2) {
          let rnd1: number = Math.random();
          let rnd2: number = Math.random();
          let n1: number = (Math.sqrt(-2 * Math.log(rnd1)) * Math.cos(2 * Math.PI * rnd2)) * desviacion + media;
          let n2: number = (Math.sqrt(-2 * Math.log(rnd1)) * Math.sin(2 * Math.PI * rnd2)) * desviacion + media;
          rnds.push(n1);
          if (rnds.length < n)
            rnds.push(n2);
        }
        break;
      case 'convolucion':
        for (let i: number = 0; i < n; i++) {
          let suma: number = 0;
          for (let i: number = 0; i < 12; i++) {
            let rndUniforme: number = Math.random();
            suma += rndUniforme;
          }
          let rnd: number = (suma - 6) * desviacion + media;
          rnds.push(rnd);
        }
        break;
    }


    quickSort(rnds);

    let limInferior: number = Math.fround(rnds[0];
    const anchoIntervalo: number = 1 / cantIntervalos;
    

    for (let i: number = 0; i < cantIntervalos; i++) {
      let limSuperior: number = limInferior + anchoIntervalo;
      let frecObservada = contarEnRango(rnds, limInferior, limSuperior);
      let probEsperada: number = Math.exp(-1/2 * ((G3-Media)/DesvStd)^2)/(DesvStd*RAIZ(2*PI()))*(F3-E3)
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