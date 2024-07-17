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
  return answer.toFixed(5)
}

function backspace () {
  // delete last entered character
  // updateDisplay adds <- to the display string
  // so use -3 to get the deleted character
  let displayValue = display.innerText

  // if displayValue is just three characters
  // then it will be value like: 2<-
  // which should be reset to zero
  // also if 0 is deleted displayValue will just be <-
  // so length will be 2, and should be reset to 0
  if (displayValue.length === 3 || displayValue.length === 2) {
    displayValue = '0'
  } else {
    displayValue = displayValue.slice(0, -3)
  }
  display.innerText = displayValue
  return displayValue
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
      }
      break
    }
    // if operator not found then only one number set
    if (displayValue === '0') {
      num1 = ''
    } else {
      num1 = displayValue
    }
  }
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
    const displayValue = updateDisplay(value)

    if (value === 'AC') {
      clearDisplay()
    } else if (value === '<-') {
      const displayValue = backspace()
      parseDisplay(displayValue)
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
