function add (num1, num2) {
  return num1 + num2
}

function subtract (num1, num2) {
  return num1 - num2
}

function multiply (num1, num2) {
  return num1 * num2
}

function divide (num1, num2) {
  return num1 / num2
}

function operate (num1, num2, operator) {
  num1 = parseInt(num1)
  num2 = parseInt(num2)
  if (operator === '+') {
    return add(num1, num2)
  } else if (operator === '-') {
    return subtract(num1, num2)
  } else if (operator === '*') {
    return multiply(num1, num2)
  } else if (operator === '/') {
    return divide(num1, num2)
  } else {
    return 'Invalid operator!'
  }
};

function clearDisplay () {
  display.innerText = ''
}

function updateDisplay (text) {
  let displayValue = display.innerText
  if (displayValue === '0') {
    displayValue = text
  } else {
    displayValue += text
  }
  display.innerText = displayValue
  return displayValue
}

const display = document.querySelector('#display')
const operators = ['+', '-', '/', '%']
let num1 = ''
let num2 = ''
let operator = ''

const calButtons = document.querySelectorAll('.calc-button')

calButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const value = button.innerText
    let displayValue = updateDisplay(value)
    console.log(value)
    console.log(typeof (value))

    // check if operator assigned
    // if operator is assigned then assign
    // value to second number
    // else to first
    if (value === '=') {
      const answer = operate(num1, num2, operator)
      clearDisplay()
      displayValue = updateDisplay(answer)
    } else if (operators.includes(operator)) {
      num2 += value
    } else if (operators.includes(value)) {
      operator = value
    } else {
      num1 += value
    }

    console.log(num1)
    console.log(num2)
    console.log(operator)
  })
})
