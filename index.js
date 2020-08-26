let memoryButtons = document.querySelectorAll('button.memoryButton');
let numberButtons = document.querySelectorAll('button.numberButton');
let operationButtons = document.querySelectorAll('button.operationButton');

let calculatorDisplay = document.getElementById('calculatorDisplay');
calculatorDisplay.value = 0;

let number1 = 0;
let number2 = 0;
let answer = 0;
let operation;
let operationDirty = true;

for (i = 0; i < memoryButtons.length; i++) {
    memoryButtons[i].addEventListener('click', function(e) { handleMemory(e); })
}

for (i = 0; i < numberButtons.length; i++) {
    numberButtons[i].addEventListener('click', function(e) { handleNumbers(e); })

}
for (i = 0; i < operationButtons.length; i++) {
    operationButtons[i].addEventListener('click', function(e) { handleOperations(e); })
}

function handleMemory(e) {
    console.log(e.target.innerText);
}

function handleNumbers(e) {
    console.log(e.target.innerText);
    if (e.target.innerText === 'C') {
        clearCalculator();
    } else {
        if (operationDirty) {
            calculatorDisplay.value = '';
            operationDirty = false;
        }
        calculatorDisplay.value += e.target.innerText;
    }
}

function handleOperations(e) {
    console.log(e.target.innerText);

    if (!number1) {
        number1 = parseFloat(calculatorDisplay.value);
    } else {
        number2 = parseFloat(calculatorDisplay.value);
    }

    console.log('number1 : ' + number1);
    console.log('number2 : ' + number2);

    calculatorMath();
    if (e.target.innerText !== operation) {
        console.log('initialize operation');
        operation = e.target.innerText;
    }

    operationDirty = true;
}

function calculatorMath() {
    if (operation === '+') {
        number1 = number1 + number2;
        calculatorDisplay.value = number1;
        console.log('Addition');
    } else if (operation === '-') {
        number1 = number1 - number2;
        calculatorDisplay.value = number1;
        console.log('Subtraction');
    } else if (operation === '*') {
        number1 = number1 * number2;
        calculatorDisplay.value = number1;
        console.log('Multiplication');
    } else if (operation === '/') {
        number1 = number1 / number2;
        calculatorDisplay.value = number1;
        console.log('Division');
    }
    else {
        calculatorDisplay.value = number1;
        number2 = 0;
        console.log('Youre just clicking equals bruh');
    }
}

function clearCalculator() {
    number1 = 0;
    number2 = 0;
    calculatorDisplay.value = 0;
    operationDirty = true;
}
