import Tauler from './Tauler.js';
export class Joc{
    tauler: Tauler;
    constructor(){
        this.tauler = new Tauler(8,8);
        this.dibuixarTauler();
    }
    dibuixarTauler(){
        const tableElement = document.createElement('table');
        tableElement.style.borderCollapse = 'collapse';
        tableElement.style.margin = 'auto';


        const container = document.createElement('div');
        container.style.display = 'flex';
        container.style.justifyContent = 'center';
        container.style.alignItems = 'center';
        container.style.height = '100vh';

        this.tauler.caselles.forEach((row, rowIndex) => {
            const rowElement = document.createElement('tr');
            row.forEach((cell, cellIndex) => {
                const cellElement = document.createElement('td');
                cellElement.style.border = '1px solid black';
                cellElement.style.width = '40px'; 
                cellElement.style.height = '40px'; 
                cellElement.style.textAlign = 'center';
                cellElement.dataset.row = rowIndex.toString(); 
                cellElement.dataset.cell = cellIndex.toString(); 

                cellElement.style.backgroundImage = "url('src/Clases/img/square.gif')";
                cellElement.style.backgroundSize = 'cover';

                cellElement.addEventListener('click', () => {
                    this.revelarCasella(rowIndex, cellIndex);
                });

                cellElement.addEventListener('contextmenu', (event) => {
                    event.preventDefault();
                    this.marcarCasella(rowIndex, cellIndex);
                    console.log(`Right clicked cell position: (${rowIndex}, ${cellIndex})`);
                });


                rowElement.appendChild(cellElement);
            });
            tableElement.appendChild(rowElement);
        });

        container.appendChild(tableElement);

        document.body.appendChild(container);
    }
    
revelarCasella(fila:number, columna:number) {
    console.log(`Posición de la celda: (${fila}, ${columna})`);
    const casella = this.tauler.caselles[fila][columna];
    const cellElement = document.querySelector(`td[data-row='${fila}'][data-cell='${columna}']`);

    if (!casella.marcada) {
        if (casella.esMina) {
            console.log('Has perdido');
            if (cellElement) {
                cellElement.style.backgroundImage = `url('src/Clases/img/mina.png')`;
                cellElement.style.backgroundSize = 'cover';
                setTimeout(() => {
                    alert('Has perdido');
                    const currentContainer = document.querySelector('div');
                    if (currentContainer) {
                        document.body.removeChild(currentContainer);
                    }

                    this.tauler = new Tauler(8, 8);
                    this.dibuixarTauler();
                }, 1);
                this.tauler.caselles[fila][columna].revelada = true;

            }
        } else {
            console.log('No es una mina');
            let minesAround = 0;
            this.tauler.caselles[fila][columna].revelada = true;
            for (let i = Math.max(fila - 1, 0); i <= Math.min(fila + 1, this.tauler.caselles.length - 1); i++) {
                for (let j = Math.max(columna - 1, 0); j <= Math.min(columna + 1, this.tauler.caselles[0].length - 1); j++) {
                    if (this.tauler.caselles[i][j].esMina) {
                        minesAround++;
                    }
                }
            }

            console.log(`Number of mines around: ${minesAround}`);
            if (minesAround === 0) {
                if (cellElement) {
                    cellElement.style.backgroundImage = `url('src/Clases/img/Minesweeper_${minesAround}.gif')`;
                    cellElement.style.backgroundSize = 'cover';
                }
                // Si no hay minas alrededor, revelar las celdas adyacentes recursivamente
                for (let i = Math.max(fila - 1, 0); i <= Math.min(fila + 1, this.tauler.caselles.length - 1); i++) {
                    for (let j = Math.max(columna - 1, 0); j <= Math.min(columna + 1, this.tauler.caselles[0].length - 1); j++) {
                        if (!this.tauler.caselles[i][j].revelada) {
                            this.revelarCasella(i, j); // Llamada recursiva para revelar celdas adyacentes
                        }
                    }
                }
            } else {
                // Si hay minas alrededor, mostrar el número de minas
                if (cellElement) {
                    cellElement.style.backgroundImage = `url('src/Clases/img/Minesweeper_${minesAround}.gif')`;
                    cellElement.style.backgroundSize = 'cover';
                }
            }
        }
    }
}
    marcarCasella(fila:number, columna:number){
        console.log(`Posición de la celda: (${fila}, ${columna})`);
        const casella = this.tauler.caselles[fila][columna];
        const cellElement = document.querySelector(`td[data-row='${fila}'][data-cell='${columna}']`);
        if(casella.revelada){
            console.log('No es posible marcar una casilla revelada');
        } else
        if(casella.marcada){
            console.log('Desmarcar celda');
            casella.marcada = false;
            if (cellElement) {
                cellElement.style.backgroundImage = "url('src/Clases/img/square.gif')";
                cellElement.style.backgroundSize = 'cover';
            }
        } else{
            console.log('Marcar celda');
            casella.marcada = true;
            if (cellElement) {
                cellElement.style.backgroundImage = `url('src/Clases/img/flag.png')`;
                cellElement.style.backgroundSize = 'cover';
            }
        }
    }
}
