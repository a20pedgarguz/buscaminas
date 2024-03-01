import { Casella } from "./Casella.js";

export class Tauler{
    caselles: Casella[][];
    files: number;
    columnes: number;

    constructor(files: number, columnes: number){
        this.caselles = [];
        this.files = files;
        this.columnes = columnes;

        this.inicializarCaselles();
    }

    inicializarCaselles(){
        for (let i = 0; i < this.files; i++) {
            this.caselles[i] = [];
            for (let j = 0; j < this.columnes; j++) {
                this.caselles[i][j] = new Casella(Math.random() < 0.3 ? true : false);
            }
        }

    }
}
export default Tauler;