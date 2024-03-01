export class Casella{
    esMina: boolean;
    revelada: boolean;
    marcada: boolean;

    //Recibim un boolean que ens diu si la casella és una mina o no
    constructor(esMina: boolean) {
        this.esMina = esMina;
        this.revelada = false;
        this.marcada = false;
    }
}

export default Casella;

