let display = document.getElementById("display");
let displayValue = "";

const buttons = document.querySelectorAll("button");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        if (value === "C"){
            displayValue = "";
        }else if (value === "⌫") {
            displayValue = displayValue.slice(0, -1);
        }else if (value === "=") {
            try {
                // Replace 'x' with '*' for JS eval
                let expression = displayValue.replace(/x/g, '*');
                displayValue = eval(expression).toString();
            } catch {
                displayValue = "Error";
            }
        }else {
            displayValue += value;
        }
        display.textContent = displayValue;
    });
});