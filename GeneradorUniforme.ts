import { GeneradorDistribucion } from "./GeneradorDistribucion";
import { GeneradorLenguaje } from "./GeneradorLenguaje";
import { GeneradorLineal } from "./GeneradorLineal";
import { Utils } from "./Utils";

export class GeneradorUniforme extends GeneradorDistribucion {

  public async generarDistribucionUniforme(n: number, metodo: string, cantIntervalos: number, a: number, b: number): Promise<any> {
    this.n = n;
    this.rnds = [];
    this.tabla = [];

    switch (metodo) {
      case '1':
        this.generador = new GeneradorLenguaje();
        break;
      case '2':
        this.generador = new GeneradorLineal();
        break;
    }
    this.generador.generarNumerosPseudoaleatorios(n);

    for (let i: number = 0; i < n; i++) {
      let rnd: number = a + (this.generador.getRnds()[i] * (b - a));
      this.rnds.push(rnd);
    }

    Utils.quickSort(this.rnds);

    let limInferior: number = a;
    const anchoIntervalo: number = (b - a) / cantIntervalos;
    const frecEsperada: number = n / cantIntervalos;
    const probEsperada: number = 1 / cantIntervalos;

    for (let i: number = 0; i < cantIntervalos; i++) {
      let limSuperior: number = limInferior + anchoIntervalo;
      let marcaClase: number = (limInferior + limSuperior) / 2;
      let frecObservada: number = Utils.contarEnRango(this.rnds, limInferior, limSuperior);
      let probObservada: number = frecObservada / n;
      this.tabla.push([
        limInferior,
        limSuperior,
        marcaClase,
        probObservada,
        frecObservada,
        probEsperada,
        frecEsperada
      ]);
      limInferior = limSuperior;
    }
  }
}