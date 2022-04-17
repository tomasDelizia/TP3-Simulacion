import { GeneradorDistribucion } from "./GeneradorDistribucion";
import { GeneradorPoisson } from "./GeneradorPoisson";

let generador: GeneradorDistribucion = new GeneradorPoisson();
console.log(generador.constructor.name)

// Import stylesheets
import './style.css';


// Definición de los cuadros de texto de la interfaz de usuario.

const txtCantNros: HTMLInputElement = document.getElementById("txtCantNros") as HTMLInputElement;

const txtA: HTMLInputElement = document.getElementById("txtA") as HTMLInputElement;
const txtB: HTMLInputElement = document.getElementById("txtA") as HTMLInputElement;
const txtMedia: HTMLInputElement = document.getElementById("txtMedia") as HTMLInputElement;
const txtDesviacionEstandar: HTMLInputElement = document.getElementById("txtDesviacionEstandar") as HTMLInputElement;
const txtLambda: HTMLInputElement = document.getElementById("txtLambda") as HTMLInputElement;
const txtLambdaPoisson: HTMLInputElement = document.getElementById("txtLambdaPoisson") as HTMLInputElement;
const txtCantidadEventos: HTMLInputElement = document.getElementById("txtCantidadEventosPoisson") as HTMLInputElement;

// Definición de los combo Box de la interfaz de usuario.

const cboCantIntervalos: HTMLSelectElement = document.getElementById("cboCantIntervalos") as HTMLSelectElement;
const cboMetodoDistribucion: HTMLSelectElement = document.getElementById("cboMetodoDistribucion") as HTMLSelectElement;
const cboDistribucion: HTMLSelectElement = document.getElementById("cboDistribucion") as HTMLSelectElement;

// Definición de botones de la interfaz de usuario.

const btnDistUniforme: HTMLButtonElement = document.getElementById('btnDistUniforme') as HTMLButtonElement;
const btnDistNormal: HTMLButtonElement = document.getElementById('btnDistNormal') as HTMLButtonElement;
const btnDistExponencial: HTMLButtonElement = document.getElementById('btnDistExponencial') as HTMLButtonElement;
const btnDistPoisson: HTMLButtonElement = document.getElementById('btnDistPoisson') as HTMLButtonElement;