// Import stylesheets
import { GeneradorDistribucion } from './GeneradorDistribucion';
import { GeneradorExponencial } from './GeneradorExponencial';
import { GeneradorNormal } from './GeneradorNormal';
import { GeneradorNumeros } from './GeneradorNumeros';
import { GeneradorPoisson } from './GeneradorPoisson';
import { GeneradorUniforme } from './GeneradorUniforme';
import './style.css';

// Definición de los cuadros de texto de la interfaz de usuario.
const txtCantNros: HTMLInputElement = document.getElementById("txtCantNros") as HTMLInputElement;
const txtA: HTMLInputElement = document.getElementById("txtA") as HTMLInputElement;
const txtB: HTMLInputElement = document.getElementById("txtA") as HTMLInputElement;
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

// Definición de las secciones de cada distribución.
const divDistUniforme: HTMLDivElement = document.getElementById('distUniforme') as HTMLDivElement;
const divDistNormal: HTMLDivElement = document.getElementById('distNormal') as HTMLDivElement;
const divDistExponencial: HTMLDivElement = document.getElementById('distExponencial') as HTMLDivElement;
const divDistPoisson: HTMLDivElement = document.getElementById('distPoisson') as 
HTMLDivElement;

// Definición del generador de números pseudoaleatorios U(0, 1).
let generadorNumeros: GeneradorNumeros;

// Definición del generador números de una distribución genérica.
let generadorDistribucion: GeneradorDistribucion;

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
btnDistUniforme.addEventListener('click', () => {
  if (validarParametrosUniforme())
    generadorDistribucion.generarDistribucionUniforme()
});

function validarParametrosUniforme(): boolean {
  if (txtCantNros.value == "" || txtA.value == "" || txtB.value == "") {
    alert('Tiene que ingresar todos los parámetros solicitados.');
    return false;
  }
}