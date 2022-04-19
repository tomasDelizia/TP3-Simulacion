import { GeneradorDistribucion } from "./GeneradorDistribucion";
import { PruebaBondad } from "./PruebaBondad";

export class PruebaKS extends PruebaBondad {
  // Tabla KS con p = 0.95, para grados de libertad entre 1 y 40.
  private tablaKS: number[] = [
    0.975, 0.842, 0.708, 0.624, 0.563, 0.519, 0.483, 0.454, 0.43, 0.409,
    0.391, 0.375, 0.361, 0.349, 0.338, 0.327, 0.318, 0.309, 0.301, 0.294,
    0.287, 0.281, 0.275, 0.269, 0.264, 0.259, 0.254, 0.25, 0.246, 0.242,
    0.238, 0.234, 0.231, 0.227, 0.224, 0.221, 0.218, 0.215, 0.213, 0.21
  ];

  public async probar(generador: GeneradorDistribucion): Promise<any> {
    this.tablaPrueba = [];
    // Obtenemos el valor del estadístico tabulado y los grados de libertad.
    let n: number = generador.getN();
    if (n > 40) {
      this.estadisticoTabulado = 1.36 / Math.sqrt(n);
    }
    else {
      this.v = n;
      this.estadisticoTabulado = this.tablaKS[this.v-1];
    }

    // Inicializamos las variables de conteo de las probabilidades observada y esperada acumuladas.
    let probObsAc: number = 0;
    let probEspAc: number = 0;
    let tablaDistribucion: number[][] = generador.getTabla();
    this.estadisticoPrueba = 0;
    for (let i: number = 0; i < tablaDistribucion.length; i++) {
      probObsAc += tablaDistribucion[i][3];
      probEspAc += tablaDistribucion[i][5];
      let diferencia: number = Math.abs(probObsAc - probEspAc);
      this.tablaPrueba.push([
        tablaDistribucion[i][0],
        tablaDistribucion[i][1],
        tablaDistribucion[i][2],
        tablaDistribucion[i][3],
        tablaDistribucion[i][4],
        tablaDistribucion[i][5],
        tablaDistribucion[i][6],
        Number(probObsAc.toFixed(4)),
        Number(probEspAc.toFixed(4)),
        Number(diferencia.toFixed(4))
      ]);
      this.estadisticoPrueba = Math.max(this.estadisticoPrueba, diferencia);
    }
  }
}