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

let buttons = document.getElementsByClassName('number');
let screen = document.getElementById('screen');

for (var i = 0 ; i < buttons.length; i++) {
    let a = buttons[i].textContent;
    buttons[i].addEventListener('click' , function () {
        screen.textContent = screen.textContent === "0" ? a : screen.textContent + a; 
    }); 
}

let buttonClear = document.getElementById('clear');
let buttonEquals = document.getElementById('equals');
let buttonOperators = document.getElementsByClassName('operator');

buttonClear.addEventListener('click', function() {
    screen.textContent = "0";
});

for (var i = 0 ; i < buttonOperators.length; i++) {
    let a = buttonOperators[i].textContent;
    buttonOperators[i].addEventListener('click' , function () {
        const operators = [' + ', ' - ', ' x ', ' / '];
        let temp = screen.textContent;
        let lastChars = temp.slice(-3);
        console.log(lastChars);
        console.log(operators);
        screen.textContent = (temp === "0" || operators.includes(lastChars)) ? screen.textContent : screen.textContent + " " + a + " "; 
    }); 
}

// for (let button in buttons) {
//     button.addEventListener('click', () => {
//         console.log(screen.textContent);
//     });
// }