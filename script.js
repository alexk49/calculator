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
  num1 = ''
  num2 = ''
  operator = ''
}

function updateDisplay (text) {
  let displayValue = display.innerText
  if (displayValue === '0') {
    displayValue = text
  } else if (operators.includes(displayValue.charAt(displayValue.length - 1)) && operators.includes(text)) {
    displayValue = displayValue.slice(0, -1) + text
  } else {
    displayValue += text
  }
  display.innerText = displayValue
  return displayValue
}

function getAnswer () {
  const answer = operate(num1, num2, operator)
  clearDisplay()
  displayValue = updateDisplay(answer)
  return answer
}

const display = document.querySelector('#display')
const operators = ['+', '-', '*', '/', '%']
let num1 = ''
let num2 = ''
let operator = ''
const answer = ''

const calButtons = document.querySelectorAll('.calc-button')

calButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const value = button.innerText
    const displayValue = updateDisplay(value)

    // check if operator assigned
    // if operator is assigned then assign
    // value to second number
    // else to first
    if (value === 'AC') {
      clearDisplay()
    } else if (value === '=') {
      num1 = getAnswer()
    } else if (operators.includes(operator) && (num1 !== '') && (!operators.includes(value))) {
      num2 += value
    } else if (value.includes(operator) && num2 !== '') {
      num1 = getAnswer()
    } else if (operators.includes(value) && operator !== '' && num2 !== '') {
      num1 = getAnswer()
      operator = value
      updateDisplay(value)
    } else if (operators.includes(value)) {
      operator = value
    } else {
      num1 += value
    }
    console.log('Number 1: ' + num1)
    console.log('Number 2: ' + num2)
    console.log('operator: ' + operator)
  })
})
