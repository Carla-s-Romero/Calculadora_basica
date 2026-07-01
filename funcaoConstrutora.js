function Calculator() {
    this.display = document.querySelector('.display');
    this.caracteresPermitidos = /^[0-9+\-*/().,\s]*$/;

    this.inicia = () => {
        this.click();
        this.pressionaEnter();
        this.substituirX();
        this.validarTeclado();
    };

    this.substituirX = () => {
        this.display.addEventListener('input', () => {
            const valor = this.display.value.replace(/x/gi, '*');
            const valorSanitizado = valor.replace(/[^0-9+\-*/().,\s]/g, '');
            this.display.value = valorSanitizado;
        });
    };

    this.pressionaEnter = () => {
        this.display.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.realizarContas();
            }
        });
    };

    this.validarEntrada = (entrada) => {
        return this.caracteresPermitidos.test(entrada);
    };

    this.validarTeclado = () => {
        this.display.addEventListener('keydown', (e) => {
            const teclasPermitidas = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter', 'Escape', 'Home', 'End'];

            if (teclasPermitidas.includes(e.key) || e.ctrlKey || e.metaKey) {
                return;
            }

            if (!this.validarEntrada(e.key)) {
                e.preventDefault();
            }
        });

        this.display.addEventListener('paste', (e) => {
            const texto = e.clipboardData?.getData('text') || '';
            const textoSanitizado = texto.replace(/x/gi, '*').replace(/[^0-9+\-*/().,\s]/g, '');

            if (texto !== textoSanitizado) {
                e.preventDefault();
                this.display.value += textoSanitizado;
                this.display.focus();
            }
        });
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
