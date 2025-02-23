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
  if (num2 === 0) {
    return "DON'T DO THAT"
  }
  return num1 / num2
}

function operate (num1, num2, operator) {
  // performs calculator operation
  num1 = parseFloat(num1)
  num2 = parseFloat(num2)
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
  // used to reset calculator
  display.innerText = '0'
  num1 = ''
  num2 = ''
  operator = ''
}

function updateDisplay (text) {
  // set display value to pressed button text
  // unless value already 0
  // or if an operator is pressed twice
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
  // returns answer and updates display
  // with answer to operation
  let answer = operate(num1, num2, operator)
  if (answer === 'Invalid operator!') {
    answer = '0'
  }
  clearDisplay()
  displayValue = updateDisplay(answer)
  return answer
}

function backspace () {
  // delete last entered character
  let displayValue = display.innerText

  // if only one digit then reset display
  if (displayValue.length === 1) {
    displayValue = '0'
    clearDisplay()
  } else {
    displayValue = displayValue.slice(0, -1)
  }
  display.innerText = displayValue
  return displayValue.toString()
}

function parseDisplay (displayValue) {
  // set global variables based on values in display
  for (let i = 0; i < displayValue.length; i++) {
    if (operators.includes(displayValue[i])) {
      const values = displayValue.split(displayValue[i])
      if (values.length === 2) {
        num1 = values[0]
        num2 = values[1]
      } else if (values.length === 1) {
        num1 = values[0]
        break
      }
      // if operator not found then only one number set
      if (displayValue === '0') {
        clearDisplay()
      } else {
        num1 = displayValue
        num2 = ''
        operator = ''
      }
    }
  }
}

function checkForDecimal (num, value) {
  if (value !== '.') {
    return false
  } else {
    return num.includes('.')
  }
}

function convertToPercent () {
  let answer = ''
  if (operator !== '') {
    num1 = getAnswer()
    answer = (num1 / 100)
  } else {
    num1 = parseFloat(num1)
    answer = (num1 / 100)
  }
  clearDisplay()
  updateDisplay(answer)
  return answer
}

const display = document.querySelector('#display')
const operators = ['+', '-', '*', '/', '%']
let num1 = ''
let num2 = ''
let operator = ''

const calButtons = document.querySelectorAll('.calc-button')

calButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const value = button.innerText
    main(value)
  })
})

document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    main('=')
  } else if (event.key === 'Backspace') {
    main('<-')
  } else if (event.key === 'Escape') {
    main('AC')
  } else if (operators.includes(event.key) || isNaN(event.key) === false || event.key === '.') {
    main(event.key)
  }
}
)

function main (value) {
  let displayValue = display.innerText
  if (value === 'AC') {
    clearDisplay()
  } else if (value === '<-') {
    const displayValue = backspace()

    parseDisplay(displayValue)
  } else if (value === '=') {
    num1 = getAnswer()
  } else if (value === '%') {
    num1 = convertToPercent()
  } else if (operators.includes(operator) && (num1 !== '') && (!operators.includes(value))) {
    if (checkForDecimal(num2, value) === false) {
      num2 += value
      displayValue = updateDisplay(value)
    }
  } else if (value.includes(operator) && num2 !== '') {
    num1 = getAnswer()
    displayValue = updateDisplay(value)
  } else if (operators.includes(value) && operator !== '' && num2 !== '') {
    num1 = getAnswer()
    operator = value
    updateDisplay(value)
  } else if (operators.includes(value)) {
    operator = value
    displayValue = updateDisplay(value)
  } else {
    if (checkForDecimal(num1, value) === false) {
      num1 += value
      displayValue = updateDisplay(value)
    }
  }
}
