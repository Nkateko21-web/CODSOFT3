document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    const onOffButton = document.getElementById('on-off');
    let currentInput = '0';
    let operator = null;
    let firstOperand = null;
    let awaitingForSecondOPerand = false;
    let calculatorOn = true;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');
            if (value !== 'on-off' && calculatorOn) {
                handleInput(value);
            }
        });
    });

    onOffButton.addEventListener('click', () => {
        calculatorOn = !calculatorOn 
        if (calculatorOn) {
            display.textContent = currentInput;
        }   else {
            display.textContent = '';
        }
    });

    function handleInput(value) {
        if (value === 'C') {
            currentInput = '0';
            firstOperand = null;
            operator = null;
            awaitingForSecondOPerand = false;
        } else if (value === '=') {
            if (operator && firstOperand !== null && !awaitingForSecondOPerand) {
                currentInput = String(calculate(firstOperand, currentInput, operator));
                firstOperand = null;
                operator = null;
                awaitingForSecondOPerand = false;
            }
        } else if (['+', '-', '*','/', '%'].includes(value)) {
            if (firstOperand === null) {
                firstOperand = currentInput;
            } else if (!awaitingForSecondOPerand) {
                currentInput = String(calculate(firstOperand, currentInput, operator));
                firstOperand = currentInput;
            }
            operator = value;
            awaitingForSecondOPerand = true;
        } else {
            if (awaitingForSecondOPerand) {
                currentInput = value;
                awaitingForSecondOPerand = false;
            } else {
                if (currentInput === '0' || currentInput === 'error') {
                    currentInput = value;
                } else {
                    currentInput += value;
                }
            }
        }
        
        updateDisplay();
    }

    function calculate(first, second, operator) {
        const a = parseFloat(first);
        const b = parseFloat(second);

        switch (operator) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/': return a / b;
            case '%': return a % b;
            default: return second;
        }
    }

    function updateDisplay() {
        display.textContent =currentInput;
    }


});