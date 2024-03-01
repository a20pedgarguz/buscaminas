import { Casella } from "./Casella.js";
var Tauler = /** @class */ (function () {
    function Tauler(files, columnes) {
        this.caselles = [];
        this.files = files;
        this.columnes = columnes;
        this.inicializarCaselles();
    }
    Tauler.prototype.inicializarCaselles = function () {
        for (var i = 0; i < this.files; i++) {
            this.caselles[i] = [];
            for (var j = 0; j < this.columnes; j++) {
                this.caselles[i][j] = new Casella(Math.random() < 0.3 ? true : false);
            }
        }
    };
    return Tauler;
}());
export { Tauler };
export default Tauler;
