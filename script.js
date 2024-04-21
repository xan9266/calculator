const display = document.querySelector(".display");
const buttonKeys = document.querySelectorAll('.display-screen');
const buttonCalculate = document.querySelector('.calculate');
const buttonClear = document.querySelector('.clearDisplay');

buttonKeys.forEach(button => {
    button.addEventListener('click', () => appendToDisplay(button.dataset.value));
});

buttonCalculate.addEventListener('click', calculate);
buttonClear.addEventListener('click', clearDisplay);

function appendToDisplay(input) {
    display.value += input;
}

function clearDisplay() {
    display.value = "";
}

function calculate() {
    try {
        const expression = display.value;
        const result = evaluateExpression(expression);
        display.value = result;
    } catch (error) {
        display.value = "Error";
    }
}

function evaluateExpression(expression) {
    const tokens = expression.match(/(\d+(\.\d+)?|\+|\-|\*|\/)/g);
    if (!tokens) throw new Error("Invalid expression");

    const stack = [];
    let currentOperator = null;

    tokens.forEach(token => {
        if (/\d+(\.\d+)?/.test(token)) {
            const number = parseFloat(token);
            if (currentOperator === null) {
                stack.push(number);
            } else {
                const prevNumber = stack.pop();
                switch (currentOperator) {
                    case '+':
                        stack.push(prevNumber + number);
                        break;
                    case '-':
                        stack.push(prevNumber - number);
                        break;
                    case '*':
                        stack.push(prevNumber * number);
                        break;
                    case '/':
                        if (number === 0) throw new Error("Division by zero");
                        stack.push(prevNumber / number);
                        break;
                }
                currentOperator = null;
            }
        } else if (/[\+\-\*\/]/.test(token)) {
            currentOperator = token;
        } else {
            throw new Error("Invalid token: " + token);
        }
    });

    if (stack.length !== 1) throw new Error("Invalid expression");

    return stack[0];
}

