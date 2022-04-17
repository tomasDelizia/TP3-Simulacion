import { GeneradorDistribucion } from "./GeneradorDistribucion";
import { contarEnRango, quickSort } from "./utils";

export class GeneradorUniforme implements GeneradorDistribucion {
  private tabla: number[][];

  public async generarDistribucion(n: number, cantIntervalos: number, metodo: string, a: number, b: number): Promise<any> {
    this.tabla = [];

    let rnds: number[] = [];
    switch (metodo) {
      case "generador-js":
        for (let i: number = 0; i < n; i++) {
          let rnd: number = a + (Math.random() * (b - a));
          rnds.push(rnd);
        }
        break;
      case "generador-lineal":
          
    }


    quickSort(rnds);

    let limInferior: number = a;
    const anchoIntervalo: number = (b - a) / cantIntervalos;
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