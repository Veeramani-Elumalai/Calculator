function add(n1 , n2){
    return n1 + n2 ;
}

function sub(n1 , n2){
    return n1 - n2;
}

function multiply(n1 , n2){
    return n1 * n2;
}

function divide(n1 , n2){
    if (n2 === 0) return "Error: Cannot divide by zero";
    return n1 / n2;
}

function operate(operator, n1, n2){
    if (operator == "+"){
        return add(n1 , n2);
    }else if(operator == "-"){
        return sub(n1 , n2);
    }else if(operator == "*"){
        return multiply(n1 ,n2);
    }else if(operator == "/"){
        return divide(n1 , n2);
    }else{
        alert("Enter a valid operator...");
        return null;
    }
}

while (true){
    let n1 = parseFloat(prompt("Enter n1 :"));
    let n2 = parseFloat(prompt("Enter n2 :"));
    let operator = prompt("Enter the operation (+, -, *, /) :");

    if (operator === "exit") {
        alert("Calculator closed.");
        break;
    }

    let result = operate(operator, n1, n2);

    if (result !== null) {
        alert("Result: " + result);
        console.log("Result:", result);
    }
}
