let operation;
let newNumberInput = true;
let dividingByZero = false;
let operationClicked = false;
let equalClicked = false;

let calculatorDisplay = document.getElementById('calculator-display');

document.querySelectorAll('button.memory-button').forEach(item => {
    item.addEventListener('click', e => { handleMemoryButtons(e.target.innerText); });
});

document.querySelectorAll('button.number-button').forEach(item => {
    item.addEventListener('click', e => { handleNumberButtons(e.target.innerText); });
});

document.querySelectorAll('button.operation-button').forEach(item => {
    item.addEventListener('click', e => { handleOperations(e.target.innerText); });
});

document.querySelector('button.clear-button').addEventListener('click', handleClearButton);

function handleMemoryButtons(e) {
    let memoryButton = e;
    let memoryRecall = parseFloat(window.localStorage.getItem('memoryRecall')) || 0;

    if (memoryButton === 'MR') {
        calculatorDisplay.value = memoryRecall;
        newNumberInput = true;
        operationClicked = false;
        if (equalClicked) {
            equalClicked = false;
            answer = null;
        }
    } else if (memoryButton === 'M+') {
        memoryRecall += parseFloat(calculatorDisplay.value);
    } else {
        memoryRecall -= parseFloat(calculatorDisplay.value);
    }
    window.localStorage.setItem('memoryRecall', memoryRecall);
}

function handleNumberButtons(e) {
    let numberButton = e;

    if (calculatorDisplay.value.includes('.')
        && numberButton.includes('.')
        && !operationClicked) {

    } else if (equalClicked) {
        resetGlobalVariables();
        calculatorDisplay.value = numberButton;
        newNumberInput = false;
    } else {
        if (operationClicked || newNumberInput) {
            calculatorDisplay.value = '';
            operationClicked = false;
            newNumberInput = false;
        }
        calculatorDisplay.value += numberButton;
    }
}

function handleClearButton() {
    resetGlobalVariables();
    if (dividingByZero) {
        dividingByZero = false;
        disableButtons(false);
    }
}

let number1 = null;
let number2 = null;
let answer = null;

function handleOperations(e) {
    let operationButton = e;

    if (!equalClicked && !operationClicked) {
        if (number1 === null && answer === null) {
            number1 = parseFloat(calculatorDisplay.value);
        } else if (number1 === null && answer) {
            number1 = answer;
            number2 = parseFloat(calculatorDisplay.value);
            calculatorDisplay.value = (Math.round(calculateAnswer() * 1000) / 1000);
        } else {
            number2 = parseFloat(calculatorDisplay.value);
            calculatorDisplay.value = (Math.round(calculateAnswer() * 1000) / 1000);
        }
    }

    operation = operationButton;
    equalClicked = (operationButton === '=') ? true : false;
    operationClicked = true;
}

function calculateAnswer() {
    if (operation === '+') {
        answer = number1 + number2;
    } else if (operation === '-') {
        answer = number1 - number2;
    } else if (operation === '*') {
        answer = number1 * number2;
    } else if (operation === '/') {
        if (number2 === 0) {
            dividingByZero = true;
            disableButtons(true);
        } else {
            answer = number1 / number2;
        }
    }

    number1 = null;
    number2 = null;
    return dividingByZero ? 'Cannot divide by zero' : answer;
}

function resetGlobalVariables() {
    number1 = null;
    number2 = null;
    answer = null;
    newNumberInput = true;
    operationClicked = false;
    equalClicked = false;
    calculatorDisplay.value = 0;
}

function disableButtons(bool) {
    document.querySelectorAll('button.memory-button').forEach(item => {
        item.disabled = bool;
    });
    document.querySelectorAll('button.number-button').forEach(item => {
        item.disabled = bool;
    });
    document.querySelectorAll('button.operation-button').forEach(item => {
        item.disabled = bool;
    });
}