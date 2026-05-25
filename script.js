const btns = document.querySelector('.btns');
const digits = document.querySelector('.digits');
const last = document.querySelector('.last-input');

let numInput1 = '';
let operator = '';
let numInput2 = '';
let equalsFlag = false;

btns.addEventListener('click', (e) => {
    let target = e.target;

    switch (target.id) {
        case 'back':
            if (digits.textContent.length > 0) {
                digits.textContent = digits.textContent.slice(0, -1);
            }
            break;
        case 'clear':
            clear();
            break;
        case '+':
        case '-':
        case '*':
        case '/':
            // check if num1 has a value first
            if (digits.textContent === '') {
                break;
            }

            if (numInput1.length === 0) {
                numInput1 = digits.textContent;
                last.textContent = numInput1;
                digits.textContent = "";
            }

            if (Number(digits.textContent) === 0 && operator === '/') {
                alert("Divide by 0 error");
                clear();
                break;
            }
            
            if (digits.textContent.length > 0) {
                // if input as num2 has a value
                numInput2 = digits.textContent;
                let result = operate(numInput1, operator, numInput2);
                numInput1 = result;
                last.textContent = numInput1;
                digits.textContent = "";
            }
            
            operator = target.id;
            last.textContent += operator;
            break;
        case '=':
            if (Number(digits.textContent) === 0 && operator === '/') {
                alert("Nice try. The universe still refuses to divide by zero.");
                clear();
                break;
            }

            if (numInput1 && operator.length > 0 && digits.textContent.length > 0) {
                numInput2 = digits.textContent;
                digits.textContent = '';
                let result = operate(numInput1, operator, numInput2);
                numInput1 = result;
                last.textContent = numInput1;
                equalsFlag = true;
            }

            break;
        case '.':
            if (!digits.textContent.includes('.')) {
                input('.');
            }
            break;
        case '0':
            if (equalsFlag) {
                equalsFlag = false;
                clear();
            }

            if (digits.textContent === '0') {
                break;
            }
            input('0');
            break;
        default:
        if (equalsFlag) {
            equalsFlag = false;
            clear();
        }
        input(target.id);
    }
})

function operate(num1, operator, num2) {
    let result;
    num1 = Number(num1);
    num2 = Number(num2);

    switch (operator) {
        case '+':
            result = add(num1, num2);
            break;
        case '-':
            result = subtract(num1, num2);
            break;
        case '*':
            result = multiply(num1, num2);
            break;
        case '/':
            result = divide(num1, num2);
            break;
    }

    return Math.round(result * 10000000000) / 10000000000;
}

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function input(target) {
    digits.textContent += target;
}

function clear () {
    numInput1 = "";
    operator = "";
    numInput2 = "";
    equalsFlag = false;
    digits.textContent = "";
    last.textContent = "";
}