import { GeneradorLenguaje } from "./GeneradorLenguaje";
import { GeneradorLineal } from "./GeneradorLineal";
import { GeneradorNumeros } from "./GeneradorNumeros";
import { contarEnRango, quickSort } from "./utils";

export class GeneradorUniforme {
  private generador: GeneradorNumeros;
  private rnds: number[];
  private tabla: number[][];

  public async generarDistribucion(n: number, metodo: string, cantIntervalos: number, a: number, b: number): Promise<any> {
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
        let rnd: number = a + (this.generador.getRnds()[i] * (b - a));
        this.rnds.push(rnd);
    }

    quickSort(this.rnds);

    let limInferior: number = a;
    const anchoIntervalo: number = (b - a) / cantIntervalos;
    const frecEsperada: number = n / cantIntervalos;

    for (let i: number = 0; i < cantIntervalos; i++) {
      let limSuperior: number = limInferior + anchoIntervalo;
      let marcaClase: number = (limInferior + limSuperior) / 2;
      let frecObservada: number = contarEnRango(this.rnds, limInferior, limSuperior);
      this.tabla.push([
        limInferior,
        limSuperior,
        marcaClase,
        (limInferior + limSuperior) / 2,
        frecObservada,
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