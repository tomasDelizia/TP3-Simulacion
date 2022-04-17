import { GeneradorDistribucion } from "./GeneradorDistribucion";
import { contarEnRango, quickSort } from "./utils";

export class TestChiCuadrado {
  // Tabla de distribución Chi Cuadrado con p = 0.95, para grados de libertad entre 1 y 30.
  private tablaChiCuadrado: number[] = [
    3.841, 5.991, 7.815, 9.488, 11.07, 12.592, 14.067, 15.507, 16.919, 18.307,
    19.675, 21.026, 22.362, 23.685, 24.996, 26.296, 27.587, 28.869, 30.144, 31.41,
    32.671, 33.924, 35.172, 36.415, 37.652, 38.885, 40.113, 41.337, 42.557, 43.773,
  ];
  private v: number;
  private tabla: string[][];
  private estadisticoAcum: number;
  private rnds: number[];

  private tablaPrueba: number[][];

  public async probar(generador: GeneradorDistribucion): Promise<any> {
    this.tablaPrueba = [];
    // Agrupamos las frecuencias esperadas que no sean mayores o iguales a 5.
    let frecEsperadas: number[] = generador.getFrecuenciasEsperadas();
    let suma: number = 0;
    for (let i: number = 0; i < frecEsperadas.length; i++) {
      if (frecEsperadas[i] < 5) {
        suma += frecEsperadas[i];
      }
      else {
        if (suma < 5) {
          
        }
      }
    }
  }

  public async pruebaChiCuadrado(cantIntervalos: number, tamMuestra: number): Promise<any> {
    // Generamos la serie de números pseudoaleatorios utilizando el método provisto por el lenguaje.
    this.rnds = [];
    for (let i: number = 0; i < tamMuestra; i++) {
      let rnd: number = Number(Math.random().toFixed(4));
      this.rnds.push(rnd);
    }
    // Ordenamos el vector de números aleatorios.
    quickSort(this.rnds);

    let limInferior: number = 0;
    const anchoIntervalo: number = 1 / cantIntervalos;
    const frecEsperada: number = tamMuestra / cantIntervalos;
    this.estadisticoAcum = 0;
    this.tabla = [];
    this.v = cantIntervalos - 1;
    for (let i: number = 0; i < cantIntervalos; i++) {
      let limSuperior: number = limInferior + anchoIntervalo;
      let frecObservada = contarEnRango(this.rnds, limInferior, limSuperior);
      let estadistico : number = (Math.pow((frecObservada-frecEsperada),2)) / frecEsperada;
      this.estadisticoAcum += estadistico;
      this.tabla.push([
        limInferior.toFixed(2) + ' - ' + limSuperior.toFixed(2),
        frecObservada.toString(),
        frecEsperada.toFixed(4),
        estadistico.toFixed(4).toString(),
        this.estadisticoAcum.toFixed(4).toString(),
      ]);
      limInferior = limSuperior;
    }
  }

  public validarHipotesis(): string {
    if (this.v <= 0) {
      return 'No se puede realizar la prueba Chi-Cuadrado,';
    }
    else {
      const estadisticoTab: number = this.tablaChiCuadrado[this.v-1];
      // Si el estadistico calculado es mayor al tabulado, se rechaza la hipótesis nula.
      if (this.estadisticoAcum > estadisticoTab)
        return 'Ya que el estadístico calculado es mayor al estadístico tabulado (' + this.estadisticoAcum.toFixed(4) + ' > ' + estadisticoTab + '), se procede a rechazar la hipótesis nula.';
      else
        return 'Ya que el estadístico calculado es menor o igual al estadístico tabulado (' + this.estadisticoAcum.toFixed(4) + ' <= ' + estadisticoTab + '), no se puede rechazar la hipótesis nula.';
    }

  }

  public getTabla(): string[][] {
    return this.tabla;
  }

  public getFrecuenciasObservadas(): number[] {
    let frecObservadas: number[] = [];
    for (let i: number = 0; i < this.tabla.length; i++) {
      frecObservadas.push(Number(this.tabla[i][1]));
    }
    return frecObservadas;
  }

  public getFrecuenciasEsperadas(): number[] {
    let frecEsperadas: number[] = [];
    for (let i: number = 0; i < this.tabla.length; i++) {
      frecEsperadas.push(Number(this.tabla[i][2]));
    }
    return frecEsperadas;
  }
  
//  public getValoresIntervalos(): number[] {
//    const ancho: number = 1 / this.tabla.length;
//    let limInf: number = 0;
//    let limSup: number;
//    let intervalos: number[] = [limInf];
//    for (let i: number = 0; i < this.tabla.length; i++) {
//      limSup = Number((limInf + ancho).toFixed(2));
//      intervalos.push(limSup);
//      limInf = limSup;
//    }
//    return intervalos;
//  }

  public getIntervalos(): string[] {
    let intervalos: string[] = [];
    for (let i: number = 0; i < this.tabla.length; i++) {
      intervalos.push(this.tabla[i][0]);
    }
    return intervalos;
  }

  public getRnds(): number[] {
    return this.rnds;
  }
}