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

function updateDisplay (text) {
  display = document.querySelector('#display')
  displayValue = display.innerText
  if (displayValue === '0') {
    displayValue = text
  } else {
    displayValue += text
  }
  display.innerText = displayValue
  return displayValue
}

const operators = ['=', '+', '-', '/', '%']
const num1 = ''
const num2 = ''
const operator = ''

const calButtons = document.querySelectorAll('.calc-button')

calButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const displayValue = updateDisplay(button.innerText)
    console.log(displayValue)
  })
})
