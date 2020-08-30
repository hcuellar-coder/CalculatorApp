let memoryButtons = document.querySelectorAll('button.memoryButton');
let numberButtons = document.querySelectorAll('button.numberButton');
let operationButtons = document.querySelectorAll('button.operationButton');
let calculatorDisplay = document.getElementById('calculatorDisplay');

setListeners();

let number1 = null;
let number2 = null;
let answer = null;
let memStorage = 0;

let operation;
let init = true;
let divByZero = false;
let operationDirty = false;
let equalDirty = false;

if (window.localStorage.getItem('calculatorMem')) {
    memStorage = parseFloat(window.localStorage.getItem('calculatorMem'));
}

function setListeners() {
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
    let memKey = e.target.innerText;
    if (memKey === 'MR') {
        calculatorDisplay.value = memStorage;
        init = true;
        operationDirty = false;
        if (equalDirty) {
            equalDirty = false;
            answer = null;
        }
    } else if (memKey === 'M+') {
        memStorage += parseFloat(calculatorDisplay.value);
        window.localStorage.setItem('calculatorMem', memStorage);
    } else {
        memStorage -= parseFloat(calculatorDisplay.value);
        window.localStorage.setItem('calculatorMem', memStorage);
    }
}

function handleNumbers(e) {
    let numberInput = e.target.innerText;

    if (numberInput === 'C') {
        clearCalculator();
        if (divByZero) {
            divByZero = false;
            setDisable(false);
        }
        equalDirty = false;
    } else if (equalDirty) {
        clearCalculator();
        calculatorDisplay.value = numberInput;
        init = false;
    } else {
        if (operationDirty || init) {
            calculatorDisplay.value = '';
            operationDirty = false;
            init = false;
        }
        calculatorDisplay.value += numberInput;
    }
}

function handleOperations(e) {
    let newOperation = e.target.innerText;

    console.log('equalDirty =' + equalDirty);
    console.log('operationDirty =' + operationDirty);
    console.log('init =' + init);
    console.log('number1 =' + number1);
    console.log('number2 =' + number2);
    console.log('answer =' + answer);


    if (!equalDirty && !operationDirty) {
        if (number1 === null && answer === null) {
            number1 = parseFloat(calculatorDisplay.value);
        } else if (number1 === null && answer) {
            number1 = answer;
            number2 = parseFloat(calculatorDisplay.value);
            calculatorMath();
        } else {
            number2 = parseFloat(calculatorDisplay.value);
            calculatorMath();
        }
    }

    if (newOperation !== operation && newOperation !== '=') {
        operation = newOperation;
        equalDirty = false;
    } else if (newOperation === '=') {
        operation = newOperation;
        equalDirty = true;
    }

    operationDirty = true;
}

function calculatorMath() {
    if (operation === '+') {
        answer = number1 + number2;
        number1 = null;
        number2 = null;
        calculatorDisplay.value = answer;
    } else if (operation === '-') {
        answer = number1 - number2;
        number1 = null;
        number2 = null;
        calculatorDisplay.value = answer;
    } else if (operation === '*') {
        answer = number1 * number2;
        number1 = null;
        number2 = null;
        calculatorDisplay.value = answer;
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

function setDisable(bool) {
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