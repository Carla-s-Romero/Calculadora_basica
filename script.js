function calcular() {
    return {
        display: document.querySelector('.display'),
        caracteresPermitidos: /^[0-9+\-*/().,\s]*$/,

        inicia() {
            this.click()
            this.pressionaEnter();
            this.substituirX();
        },

        substituirX() {
            this.display.addEventListener('input', (e) => {
                this.display.value = this.display.value.replace(/x/gi, '*');
            })
        },

        pressionaEnter() {
            this.display.addEventListener('keyup', (e) => {
                if (e.keyCode === 13) {
                    this.realizarContas()
                }
            })
        },

        validarEntrada(entrada) {
            return this.caracteresPermitidos.test(entrada);
        },

        realizarContas() { 
            let conta = this.display.value.trim();
            
            try{
                conta = conta.replace(/X/g, '*');
                const resultado = eval(conta);

                if (resultado === null || resultado === undefined) {
                    alert('Expressão inválida');
                    return;
                }

                this.display.value = String(resultado)
            } catch {
                alert('Expressão matemática inválida');
                return;
            }
        },


        clearDisplay() {
            this.display.value = "";
        },

        deleteOne() {
            const novoValor = this.display.value.slice(0, -1);
            this.display.value = novoValor;
        },

        click() {
                document.addEventListener('click', (e) => {
                const el = e.target;

                if (el.classList.contains('btn-clear')) {
                    this.clearDisplay();
                } else if (el.classList.contains('btn-del')) {
                    this.deleteOne();
                } else if (el.classList.contains('btn-eq')) {
                    this.realizarContas();
                } else if (el.classList.contains('btn')) {
                    this.btnParaDisplay(el.innerText);
                }
            })
        },

        btnParaDisplay(valor) {
            this.display.value += valor;
        }
    };
}

const calculadora = calcular();
calculadora.inicia();