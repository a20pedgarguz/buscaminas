var Casella = /** @class */ (function () {
    //Recibim un boolean que ens diu si la casella és una mina o no
    function Casella(esMina) {
        this.esMina = esMina;
        this.revelada = false;
        this.marcada = false;
    }
    return Casella;
}());
export { Casella };
export default Casella;
