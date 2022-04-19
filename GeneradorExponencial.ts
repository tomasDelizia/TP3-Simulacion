import { GeneradorDistribucion } from "./GeneradorDistribucion";
import { GeneradorLenguaje } from "./GeneradorLenguaje";
import { GeneradorLineal } from "./GeneradorLineal";
import { Utils } from "./Utils";

export class GeneradorExponencial extends GeneradorDistribucion {

  public async generarDistribucionExponencial(n: number, metodo: string, cantIntervalos: number, lambda: number): Promise<any> {
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
      let rnd: number = (-1 / lambda) * Math.log(1 - Math.random());
      this.rnds.push(rnd);
    }

    Utils.quickSort(this.rnds);

    const min: number = Math.floor(this.rnds[0]);
    const max: number = Math.ceil(this.rnds[n - 1]);
    let limInferior: number = min;
    const anchoIntervalo: number = (max - min) / cantIntervalos;

    for (let i: number = 0; i < cantIntervalos; i++) {
      let limSuperior: number = limInferior + anchoIntervalo;
      let marcaClase: number = (limInferior + limSuperior) / 2;
      let frecObservada = Utils.contarEnRango(this.rnds, limInferior, limSuperior);
      let probObservada: number = frecObservada / n;
      let probEsperada: number = 1 - Math.exp(-lambda * limSuperior) - (1 - Math.exp(-lambda * limInferior));
      let frecEsperada: number = probEsperada * n;
      this.tabla.push([
        Number(limInferior.toFixed(4)),
        Number(limSuperior.toFixed(4)),
        Number( marcaClase.toFixed(4)),
        Number(probObservada.toFixed(4)),
        Number(frecObservada.toFixed(4)),
        Number(probEsperada.toFixed(4)),
        Number(frecEsperada.toFixed(4))
      ]);
      limInferior = limSuperior;
    }
  }
}