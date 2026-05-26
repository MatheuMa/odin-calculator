const btns = document.querySelector('.btns');
const digits = document.querySelector('.digits');
const last = document.querySelector('.last-input');

let numInput1 = '';
let operator = '';
let numInput2 = '';
let equalsFlag = false;

document.addEventListener('keydown', (e) => {
    let keyName = e.key;

    switch(keyName) {
        case 'Backspace':
            handleBack();
            break;
        case '+':
        case '-':
        case '*':
        case '/':
            // check if num1 has a value first
            if (digits.textContent === '') {
                break;
            }

            // get num1 from the input            
            if (numInput1.length === 0) {
                numInput1 = digits.textContent;
                last.textContent = numInput1;
                digits.textContent = "";
            }

            if (dividedBy0()) {
                alert("Nice try. The universe still refuses to divide by zero.");
                clear();
                break;
            }
            
            if (digits.textContent.length > 0) {
                // if input as num2 has a value
                calculateResult();
            }
            
            operator = keyName;
            last.textContent += operator;
            break;
        case '=':
        case 'Enter':
            e.preventDefault();
            if (numInput1 && operator.length > 0 && digits.textContent.length > 0) {
                if (dividedBy0()) {
                    alert("Nice try. The universe still refuses to divide by zero.");
                    clear();
                    break;
                }

                calculateResult();
                equalsFlag = true;
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
        case '.':
            decimalInput();
            break;
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            handleDefaultInput(keyName);
    }
})

btns.addEventListener('click', (e) => {
    let target = e.target;

    switch(target.id) {
        case 'back':
            handleBack();
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

            // get num1 from the input            
            if (numInput1.length === 0) {
                numInput1 = digits.textContent;
                last.textContent = numInput1;
                digits.textContent = "";
            }

            if (dividedBy0()) {
                alert("Nice try. The universe still refuses to divide by zero.");
                clear();
                break;
            }
            
            if (digits.textContent.length > 0) {
                // if input as num2 has a value
                calculateResult();
            }
            
            operator = target.id;
            last.textContent += operator;
            break;
        case '=':
            if (numInput1 && operator.length > 0 && digits.textContent.length > 0) {
                if (dividedBy0()) {
                    alert("Nice try. The universe still refuses to divide by zero.");
                    clear();
                    break;
                }

                calculateResult();
                equalsFlag = true;
            }
            break;
        case '.':
            decimalInput();
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
            handleDefaultInput(target.id);
    }
})

function handleBack() {
    if (digits.textContent.length > 0) {
        digits.textContent = digits.textContent.slice(0, -1);
    }
}

function dividedBy0() {
    return Number(digits.textContent) === 0 && operator === '/';
}

function calculateResult() {
    numInput2 = digits.textContent;
    digits.textContent = '';
    let result = operate(numInput1, operator, numInput2);
    numInput1 = result;
    last.textContent = numInput1;
}

function decimalInput() {
    if (!digits.textContent.includes('.')) {
        input('.');
    }
}

function handleDefaultInput(value) {
    if (equalsFlag) {
        equalsFlag = false;
        clear();
    }
    input(value);
}

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