import { GeneradorDistribucion } from "./GeneradorDistribucion";
import { GeneradorLenguaje } from "./GeneradorLenguaje";
import { GeneradorLineal } from "./GeneradorLineal";
import { Utils } from "./Utils";

export class GeneradorNormal extends GeneradorDistribucion {

  public async generarDistribucionNormal(n: number, metodo: string, cantIntervalos: number, media: number, desviacion: number, metodoNormal: string): Promise<any> {
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

    switch (metodoNormal) {
      // Generamos las variables aleatorias normales por el método de Box-Muller.
      case 'box-muller':
        if (n % 2 === 0)
          this.generador.generarNumerosPseudoaleatorios(n);
        else
          this.generador.generarNumerosPseudoaleatorios(n + 1);
        for (let i: number = 0; i < n; i += 2) {
          let rnd1: number = this.generador.getRnds()[i];
          let rnd2: number = this.generador.getRnds()[i + 1];
          let n1: number = (Math.sqrt(-2 * Math.log(rnd1)) * Math.cos(2 * Math.PI * rnd2)) * desviacion + media;
          let n2: number = (Math.sqrt(-2 * Math.log(rnd1)) * Math.sin(2 * Math.PI * rnd2)) * desviacion + media;
          this.rnds.push(n1);
          if (this.rnds.length < n)
            this.rnds.push(n2);
        }
        break;

      // Generamos las variables aleatorias normales por el método de Convolución.   
      case 'convolucion':
        this.generador.generarNumerosPseudoaleatorios(12 * n);
        for (let i: number = 1; i <= n; i++) {
          let suma: number = 0;
          for (let j: number = 12 * (i - 1); j < 12 * i; j++) {
            suma += this.generador.getRnds()[j];
          }
          let rnd: number = (suma - 6) * desviacion + media;
          this.rnds.push(rnd);
        }
        break;
    }

    // Ordenamos el vector de variables aleatorias generadas.
    Utils.quickSort(this.rnds);

    const min: number = Math.floor(this.rnds[0]);
    const max: number = Math.ceil(this.rnds[n - 1]);
    let limInferior: number = min;
    const anchoIntervalo: number = (max - min) / cantIntervalos;

    // Armamos la tabla de distribución.
    for (let i: number = 0; i < cantIntervalos; i++) {
      let limSuperior: number = limInferior + anchoIntervalo;
      let marcaClase: number = (limInferior + limSuperior) / 2;
      let frecObservada = Utils.contarEnRango(this.rnds, limInferior, limSuperior);
      let probObservada: number = frecObservada / n;
      let probEsperada: number = 
        (Math.exp(-1/2 * Math.pow(((marcaClase - media) / desviacion),2)) / (desviacion * Math.sqrt(2 * Math.PI))) * (limSuperior - limInferior);
      let frecEsperada: number = probEsperada * n;
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