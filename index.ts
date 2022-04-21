// Imports.
import { Chart } from 'chart.js';
import { GeneradorCSV } from './GeneradorCSV';
import { GeneradorVA } from './GeneradorVA';
import { GeneradorExponencial } from './GeneradorExponencial';
import { GeneradorNormal } from './GeneradorNormal';
import { GeneradorPoisson } from './GeneradorPoisson';
import { GeneradorUniforme } from './GeneradorUniforme';
import { HTMLUtils } from './HTMLUtils';
import { PruebaBondad } from './PruebaBondad';
import { PruebaChiCuadrado } from './PruebaChiCuadrado';
import { PruebaKS } from './PruebaKS';
import './style.css';

// Definición de los cuadros de texto de la interfaz de usuario.
const txtCantNros: HTMLInputElement = document.getElementById('txtCantNros') as HTMLInputElement;
const txtA: HTMLInputElement = document.getElementById('txtA') as HTMLInputElement;
const txtB: HTMLInputElement = document.getElementById('txtB') as HTMLInputElement;
const txtMedia: HTMLInputElement = document.getElementById('txtMedia') as HTMLInputElement;
const txtDesviacionEstandar: HTMLInputElement = document.getElementById('txtDesviacionEstandar') as HTMLInputElement;
const txtLambdaExponencial: HTMLInputElement = document.getElementById('txtLambdaExponencial') as HTMLInputElement;
const txtLambdaPoisson: HTMLInputElement = document.getElementById('txtLambdaPoisson') as HTMLInputElement;

// Definición de los combo Box de la interfaz de usuario.
const cboCantIntervalos: HTMLSelectElement = document.getElementById('cboCantIntervalos') as HTMLSelectElement;
const cboMetodoGeneracion: HTMLSelectElement = document.getElementById('cboMetodoGeneracion') as HTMLSelectElement;
const cboDistribucion: HTMLSelectElement = document.getElementById('cboDistribucion') as HTMLSelectElement;
const cboMetodoDistNormal: HTMLSelectElement = document.getElementById('cboMetodoDistNormal') as HTMLSelectElement;

// Definición de botones de la interfaz de usuario.
const btnDistUniforme: HTMLButtonElement = document.getElementById('btnDistUniforme') as HTMLButtonElement;
const btnDistNormal: HTMLButtonElement = document.getElementById('btnDistNormal') as HTMLButtonElement;
const btnDistExponencial: HTMLButtonElement = document.getElementById('btnDistExponencial') as HTMLButtonElement;
const btnDistPoisson: HTMLButtonElement = document.getElementById('btnDistPoisson') as HTMLButtonElement;

const btnDescargarUniforme: HTMLButtonElement = document.getElementById('btnDescargarUniforme') as HTMLButtonElement;
const btnDescargarNormal: HTMLButtonElement = document.getElementById('btnDescargarNormal') as HTMLButtonElement;
const btnDescargarExponencial: HTMLButtonElement = document.getElementById('btnDescargarExponencial') as HTMLButtonElement;
const btnDescargarPoisson: HTMLButtonElement = document.getElementById('btnDescargarPoisson') as HTMLButtonElement;

// Definición de las secciones de cada distribución.
const divDistUniforme: HTMLDivElement = document.getElementById('distUniforme') as HTMLDivElement;
const divDistNormal: HTMLDivElement = document.getElementById('distNormal') as HTMLDivElement;
const divDistExponencial: HTMLDivElement = document.getElementById('distExponencial') as HTMLDivElement;
const divDistPoisson: HTMLDivElement = document.getElementById('distPoisson') as HTMLDivElement;

// Definición de las tablas.
const tablaDistUniforme: HTMLTableElement = document.getElementById('tablaDistUniforme') as HTMLTableElement;
const tablaDistNormal: HTMLTableElement = document.getElementById('tablaDistNormal') as HTMLTableElement;
const tablaDistExponencial: HTMLTableElement = document.getElementById('tablaDistExponencial') as HTMLTableElement;
const tablaDistPoisson: HTMLTableElement = document.getElementById('tablaDistPoisson') as HTMLTableElement;

const tablaChiDistUniforme: HTMLTableElement = document.getElementById('tablaChiDistUniforme') as HTMLTableElement;
const tablaChiDistNormal: HTMLTableElement = document.getElementById('tablaChiDistNormal') as HTMLTableElement;
const tablaChiDistExponencial: HTMLTableElement = document.getElementById('tablaChiDistExponencial') as HTMLTableElement;
const tablaChiDistPoisson: HTMLTableElement = document.getElementById('tablaChiDistPoisson') as HTMLTableElement;

const tablaKSDistUniforme: HTMLTableElement = document.getElementById('tablaKSDistUniforme') as HTMLTableElement;
const tablaKSDistNormal: HTMLTableElement = document.getElementById('tablaKSDistNormal') as HTMLTableElement;
const tablaKSDistExponencial: HTMLTableElement = document.getElementById('tablaKSDistExponencial') as HTMLTableElement;

// Definición de los cuadros de texto con los resultados de las hipótesis.
const alertResChiUniforme: HTMLDivElement = document.getElementById('alertResChiUniforme') as HTMLDivElement;
const alertResChiNormal: HTMLDivElement = document.getElementById('alertResChiNormal') as HTMLDivElement;
const alertResChiExponencial: HTMLDivElement = document.getElementById('alertResChiExponencial') as HTMLDivElement;
const alertResChiPoisson: HTMLDivElement = document.getElementById('alertResChiPoisson') as HTMLDivElement;

const alertResKSUniforme: HTMLDivElement = document.getElementById('alertResKSUniforme') as HTMLDivElement;
const alertResKSNormal: HTMLDivElement = document.getElementById('alertResKSNormal') as HTMLDivElement;
const alertResKSExponencial: HTMLDivElement = document.getElementById('alertResKSExponencial') as HTMLDivElement;

// Definición del generador de archivos CSV.
const generadorCSV: GeneradorCSV = new GeneradorCSV();

// Definición de los parámetros.
let n: number;
let cantIntervalos: number;
let metodo: string;
let metodoNormal: string;
let a: number;
let b: number;
let media: number;
let desviacion: number;
let lambda: number;

// Definición del generador de variables aleatorias genérico, la prueba Chi-Cuadrado y la prueba KS.
let generadorVA: GeneradorVA;
const pruebaChiCuadrado: PruebaBondad = new PruebaChiCuadrado();
const pruebaKS: PruebaBondad = new PruebaKS();

// Definición de los histogramas de frecuencia.
const histogramaDistUniforme: HTMLCanvasElement = document.getElementById('histogramaDistUniforme') as HTMLCanvasElement;
let graficoDistUniforme: Chart;

const histogramaDistNormal: HTMLCanvasElement = document.getElementById('histogramaDistNormal') as HTMLCanvasElement;
let graficoDistNormal: Chart;

const histogramaDistExponencial: HTMLCanvasElement = document.getElementById('histogramaDistExponencial') as HTMLCanvasElement;
let graficoDistExponencial: Chart;

const histogramaDistPoisson: HTMLCanvasElement = document.getElementById('histogramaDistPoisson') as HTMLCanvasElement;
let graficoDistPoisson: Chart;

// Dispara la generación de un archivo CSV.
btnDescargarUniforme.addEventListener('click', generarArchivo);
btnDescargarNormal.addEventListener('click', generarArchivo);
btnDescargarExponencial.addEventListener('click', generarArchivo);
btnDescargarPoisson.addEventListener('click', generarArchivo);

// Genera un archivo CSV que contiene los números aleatorios generados.
function generarArchivo(): void {
  generadorCSV.generarArchivo(generadorVA.getRnds(), 'Serie');
}

// Al principio se ocultan todas las secciones de las distintas distribuciones.
HTMLUtils.ocultarSeccion(divDistUniforme);
HTMLUtils.ocultarSeccion(divDistNormal);
HTMLUtils.ocultarSeccion(divDistExponencial);
HTMLUtils.ocultarSeccion(divDistPoisson);

// Mostramos la sección correspondiente a la distribución elegida.
cboDistribucion.addEventListener('input', () => {
  switch (cboDistribucion.value) {
    // No se selecciona ninguna.
    case '0':
      HTMLUtils.ocultarSeccion(divDistUniforme);
      HTMLUtils.ocultarSeccion(divDistNormal);
      HTMLUtils.ocultarSeccion(divDistExponencial);
      HTMLUtils.ocultarSeccion(divDistPoisson);
      cboCantIntervalos.disabled = false;
      cboMetodoGeneracion.disabled = false;
      break;
    // Se selecciona la distribución uniforme.
    case 'uniforme':
      generadorVA = new GeneradorUniforme();
      HTMLUtils.mostrarSeccion(divDistUniforme);
      HTMLUtils.ocultarSeccion(divDistNormal);
      HTMLUtils.ocultarSeccion(divDistExponencial);
      HTMLUtils.ocultarSeccion(divDistPoisson);
      cboCantIntervalos.disabled = false;
      cboMetodoGeneracion.disabled = false;
      btnDescargarUniforme.disabled = true;
      break;
    // Se selecciona la distribución normal.
    case 'normal':
      generadorVA = new GeneradorNormal();
      HTMLUtils.mostrarSeccion(divDistNormal);
      HTMLUtils.ocultarSeccion(divDistUniforme);
      HTMLUtils.ocultarSeccion(divDistExponencial);
      HTMLUtils.ocultarSeccion(divDistPoisson);
      cboCantIntervalos.disabled = false;
      cboMetodoGeneracion.disabled = false;
      btnDescargarNormal.disabled = true;
      break;
    // Se selecciona la distribución exponencial.
    case 'exponencial':
      generadorVA = new GeneradorExponencial();
      HTMLUtils.mostrarSeccion(divDistExponencial);
      HTMLUtils.ocultarSeccion(divDistNormal);
      HTMLUtils.ocultarSeccion(divDistUniforme);
      HTMLUtils.ocultarSeccion(divDistPoisson);
      cboCantIntervalos.disabled = false;
      cboMetodoGeneracion.disabled = false;
      btnDescargarExponencial.disabled = true;
      break;
    // Se selecciona la distribución Poisson.
    case 'poisson':
      generadorVA = new GeneradorPoisson();
      HTMLUtils.mostrarSeccion(divDistPoisson);
      HTMLUtils.ocultarSeccion(divDistNormal);
      HTMLUtils.ocultarSeccion(divDistExponencial);
      HTMLUtils.ocultarSeccion(divDistUniforme);
      cboMetodoGeneracion.disabled = true;
      cboCantIntervalos.disabled = true;
      btnDescargarPoisson.disabled = true;
      break;
  }
});

// Dispara la generación de números aleatorios con distribución uniforme (A, B).
btnDistUniforme.addEventListener('click', async () => {
  // Validamos los parámetros.
  if (validarParametrosUniforme()) {
    HTMLUtils.limpiarTabla(tablaDistUniforme);
    HTMLUtils.limpiarTabla(tablaChiDistUniforme);
    HTMLUtils.limpiarTabla(tablaKSDistUniforme);
    limpiarGraficos();
    alertResChiUniforme.innerHTML = 'Resultado: ';
    alertResKSUniforme.innerHTML = 'Resultado: ';

    // Generamos las variables aleatorias con distribución uniforme (A, B).
    await generadorVA.generarDistribucionUniforme(n, metodo, cantIntervalos, a, b);
    for (let i: number = 0; i < generadorVA.getTabla().length; i++) {
      HTMLUtils.agregarFilaATabla(generadorVA.getTabla()[i], tablaDistUniforme);
    }
    btnDescargarUniforme.disabled = false;
    graficoDistUniforme = HTMLUtils.generarGrafico(histogramaDistUniforme, generadorVA.getIntervalos(), generadorVA.getFrecuenciasObservadas());

    // Realizamos la prueba Chi-Cuadrado.
    await pruebaChiCuadrado.probar(generadorVA);
    for (let i: number = 0; i < pruebaChiCuadrado.getTabla().length; i++) {
      HTMLUtils.agregarFilaATabla(pruebaChiCuadrado.getTabla()[i], tablaChiDistUniforme);
    }
    if (pruebaChiCuadrado.validarHipotesis())
      HTMLUtils.alertarExito(alertResChiUniforme);
    else
      HTMLUtils.alertarFracaso(alertResChiUniforme);
    alertResChiUniforme.innerHTML += pruebaChiCuadrado.getResultado();

    // Realizamos la prueba KS.
    await pruebaKS.probar(generadorVA);
    for (let i: number = 0; i < pruebaKS.getTabla().length; i++) {
      HTMLUtils.agregarFilaATabla(pruebaKS.getTabla()[i], tablaKSDistUniforme);
    }
    if (pruebaKS.validarHipotesis())
      HTMLUtils.alertarExito(alertResKSUniforme);
    else
      HTMLUtils.alertarFracaso(alertResKSUniforme);
    alertResKSUniforme.innerHTML += pruebaKS.getResultado();
  }
});

// Dispara la generación de números aleatorios con distribución normal.
btnDistNormal.addEventListener('click', async () => {
  // Validamos los parámetros.
  if (validarParametrosNormal()) {
    HTMLUtils.limpiarTabla(tablaDistNormal);
    HTMLUtils.limpiarTabla(tablaChiDistNormal);
    HTMLUtils.limpiarTabla(tablaKSDistNormal);
    limpiarGraficos()
    alertResChiNormal.innerHTML = 'Resultado: ';
    alertResKSNormal.innerHTML = 'Resultado: ';

    // Generamos las variables aleatorias con distribución normal.
    await generadorVA.generarDistribucionNormal(n, metodo, cantIntervalos, media, desviacion, metodoNormal);
    for (let i: number = 0; i < generadorVA.getTabla().length; i++) {
      HTMLUtils.agregarFilaATabla(generadorVA.getTabla()[i], tablaDistNormal);
    }
    btnDescargarNormal.disabled = false;
    graficoDistNormal = HTMLUtils.generarGrafico(histogramaDistNormal, generadorVA.getIntervalos(), generadorVA.getFrecuenciasObservadas());

    // Realizamos la prueba Chi-Cuadrado.
    await pruebaChiCuadrado.probar(generadorVA);
    for (let i: number = 0; i < pruebaChiCuadrado.getTabla().length; i++) {
      HTMLUtils.agregarFilaATabla(pruebaChiCuadrado.getTabla()[i], tablaChiDistNormal);
    }
    if (pruebaChiCuadrado.validarHipotesis())
      HTMLUtils.alertarExito(alertResChiNormal);
    else
      HTMLUtils.alertarFracaso(alertResChiNormal);
    alertResChiNormal.innerHTML += pruebaChiCuadrado.getResultado();

    // Realizamos la prueba KS.
    await pruebaKS.probar(generadorVA);
    for (let i: number = 0; i < pruebaKS.getTabla().length; i++) {
      HTMLUtils.agregarFilaATabla(pruebaKS.getTabla()[i], tablaKSDistNormal);
    }
    if (pruebaKS.validarHipotesis())
      HTMLUtils.alertarExito(alertResKSNormal);
    else
      HTMLUtils.alertarFracaso(alertResKSNormal);
    alertResKSNormal.innerHTML += pruebaKS.getResultado();
  }
});

// Dispara la generación de números aleatorios con distribución exponencial negativa.
btnDistExponencial.addEventListener('click', async () => {
  // Validamos los parámetros.
  if (validarParametrosExponencial()) {
    HTMLUtils.limpiarTabla(tablaDistExponencial);
    HTMLUtils.limpiarTabla(tablaChiDistExponencial);
    HTMLUtils.limpiarTabla(tablaKSDistExponencial);
    limpiarGraficos()
    alertResChiExponencial.innerHTML = 'Resultado: ';
    alertResKSExponencial.innerHTML = 'Resultado: ';

    // Generamos las variables aleatorias con distribución exponencial negativa.
    await generadorVA.generarDistribucionExponencial(n, metodo, cantIntervalos, lambda);
    for (let i: number = 0; i < generadorVA.getTabla().length; i++) {
      HTMLUtils.agregarFilaATabla(generadorVA.getTabla()[i], tablaDistExponencial);
    }
    btnDescargarExponencial.disabled = false;
    graficoDistExponencial = HTMLUtils.generarGrafico(histogramaDistExponencial, generadorVA.getIntervalos(), generadorVA.getFrecuenciasObservadas());

    // Realizamos la prueba Chi-Cuadrado.
    await pruebaChiCuadrado.probar(generadorVA);
    for (let i: number = 0; i < pruebaChiCuadrado.getTabla().length; i++) {
      HTMLUtils.agregarFilaATabla(pruebaChiCuadrado.getTabla()[i], tablaChiDistExponencial);
    }
    if (pruebaChiCuadrado.validarHipotesis())
      HTMLUtils.alertarExito(alertResChiExponencial);
    else
      HTMLUtils.alertarFracaso(alertResChiExponencial);
    alertResChiExponencial.innerHTML += pruebaChiCuadrado.getResultado();

    // Realizamos la prueba KS.
    await pruebaKS.probar(generadorVA);
    for (let i: number = 0; i < pruebaKS.getTabla().length; i++) {
      HTMLUtils.agregarFilaATabla(pruebaKS.getTabla()[i], tablaKSDistExponencial);
    }
    if (pruebaKS.validarHipotesis())
      HTMLUtils.alertarExito(alertResKSExponencial);
    else
      HTMLUtils.alertarFracaso(alertResKSExponencial);
    alertResKSExponencial.innerHTML += pruebaKS.getResultado();
  }
});

// Dispara la generación de números aleatorios con distribución Poisson.
btnDistPoisson.addEventListener('click', async () => {
  // Validamos los parámetros.
  if (validarParametrosPoisson()) {
    HTMLUtils.limpiarTabla(tablaDistPoisson);
    HTMLUtils.limpiarTabla(tablaChiDistPoisson);
    limpiarGraficos()
    alertResChiPoisson.innerHTML = 'Resultado: ';

    // Generamos las variables aleatorias con distribución Poisson.
    await generadorVA.generarDistribucionPoisson(n, lambda);
    for (let i: number = 0; i < generadorVA.getTabla().length; i++) {
      let fila: number[] = generadorVA.getTabla()[i];
      let filaNueva: number[] = [];
      // Salteamos las columnas 1 y 2 de la tabla de distribución, ya que tiene la columna "Valor" repetida.
      for (let j: number = 0; j < fila.length; j++) {
        if (j != 1 && j != 2) filaNueva.push(fila[j]);
      }
      HTMLUtils.agregarFilaATabla(filaNueva, tablaDistPoisson);
      // let filaNueva: number[] = [fila[0],fila[3],fila[4],fila[5],fila[6]];
    }
    btnDescargarPoisson.disabled = false;
    graficoDistPoisson = HTMLUtils.generarGrafico(histogramaDistPoisson, generadorVA.getIntervalos(), generadorVA.getFrecuenciasObservadas());

    // Realizamos la prueba Chi-Cuadrado.
    await pruebaChiCuadrado.probar(generadorVA);
    for (let i: number = 0; i < pruebaChiCuadrado.getTabla().length; i++) {
      HTMLUtils.agregarFilaATabla(pruebaChiCuadrado.getTabla()[i], tablaChiDistPoisson);
    }
    if (pruebaChiCuadrado.validarHipotesis())
      HTMLUtils.alertarExito(alertResChiPoisson);
    else
      HTMLUtils.alertarFracaso(alertResChiPoisson);
      alertResChiPoisson.innerHTML += pruebaChiCuadrado.getResultado();
  }
});

// Validamos los parámetros para el caso de que se seleccione la distribución uniforme.
function validarParametrosUniforme(): boolean {
  if (cboCantIntervalos.value == '0') {
    alert('Seleccione la cantidad de intervalos.');
    return false;
  }
  if (cboMetodoGeneracion.value == '0') {
    alert('Seleccione el método de generación de números aleatorios U(0, 1).');
    return false;
  }
  if (txtCantNros.value == '' || txtA.value == '' || txtB.value == '') {
    alert('Tiene que ingresar todos los parámetros solicitados.');
    return false;
  }
  n = Number(txtCantNros.value);
  a = Number(txtA.value);
  b = Number(txtB.value);
  metodo = cboMetodoGeneracion.value;
  cantIntervalos = Number(cboCantIntervalos.value);
  if (n <= 0) {
    alert('La cantidad de números a generar debe ser mayor a cero.');
    return false;
  }
  if (a >= b) {
    alert('El valor de "B" debe ser mayor a "A".');
    return false;
  }
  return true;
}

// Validamos los parámetros para el caso de que se seleccione la distribución normal.
function validarParametrosNormal(): boolean {
  if (cboCantIntervalos.value == '0') {
    alert('Seleccione la cantidad de intervalos.');
    return false;
  }
  if (cboMetodoGeneracion.value == '0') {
    alert('Seleccione el método de generación de números aleatorios U(0, 1).');
    return false;
  }
  if (cboMetodoDistNormal.value == '0') {
    alert('Seleccione el método de generación de variables aleatorias normales.');
    return false;
  }
  if (txtCantNros.value == '' || txtMedia.value == '' || txtDesviacionEstandar.value == '') {
    alert('Tiene que ingresar todos los parámetros solicitados.');
    return false;
  }
  n = Number(txtCantNros.value);
  media = Number(txtMedia.value);
  desviacion = Number(txtDesviacionEstandar.value);
  metodo = cboMetodoGeneracion.value;
  metodoNormal = cboMetodoDistNormal.value;
  cantIntervalos = Number(cboCantIntervalos.value);
  if (n <= 0) {
    alert('La cantidad de números a generar debe ser mayor a cero.');
    return false;
  }
  if (desviacion < 0){
    alert('La desviación estándar no puede ser un valor negativo.');
    return false
  }
  return true;
}

// Validamos los parámetros para el caso de que se seleccione la distribución exponencial.
function validarParametrosExponencial(): boolean {
  if (cboCantIntervalos.value == '0') {
    alert('Seleccione la cantidad de intervalos.');
    return false;
  }
  if (cboMetodoGeneracion.value == '0') {
    alert('Seleccione el método de generación de números aleatorios U(0, 1).');
    return false;
  }
  if (txtCantNros.value == '' || txtLambdaExponencial.value == '') {
    alert('Tiene que ingresar todos los parámetros solicitados.');
    return false;
  }
  n = Number(txtCantNros.value);
  lambda = Number(txtLambdaExponencial.value);
  metodo = cboMetodoGeneracion.value;
  cantIntervalos = Number(cboCantIntervalos.value);
  if (n <= 0) {
    alert('La cantidad de números a generar debe ser mayor a cero.');
    return false;
  }
  if (lambda < 0){
    alert('Lambda no puede ser un valor negativo.');
    return false;
  }
  return true;
}

// Validamos los parámetros para el caso de que se seleccione la distribución Poisson.
function validarParametrosPoisson(): boolean {
  if (txtCantNros.value == '' || txtLambdaPoisson.value == '') {
    alert('Tiene que ingresar todos los parámetros solicitados.');
    return false;
  }
  n = Number(txtCantNros.value);
  lambda = Number(txtLambdaPoisson.value);
  if (n <= 0) {
    alert('La cantidad de números a generar debe ser mayor a cero.');
    return false;
  }
  if (lambda < 0){
    alert('Lambda no puede ser un valor negativo');
    return false;
  }
  return true;
}

// Función que borra los parámetros ingresados por el usuario.
function limpiarParametros(): void {
  txtCantNros.value = '';
  txtA.value = '';
  txtB.value = '';
  txtMedia.value = '';
  txtLambdaExponencial.value = '';
  txtLambdaPoisson.value = '';
  txtDesviacionEstandar.value = '';
  cboCantIntervalos.value = '0';
  cboDistribucion.value = '0';
  cboMetodoGeneracion.value = '0';
}

// Función que borra los gráficos existentes.
function limpiarGraficos(): void {
  if (graficoDistUniforme != null) graficoDistUniforme.destroy();
  if (graficoDistNormal != null) graficoDistNormal.destroy();
  if (graficoDistExponencial != null) graficoDistExponencial.destroy();
  if (graficoDistPoisson != null) graficoDistPoisson.destroy();
}