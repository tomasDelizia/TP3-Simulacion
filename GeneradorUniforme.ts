import { GeneradorDistribucion } from "./GeneradorDistribucion";
import { GeneradorLenguaje } from "./GeneradorLenguaje";
import { GeneradorLineal } from "./GeneradorLineal";
import { Utils } from "./Utils";

// Clase que genera variables aleatorias con distribución uniforme (A, B).
export class GeneradorUniforme extends GeneradorDistribucion {

  public async generarDistribucionUniforme(n: number, metodo: string, cantIntervalos: number, a: number, b: number): Promise<any> {
    this.n = n;
    this.rnds = [];
    this.tabla = [];

    switch (metodo) {
      // El método de generación de números pseudoaleatorios U(0, 1) es por el generador de JavaScript.
      case '1':
        this.generador = new GeneradorLenguaje();
        break;
      // El método de generación de números pseudoaleatorios U(0, 1) es por el generador congruencial lineal.
      case '2':
        this.generador = new GeneradorLineal();
        break;
    }
    this.generador.generarNumerosPseudoaleatorios(n);

    // Generamos las variables aleatorias uniformes (A, B).
    for (let i: number = 0; i < n; i++) {
      let rnd: number = a + (this.generador.getRnds()[i] * (b - a));
      this.rnds.push(rnd);
    }

    // Ordenamos el vector de variables aleatorias generadas.
    Utils.quickSort(this.rnds);

    let limInferior: number = a;
    const anchoIntervalo: number = (b - a) / cantIntervalos;
    const frecEsperada: number = n / cantIntervalos;
    const probEsperada: number = 1 / cantIntervalos;
  
    // Armamos la tabla de distribución.
    for (let i: number = 0; i < cantIntervalos; i++) {
      let limSuperior: number = limInferior + anchoIntervalo;
      let marcaClase: number = (limInferior + limSuperior) / 2;
      let frecObservada: number = Utils.contarEnRango(this.rnds, limInferior, limSuperior);
      let probObservada: number = frecObservada / n;
      this.tabla.push([
        Number(limInferior.toFixed(4)),
        Number(limSuperior.toFixed(4)),
        Number(marcaClase.toFixed(4)),
        Number(probObservada.toFixed(4)),
        Number(frecObservada.toFixed(4)),
        Number(probEsperada.toFixed(4)),
        Number(frecEsperada.toFixed(4))
      ]);
      limInferior = limSuperior;
    }
  }
}