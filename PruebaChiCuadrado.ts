import { GeneradorDistribucion } from "./GeneradorDistribucion";
import { PruebaBondad } from "./PruebaBondad";
import { contarEnRango } from "./utils";

export class PruebaChiCuadrado extends PruebaBondad {
  // Tabla de distribución Chi Cuadrado con p = 0.95, para grados de libertad entre 1 y 30.
  private tablaChiCuadrado: number[] = [
    3.841, 5.991, 7.815, 9.488, 11.07, 12.592, 14.067, 15.507, 16.919, 18.307,
    19.675, 21.026, 22.362, 23.685, 24.996, 26.296, 27.587, 28.869, 30.144, 31.41,
    32.671, 33.924, 35.172, 36.415, 37.652, 38.885, 40.113, 41.337, 42.557, 43.773,
  ];

  private tabla: string[][];
  private rnds: number[];
  private k: number;
  private m: number;

  public async probar(generador: GeneradorDistribucion): Promise<any> {
    this.tablaPrueba = [];
    let tablaDistribucion: number[][] = generador.getTabla();
    // Obtenemos el valor del estadístico de tabulado y los grados de libertad.
    this.k = tablaDistribucion.length;
    this.m = -1;
    if (generador.constructor.name === 'GeneradorPoisson')
      this.m = 2;
    else {
      this.m = 1;
    }
    this.v = this.k - this.m - 1;
    this.estadisticoTabulado = this.tablaChiCuadrado[this.v-1];

    // Agrupamos las frecuencias esperadas que no sean mayores o iguales a 5.
    let frecEsperadas: number[] = generador.getFrecuenciasEsperadas();
    let suma: number = 0;
    for (let i: number = 0; i < frecEsperadas.length; i++) {
      //let estadistico : number = (Math.pow((frecObservada-frecEsperada),2)) / frecEsperada;
      //this.estadisticoPrueba += estadistico;
      if (frecEsperadas[i] < 5) {
        suma += frecEsperadas[i];
      }
      if (suma === 5) {
      
      }
    }
  }

  public async pruebaChiCuadrado(cantIntervalos: number, tamMuestra: number): Promise<any> {

    let limInferior: number = 0;
    const anchoIntervalo: number = 1 / cantIntervalos;
    const frecEsperada: number = tamMuestra / cantIntervalos;
    this.estadisticoPrueba = 0;
    this.tabla = [];
    this.v = cantIntervalos - 1;
    for (let i: number = 0; i < cantIntervalos; i++) {
      let limSuperior: number = limInferior + anchoIntervalo;
      let frecObservada = contarEnRango(this.rnds, limInferior, limSuperior);
      let estadistico : number = (Math.pow((frecObservada-frecEsperada),2)) / frecEsperada;
      this.estadisticoPrueba += estadistico;
      this.tabla.push([
        limInferior.toFixed(2) + ' - ' + limSuperior.toFixed(2),
        frecObservada.toString(),
        frecEsperada.toFixed(4),
        estadistico.toFixed(4).toString(),
        this.estadisticoPrueba.toFixed(4).toString(),
      ]);
      limInferior = limSuperior;
    }
  }

  public validarHipotesis(): string {
    if (this.v <= 0 || this.v > 30) {
      return 'No se puede realizar la prueba Chi-Cuadrado,';
    }
    super.validarHipotesis();
  }
}