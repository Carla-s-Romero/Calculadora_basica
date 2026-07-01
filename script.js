function calcular() {
    return {
        display: document.querySelector('.display'),

        inicia() {
            this.click()
            this.pressionaEnter();
        },

        pressionaEnter() {
            this.display.addEventListener('keyup', (e) => {
                if (e.keyCode === 13) {
                    this.realizarContas()
                }
            })
        },


        realizarContas() { 
            let conta = this.display.value
            
            try{
                conta = eval(conta);

                if(!conta) {
                    alert('conta invalida')
                    return;
                }

                this.display.value = String(conta)
            } catch {
                alert('conta invalida');
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