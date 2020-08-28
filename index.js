setListeners();
let calculatorDisplay = document.getElementById('calculatorDisplay');

let number1 = null;
let number2 = null;
let answer = null;
let memStorage = 0;

let operation;
let init = true;
let divByZero = false;
let operationDirty = false;
let equalDirty = false;

function setListeners() {
    let memoryButtons = document.querySelectorAll('button.memoryButton');
    let numberButtons = document.querySelectorAll('button.numberButton');
    let operationButtons = document.querySelectorAll('button.operationButton');

    for (i = 0; i < memoryButtons.length; i++) {
        memoryButtons[i].addEventListener('click', function(e) { handleMemory(e); })
    }

    for (i = 0; i < numberButtons.length; i++) {
        numberButtons[i].addEventListener('click', function(e) { handleNumbers(e); })

    }
    for (i = 0; i < operationButtons.length; i++) {
        operationButtons[i].addEventListener('click', function(e) { handleOperations(e); })
    }
}


function handleMemory(e) {
    console.log(e.target.innerText);
    let memKey = e.target.innerText;
    if (memKey === 'MR') {
        calculatorDisplay.value = memStorage;
        init = true;
    } else if (memKey === 'M+') {
        memStorage += parseFloat(calculatorDisplay.value);
    } else {
        memStorage -= parseFloat(calculatorDisplay.value);
    }
}

function handleNumbers(e) {
    console.log(e.target.innerText);
    console.log('initial = ' + init);
    console.log('divByZero = ' + divByZero);
    console.log('equal dirty = ' + equalDirty);
    console.log('operation dirty = ' + operationDirty);

    if (e.target.innerText === 'C') {
        clearCalculator();
        if (divByZero) {
            divByZero = false;
            setDisable(false);
        }
        equalDirty = false;
    } else if (equalDirty) {
        clearCalculator();
        calculatorDisplay.value = e.target.innerText;
        init = false;
    } else {
        if (operationDirty || init) {
            calculatorDisplay.value = '';
            operationDirty = false;
            init = false;
        }
        calculatorDisplay.value += e.target.innerText;
    }
}

function clearCalculator() {
    number1 = null;
    number2 = null;
    answer = null;
    init = true;
    operationDirty = false;
    equalDirty = false;
    calculatorDisplay.value = 0;
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
        console.log('INSIDE!!');
        if (number1 === null && answer === null) {
            number1 = parseFloat(calculatorDisplay.value);
        } else if (number1 === null && answer) {
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
        number1 = null;
        number2 = null;
        calculatorDisplay.value = answer;
        console.log('Addition');
    } else if (operation === '-') {
        answer = number1 - number2;
        number1 = null;
        number2 = null;
        calculatorDisplay.value = answer;
        console.log('Subtraction');
    } else if (operation === '*') {
        answer = number1 * number2;
        number1 = null;
        number2 = null;
        calculatorDisplay.value = answer;
        console.log('Multiplication');
    } else if (operation === '/') {
        if (number2 === 0) {
            divByZero = true;
            setDisable(true);
            calculatorDisplay.value = 'Cannot divide by zero';
        } else {
            answer = number1 / number2;
            number1 = null;
            number2 = null;
            calculatorDisplay.value = answer;
        }
        console.log('Division');
    }

    console.log('After Math!');
    console.log('number1 : ' + number1);
    console.log('number2 : ' + number2);
    console.log('answer : ' + answer);
}

function setDisable(bool) {
    let memoryButtons = document.querySelectorAll('button.memoryButton');
    let numberButtons = document.querySelectorAll('button.numberButton');
    let operationButtons = document.querySelectorAll('button.operationButton');

    for (i = 0; i < memoryButtons.length; i++) {
        memoryButtons[i].disabled = bool;
    }
    for (i = 0; i < numberButtons.length; i++) {
        if (numberButtons[i].innerText !== 'C') {
            numberButtons[i].disabled = bool;
        }
    }
    for (i = 0; i < operationButtons.length; i++) {
        operationButtons[i].disabled = bool;
    }
}