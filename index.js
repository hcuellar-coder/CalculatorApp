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
let equalDirty = false;


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
        equalDirty = false;
    } else if (equalDirty) {
        console.log('Reset After Equals')
        clearCalculator();
        calculatorDisplay.value = e.target.innerText;
        equalDirty = false;
        operationDirty = false;
    } else {
        if (operationDirty) {
            calculatorDisplay.value = '';
            operationDirty = false;
        }
        calculatorDisplay.value += e.target.innerText;
    }
}

function handleOperations(e) {
    let newOperation = e.target.innerText;
    console.log('operation is ' + operation);
    console.log('newOperation is ' + newOperation);
    console.log('equal dirty = ' + equalDirty);
    console.log('operation dirty = ' + operationDirty);

    //Work on Zeros!

    console.log('Before Check');
    console.log('number1 : ' + number1);
    console.log('number2 : ' + number2);
    console.log('answer : ' + answer);

    if (!equalDirty && !operationDirty) {
        if (!number1 && !answer) {
            number1 = parseFloat(calculatorDisplay.value);
        } else if (!number1 && answer) {
            number1 = answer;
            number2 = parseFloat(calculatorDisplay.value);
            calculatorMath();
        } else {
            console.log('setting number 2');
            number2 = parseFloat(calculatorDisplay.value);
            calculatorMath();
        }
    }

    if (newOperation !== operation && newOperation !== '=') {
        console.log('initialize operation');
        operation = newOperation;
        equalDirty = false;
    } else if (newOperation === '=') {
        operation = newOperation;
        equalDirty = true;
    }
    operationDirty = true;
}

function calculatorMath() {

    console.log('Before Math');
    console.log('number1 : ' + number1);
    console.log('number2 : ' + number2);
    console.log('answer : ' + answer);

    if (operation === '+') {
        answer = number1 + number2;
        number1 = 0;
        number2 = 0;
        calculatorDisplay.value = answer;
        console.log('Addition');
    } else if (operation === '-') {
        answer = number1 - number2;
        number1 = 0;
        number2 = 0;
        calculatorDisplay.value = answer;
        console.log('Subtraction');
    } else if (operation === '*') {
        answer = number1 * number2;
        number1 = 0;
        number2 = 0;
        calculatorDisplay.value = answer;
        console.log('Multiplication');
    } else if (operation === '/') {
        answer = number1 / number2;
        number1 = 0;
        number2 = 0;
        calculatorDisplay.value = answer;
        console.log('Division');
    }

    console.log('After Math!');
    console.log('number1 : ' + number1);
    console.log('number2 : ' + number2);
    console.log('answer : ' + answer);
}

function clearCalculator() {
    number1 = 0;
    number2 = 0;
    answer = 0;
    calculatorDisplay.value = 0;
}
