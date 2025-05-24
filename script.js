const display = document.getElementById("display");

let displayValue = "0";
let firstOperand = null;
let secondOperand = null;
let currentOperator = null;
let shouldResetDisplay = false;

display.textContent = displayValue;

const buttons = document.querySelectorAll("button");
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        if (value >= "0" && value <= "9") {
            handleDigit(value);
        } else if (["+", "-", "x", "/"].includes(value)) {
            handleOperator(value);
        } else if (value === "=") {
            handleEquals();
        } else if (value === "C") {
            resetCalculator();
        } else if (value === "⌫") {
            handleBackspace();
        } else if (value === ".") {
            handleDecimal();
        }

        updateDisplay();
    });
});

function updateDisplay() {
    display.textContent = displayValue.length > 12
        ? parseFloat(displayValue).toFixed(6)
        : displayValue;
}

function handleDigit(digit) {
    if (displayValue === "0" || shouldResetDisplay) {
        displayValue = digit;
        shouldResetDisplay = false;
    } else {
        displayValue += digit;
    }
}

function handleDecimal() {
    // Prevent multiple decimals
    if (shouldResetDisplay) {
        displayValue = "0.";
        shouldResetDisplay = false;
        return;
    }

    if (!displayValue.includes(".")) {
        displayValue += ".";
    }
}

function handleOperator(operator) {
    if (currentOperator && shouldResetDisplay) {
        currentOperator = operator === "x" ? "*" : operator;
        return;
    }

    if (currentOperator !== null) {
        handleEquals();
    }

    firstOperand = parseFloat(displayValue);
    currentOperator = operator === "x" ? "*" : operator;
    shouldResetDisplay = true;
}

function handleEquals() {
    if (currentOperator === null || shouldResetDisplay) return;

    secondOperand = parseFloat(displayValue);
    if (currentOperator === "/" && secondOperand === 0) {
        displayValue = "Nice try 😏";
    } else {
        const result = operate(currentOperator, firstOperand, secondOperand);
        displayValue = roundResult(result).toString();
    }

    firstOperand = null;
    secondOperand = null;
    currentOperator = null;
    shouldResetDisplay = true;
}

function resetCalculator() {
    displayValue = "0";
    firstOperand = null;
    secondOperand = null;
    currentOperator = null;
    shouldResetDisplay = false;
}

function handleBackspace() {
    if (shouldResetDisplay || displayValue.length === 1) {
        displayValue = "0";
        shouldResetDisplay = false;
    } else {
        displayValue = displayValue.slice(0, -1);
    }
}

function add(n1, n2) {
    return n1 + n2;
}

function sub(n1, n2) {
    return n1 - n2;
}

function multiply(n1, n2) {
    return n1 * n2;
}

function divide(n1, n2) {
    return n2 === 0 ? "Nice try 😏" : n1 / n2;
}

function operate(operator, n1, n2) {
    switch (operator) {
        case "+": return add(n1, n2);
        case "-": return sub(n1, n2);
        case "*": return multiply(n1, n2);
        case "/": return divide(n1, n2);
        default: return null;
    }
}

function roundResult(result) {
    return (typeof result === "number" && !Number.isInteger(result))
        ? Math.round(result * 1000000) / 1000000
        : result;
}
