// Imports
import { Chart } from 'chart.js';
import { GeneradorCSV } from './GeneradorCSV';
import { GeneradorDistribucion } from './GeneradorDistribucion';
import { GeneradorExponencial } from './GeneradorExponencial';
import { GeneradorNormal } from './GeneradorNormal';
import { GeneradorPoisson } from './GeneradorPoisson';
import { GeneradorUniforme } from './GeneradorUniforme';
import { PruebaBondad } from './PruebaBondad';
import { PruebaChiCuadrado } from './PruebaChiCuadrado';
import { PruebaKS } from './PruebaKS';
import './style.css';

// Definición de los cuadros de texto de la interfaz de usuario.
const txtCantNros: HTMLInputElement = document.getElementById("txtCantNros") as HTMLInputElement;
const txtA: HTMLInputElement = document.getElementById("txtA") as HTMLInputElement;
const txtB: HTMLInputElement = document.getElementById("txtB") as HTMLInputElement;
const txtMedia: HTMLInputElement = document.getElementById("txtMedia") as HTMLInputElement;
const txtDesviacionEstandar: HTMLInputElement = document.getElementById("txtDesviacionEstandar") as HTMLInputElement;
const txtLambdaExponencial: HTMLInputElement = document.getElementById("txtLambdaExponencial") as HTMLInputElement;
const txtLambdaPoisson: HTMLInputElement = document.getElementById("txtLambdaPoisson") as HTMLInputElement;

// Definición de los combo Box de la interfaz de usuario.
const cboCantIntervalos: HTMLSelectElement = document.getElementById("cboCantIntervalos") as HTMLSelectElement;
const cboMetodoGeneracion: HTMLSelectElement = document.getElementById("cboMetodoGeneracion") as HTMLSelectElement;
const cboDistribucion: HTMLSelectElement = document.getElementById("cboDistribucion") as HTMLSelectElement;

// Definición de botones de la interfaz de usuario.
const btnDistUniforme: HTMLButtonElement = document.getElementById('btnDistUniforme') as HTMLButtonElement;
const btnDistNormal: HTMLButtonElement = document.getElementById('btnDistNormal') as HTMLButtonElement;
const btnDistExponencial: HTMLButtonElement = document.getElementById('btnDistExponencial') as HTMLButtonElement;
const btnDistPoisson: HTMLButtonElement = document.getElementById('btnDistPoisson') as HTMLButtonElement;
const btnDescargarUniforme: HTMLButtonElement = document.getElementById('btnDescargarUniforme') as HTMLButtonElement;

// Definición de las secciones de cada distribución.
const divDistUniforme: HTMLDivElement = document.getElementById('distUniforme') as HTMLDivElement;
const divDistNormal: HTMLDivElement = document.getElementById('distNormal') as HTMLDivElement;
const divDistExponencial: HTMLDivElement = document.getElementById('distExponencial') as HTMLDivElement;
const divDistPoisson: HTMLDivElement = document.getElementById('distPoisson') as HTMLDivElement;

// Definición de las tablas de la interfaz de usuario.
const tablaDistUniforme: HTMLTableElement = document.getElementById('tablaDistUniforme') as HTMLTableElement;
const tablaDistNormal: HTMLTableElement = document.getElementById('tablaDistNormal') as HTMLTableElement;
const tablaDistExponencial: HTMLTableElement = document.getElementById('tablaDistExponencial') as HTMLTableElement;
const tablaDistPoisson: HTMLTableElement = document.getElementById('tablaDistPoisson') as HTMLTableElement;
const tablaChiDistUniforme: HTMLTableElement = document.getElementById('tablaChiDistUniforme') as HTMLTableElement;
const tablaKSDistUniforme: HTMLTableElement = document.getElementById('tablaKSDistUniforme') as HTMLTableElement;


// Definición de los cuadros con los resultados de las hipótesis.
const txtResChiUniforme: HTMLTextAreaElement = document.getElementById('txtResChiUniforme') as HTMLTextAreaElement;
const txtResKSUniforme: HTMLTextAreaElement = document.getElementById('txtResKSUniforme') as HTMLTextAreaElement;

// Definición del generador de archivos CSV.
const generadorCSV: GeneradorCSV = new GeneradorCSV();

// Definición de los parámetros.
let n: number;
let cantIntervalos: number;
let metodo: string;
let a: number;
let b: number;
let media: number;
let desviacion: number;
let lambda: number;

// Definición del generador números de una distribución genérica, la prueba Chi-Cuadrado y la prueba KS.
let generadorDistribucion: GeneradorDistribucion;
const pruebaChiCuadrado: PruebaBondad = new PruebaChiCuadrado();
const pruebaKS: PruebaBondad = new PruebaKS();

// Definición del histograma de frecuencias.
const histogramaDistUniforme: HTMLCanvasElement = document.getElementById('histogramaDistUniforme') as HTMLCanvasElement;
const areaHistDistUniforme = histogramaDistUniforme.getContext('2d');
let graficoDistUniforme: Chart;

// Dispara la generación de un archivo csv 
btnDescargarUniforme.addEventListener('click', generarArchivo);

// Genera un archivo CSV que contiene los números aleatorios generados.
function generarArchivo(): void {
    generadorCSV.generarArchivo(generadorDistribucion.getRnds(), 'Serie');
}

// Ocultamos las secciones hasta que no se seleccione la distribución.
function ocultarSeccion(div: HTMLDivElement): void {
  div.style.display = "none";
}

function mostrarSeccion(div: HTMLDivElement): void {
  div.style.display = "block";
}

ocultarSeccion(divDistUniforme);
ocultarSeccion(divDistNormal);
ocultarSeccion(divDistExponencial);
ocultarSeccion(divDistPoisson);

// Mostramos la sección correspondiente a la distribución elegida.
cboDistribucion.addEventListener('input', () => {
  switch (cboDistribucion.value) {
    case "0":
      ocultarSeccion(divDistUniforme);
      ocultarSeccion(divDistNormal);
      ocultarSeccion(divDistExponencial);
      ocultarSeccion(divDistPoisson);
      cboMetodoGeneracion.disabled = false;
    case "1":
      generadorDistribucion = new GeneradorUniforme();
      mostrarSeccion(divDistUniforme);
      ocultarSeccion(divDistNormal);
      ocultarSeccion(divDistExponencial);
      ocultarSeccion(divDistPoisson);
      cboMetodoGeneracion.disabled = false;
      btnDescargarUniforme.disabled = true;
      break;
    case "2":
      generadorDistribucion = new GeneradorNormal();
      mostrarSeccion(divDistNormal);
      ocultarSeccion(divDistUniforme);
      ocultarSeccion(divDistExponencial);
      ocultarSeccion(divDistPoisson);
      cboMetodoGeneracion.disabled = false;
      break;
    case "3":
      generadorDistribucion = new GeneradorExponencial();
      mostrarSeccion(divDistExponencial);
      ocultarSeccion(divDistNormal);
      ocultarSeccion(divDistUniforme);
      ocultarSeccion(divDistPoisson);
      cboMetodoGeneracion.disabled = false;
      break;
    case "4":
      generadorDistribucion = new GeneradorPoisson();
      mostrarSeccion(divDistPoisson);
      ocultarSeccion(divDistNormal);
      ocultarSeccion(divDistExponencial);
      ocultarSeccion(divDistUniforme);
      cboMetodoGeneracion.disabled = true;
      break;
  }
});

// Dispara la generación de números aleatorios con distribución uniforme (A, B).
btnDistUniforme.addEventListener('click', async () => {
  if (validarParametrosUniforme()) {
    limpiarTabla(tablaDistUniforme);
    await generadorDistribucion.generarDistribucionUniforme(n, metodo, cantIntervalos, a, b);
    for (let i: number = 0; i < generadorDistribucion.getTabla().length; i++) {
      agregarFilaATabla(generadorDistribucion.getTabla()[i], tablaDistUniforme);
    }
    btnDescargarUniforme.disabled = false;
    generarGrafico();

    // Realizamos la prueba Chi-Cuadrado.
    await pruebaChiCuadrado.probar(generadorDistribucion);
    for (let i: number = 0; i < pruebaChiCuadrado.getTabla().length; i++) {
      agregarFilaATabla(pruebaChiCuadrado.getTabla()[i], tablaChiDistUniforme);
    }
    txtResChiUniforme.value = pruebaChiCuadrado.validarHipotesis();

    // Realizamos la prueba KS.
    await pruebaKS.probar(generadorDistribucion);
    for (let i: number = 0; i < pruebaKS.getTabla().length; i++) {
      agregarFilaATabla(pruebaKS.getTabla()[i], tablaKSDistUniforme);
    }
    txtResKSUniforme.value = pruebaKS.validarHipotesis();
  }
});

function validarParametrosUniforme(): boolean {
  if (cboCantIntervalos.value == "0") {
    alert('Ingrese la cantidad de intervalos');
    return false;
  }
  if (cboMetodoGeneracion.value == "0") {
    alert('Ingrese el método de generación de números aletorios');
    return false;
  }
  if (txtCantNros.value == "" || txtA.value == "" || txtB.value == "") {
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
  if (a > b) {
    alert('El valor de "b" debe ser mayor a "a".');
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
  cboCantIntervalos.value = "0";
  cboDistribucion.value = "0";
  cboMetodoGeneracion.value = "0";
}

// Función que elimina todas las filas de la tabla HTML excepto los encabezados.
function limpiarTabla(tabla: HTMLTableElement) {
  for(let i: number = tabla.rows.length; i > 1; i--) {
      tabla.deleteRow(i - 1);
  }
}

// Agregar una fila a una tabla html a partir de un vector pasado por parámetro.
function agregarFilaATabla(fila: any[], tabla: HTMLTableElement) {
  let filaHTML: HTMLTableRowElement = tabla.getElementsByTagName('tbody')[0].insertRow();
  for (let i: number = 0; i < fila.length; i++) {
      let celda = filaHTML.insertCell();
      celda.appendChild(document.createTextNode(String(fila[i])));
  }
}

function generarGrafico(): void {
  limpiarGraficos();
  graficoDistUniforme = new Chart(areaHistDistUniforme, {
      type:'bar',
      data:{
          labels: generadorDistribucion.getIntervalos(),
          datasets:[{
              label: 'Frecuencias observadas',
              data: generadorDistribucion.getFrecuenciasObservadas(),
              backgroundColor: '#F8C471'
          }]
      },
      options:{
          scales:{
              yAxes:{
                  beginAtZero:true
              }
          }
      }
  });
}

function limpiarGraficos(): void {
  if (graficoDistUniforme != null)
    graficoDistUniforme.destroy();
}