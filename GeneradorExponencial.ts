import { GeneradorLenguaje } from "./GeneradorLenguaje";
import { GeneradorLineal } from "./GeneradorLineal";
import { GeneradorNumeros } from "./GeneradorNumeros";
import { contarEnRango, quickSort } from "./utils";

export class GeneradorExponencial {
  private generador: GeneradorNumeros;
  private rnds: number[];
  private tabla: number[][];

  public async generarDistribucion(n: number, metodo: string, cantIntervalos: number, media: number): Promise<any> {
    let lambda: number = 1 / media;
    this.rnds = [];
    this.tabla = [];

    switch (metodo) {
      case 'generador-js':
        this.generador = new GeneradorLenguaje();
        break;
      case 'generador-lineal':
        this.generador = new GeneradorLineal();
        break;
    }
    this.generador.generarNumerosPseudoaleatorios(n);

    for (let i: number = 0; i < n; i++) {
      let rnd: number = -1 * media * Math.log(1 - Math.random());
      this.rnds.push(rnd);
    }

    quickSort(this.rnds);

    const min: number = Math.floor(this.rnds[0]);
    const max: number = Math.ceil(this.rnds[n - 1]);
    let limInferior: number = min;
    const anchoIntervalo: number = (max - min) / cantIntervalos;

    for (let i: number = 0; i < cantIntervalos; i++) {
      let limSuperior: number = limInferior + anchoIntervalo;
      let marcaClase: number = (limInferior + limSuperior) / 2;
      let frecObservada = contarEnRango(this.rnds, limInferior, limSuperior);
      let probEsperada: number = 1 - Math.exp(-lambda * limSuperior) - (1 - Math.exp(-lambda * limInferior));
      let frecEsperada: number = probEsperada * n;
      this.tabla.push([
        limInferior,
        limSuperior,
        marcaClase,
        frecObservada,
        probEsperada,
        frecEsperada
      ]);
      limInferior = limSuperior;
    }
  }

  public getRnds(): number[] {
    return this.rnds;
  }

  public getTabla(): number[][] {
    return this.tabla;
  }
}