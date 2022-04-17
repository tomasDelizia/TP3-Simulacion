import { GeneradorDistribucion } from "./GeneradorDistribucion";
import { GeneradorPoisson } from "./GeneradorPoisson";

let generador: GeneradorDistribucion = new GeneradorPoisson();
console.log(generador.constructor.name)