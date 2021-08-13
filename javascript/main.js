const BUTTONS = {
    NUMBERS: document.getElementsByClassName('number'),
    CLEAR: document.getElementById('clear'),
    EQUALS: document.getElementById('equals'),
    DECIMAL: document.getElementById('decimal'),
    DELETE: document.getElementById('delete'),
    OPERATORS: document.getElementsByClassName('operator')
}

const DISPLAYS = {
    MAIN: document.getElementById('display-main'),
    SIDE: document.getElementById('display-side')
}

function Equation() {
    this.expression = "";
    this.operators = [];
    this.numbers = [];
    this.numberLast = "0";
}

let equationCurrent = new Equation();
let equationPrevious = new Equation();

const OPERATOR_SIGNS = [' + ', ' - ', ' x ', ' / ']
const ERROR_MESSAGE = "ERROR";

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

function operate (operator, a, b) {
    switch (operator) {
        case "+":
            return add(a , b);
            break;
        case "-":
            return subtract(a , b);
            break;
        case "x":
            return multiply(a , b);
            break;
        case "/":
            return divide(a , b);
            break;
    }
}

for (let i = 0 ; i < BUTTONS.NUMBERS.length; i++) {
    let numberInput = BUTTONS.NUMBERS[i].textContent;
    BUTTONS.NUMBERS[i].addEventListener('click', function() {
        if (equationCurrent.numberLast === "0" && (["", "0", ERROR_MESSAGE].includes(DISPLAYS.MAIN.textContent))) {
        // === "" || DISPLAYS.MAIN.textContent === "0" ||)) 
            equationCurrent.numberLast = numberInput;
            DISPLAYS.MAIN.textContent = numberInput;
        }
        else {
            equationCurrent.numberLast += numberInput;
            DISPLAYS.MAIN.textContent += numberInput;
        }
    });
}

for (let i = 0 ; i < BUTTONS.OPERATORS.length; i++) {
    let operatorInput = BUTTONS.OPERATORS[i].textContent;
    BUTTONS.OPERATORS[i].addEventListener('click', function() {
        if (!OPERATOR_SIGNS.includes(DISPLAYS.MAIN.textContent.slice(-3))) {
            if (equationCurrent.numberLast === "0" && (["", "0", ERROR_MESSAGE].includes(DISPLAYS.MAIN.textContent))) {
            // === "" || DISPLAYS.MAIN.textContent === "0" ||)) 
                equationCurrent.operators.push(operatorInput);
                equationCurrent.numbers.push("0");
                DISPLAYS.MAIN.textContent = "0 " + operatorInput + " ";
            }
            else {
                DISPLAYS.MAIN.textContent += " " + operatorInput + " ";
                equationCurrent.operators.push(operatorInput);
                equationCurrent.numbers.push(equationCurrent.numberLast);
            }
            equationCurrent.numberLast = "0";
        }
    });
}

BUTTONS.CLEAR.addEventListener('click', function() { 
    clearAll();
});

BUTTONS.DECIMAL.addEventListener('click', function() {
    if (!equationCurrent.numberLast.includes(".")) {
        if (DISPLAYS.MAIN.textContent[-1] === " ") {
            DISPLAYS.MAIN.textContent += "0.";
        }
        else {
            DISPLAYS.MAIN.textContent += ".";
        }
        equationCurrent.numberLast += ".";
    }
});

BUTTONS.DELETE.addEventListener('click', function() {
    console.log("before: " + DISPLAYS.MAIN.textContent);
    console.log("numberLast #: " + equationCurrent.numberLast);
    console.log("nums: " + equationCurrent.numbers);
    console.log("operators: " + equationCurrent.operators);
    console.log("-------------------");

    if (!OPERATOR_SIGNS.includes(DISPLAYS.MAIN.textContent.slice(-3))) {
        DISPLAYS.MAIN.textContent = DISPLAYS.MAIN.textContent.slice(0, -1);
        if (DISPLAYS.MAIN.textContent === '') {
            DISPLAYS.MAIN.textContent = '0';
        }
        equationCurrent.numberLast = String(equationCurrent.numberLast).slice(0, -1);
        if (equationCurrent.numberLast === '') {
            equationCurrent.numberLast = '0';
        }
    }
    //if deleting an operation
    else {
        DISPLAYS.MAIN.textContent = DISPLAYS.MAIN.textContent.slice(0,-3);
        equationCurrent.operators.pop();
        equationCurrent.numberLast = equationCurrent.numbers.pop();
    }

    console.log("after: " + DISPLAYS.MAIN.textContent);
    console.log("numberLast #: " + equationCurrent.numberLast);
    console.log("nums: " + equationCurrent.numbers);
    console.log("operators: " + equationCurrent.operators);
    console.log("          ");

});

BUTTONS.EQUALS.addEventListener('click', function() {
    if (equationCurrent.numbers.length === 0 &&  equationCurrent.operators.length === 0) {
        return;
    }

    if (equationCurrent.numberLast !== "0") {
        equationCurrent.numbers.push(equationCurrent.numberLast);
        equationCurrent.numberLast = '0';
    }
    if (equationCurrent.numbers.length === equationCurrent.operators.length) {
        equationCurrent.operators.pop();
    }

    let latestAnswer = parseFloat(equationCurrent.numbers[0]);

    for (let i = 0 ; i < equationCurrent.operators.length; i++) {
        switch(equationCurrent.operators[i]) {
            case '+':
                latestAnswer += parseFloat(equationCurrent.numbers[i + 1]);
                break;
            case '-':
                latestAnswer -= parseFloat(equationCurrent.numbers[i + 1]);
                break;
            case 'x':
                latestAnswer *= parseFloat(equationCurrent.numbers[i + 1]);
                break;
            case '/':
                if (parseFloat(equationCurrent.numbers[i + 1]) === 0) {
                    console.log(ERROR_MESSAGE);
                    clearAll();
                    DISPLAYS.MAIN.textContent = ERROR_MESSAGE;
                }
                else {
                    latestAnswer /= parseFloat(equationCurrent.numbers[i + 1]);
                }
                
                break;
        }

        if (DISPLAYS.MAIN.textContent.textContent === ERROR_MESSAGE) {
            break;
        }
    }

    // isNew = true;
    if (DISPLAYS.MAIN.textContent === ERROR_MESSAGE) {
        return;
    }

    latestAnswer = Math.round(latestAnswer * 100) / 100; //round to two decimals
    console.log(latestAnswer);

    equationCurrent.expression = DISPLAYS.MAIN.textContent;
    DISPLAYS.MAIN.textContent = latestAnswer;
    DISPLAYS.SIDE.textContent = equationCurrent.expression;

    equationPrevious = equationCurrent;
    equationCurrent = new Equation();
    equationCurrent.numberLast = latestAnswer;
});

function clearAll() {
    equationCurrent = new Equation();
    equationPrevious = new Equation();
    DISPLAYS.MAIN.textContent = "0";
    DISPLAYS.SIDE.textContent = "";
}

console.log(equationCurrent);
console.log(DISPLAYS.MAIN.textContent);
