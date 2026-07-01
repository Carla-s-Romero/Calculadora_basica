function Calculator() {
    this.display = document.querySelector('.display');
    this.caracteresPermitidos = /^[0-9+\-*/().,\s]*$/;

    this.inicia = () => {
        this.click();
        this.pressionaEnter();
        this.substituirX();
    };

    this.substituirX = () => {
        this.display.addEventListener('input', () => {
            this.display.value = this.display.value.replace(/x/gi, '*');
        });
    };

    this.pressionaEnter = () => {
        this.display.addEventListener('keyup', (e) => {
            if (e.keyCode === 13) {
                this.realizarContas();
            }
        });
    };

    this.validarEntrada = (entrada) => {
        return this.caracteresPermitidos.test(entrada);
    };

    this.realizarContas = () => {
        let conta = this.display.value.trim();

        try {
            conta = conta.replace(/X/g, '*');
            const resultado = eval(conta);

            if (resultado === null || resultado === undefined) {
                alert('Expressão inválida');
                return;
            }

            this.display.value = String(resultado);
        } catch {
            alert('Expressão matemática inválida');
        }
    };

    this.clearDisplay = () => {
        this.display.value = '';
    };

    this.deleteOne = () => {
        const novoValor = this.display.value.slice(0, -1);
        this.display.value = novoValor;
    };

    this.click = () => {
        document.addEventListener('click', (e) => {
            const el = e.target;

            if (el.classList.contains('btn-clear')) {
                this.clearDisplay();
            } else if (el.classList.contains('btn-del')) {
                this.deleteOne();
            } else if (el.classList.contains('btn-eq')) {
                this.realizarContas();
            } else if (el.classList.contains('btn')) {
                this.addNumberDisplay(el);
            }
        });
    };

    this.addNumberDisplay = (el) => {
        this.display.value += el.innerText;
        this.display.focus();
    };
}

const calculadora = new Calculator();
calculadora.inicia();
