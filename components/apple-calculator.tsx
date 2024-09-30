'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"

export function AppleCalculatorComponent() {
  const [display, setDisplay] = useState('0')
  const [firstOperand, setFirstOperand] = useState(null)
  const [operator, setOperator] = useState(null)
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false)

  const inputDigit = (digit) => {
    if (waitingForSecondOperand) {
      setDisplay(String(digit))
      setWaitingForSecondOperand(false)
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit)
    }
  }

  const inputDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.')
    }
  }

  const clear = () => {
    setDisplay('0')
    setFirstOperand(null)
    setOperator(null)
    setWaitingForSecondOperand(false)
  }

  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(display)

    if (firstOperand === null) {
      setFirstOperand(inputValue)
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator)
      setDisplay(String(result))
      setFirstOperand(result)
    }

    setWaitingForSecondOperand(true)
    setOperator(nextOperator)
  }

  const calculate = (firstOperand, secondOperand, operator) => {
    switch (operator) {
      case '+':
        return firstOperand + secondOperand
      case '-':
        return firstOperand - secondOperand
      case '×':
        return firstOperand * secondOperand
      case '÷':
        return firstOperand / secondOperand
      default:
        return secondOperand
    }
  }

  const buttonClass = "text-2xl font-light h-16 rounded-full transition-colors"

  return (
    <div className="w-full max-w-xs mx-auto bg-black p-4 rounded-3xl">
      <div className="text-right text-5xl font-light text-white mb-4 h-20 flex items-center justify-end pr-4">
        {display}
      </div>
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'AC', onClick: clear, className: "bg-gray-300 text-black hover:bg-gray-200" },
          { label: '+/-', onClick: () => {}, className: "bg-gray-300 text-black hover:bg-gray-200" },
          { label: '%', onClick: () => {}, className: "bg-gray-300 text-black hover:bg-gray-200" },
          { label: '÷', onClick: () => performOperation('÷'), className: "bg-orange-500 text-white hover:bg-orange-400" },
          { label: '7', onClick: () => inputDigit(7), className: "bg-gray-700 text-white hover:bg-gray-600" },
          { label: '8', onClick: () => inputDigit(8), className: "bg-gray-700 text-white hover:bg-gray-600" },
          { label: '9', onClick: () => inputDigit(9), className: "bg-gray-700 text-white hover:bg-gray-600" },
          { label: '×', onClick: () => performOperation('×'), className: "bg-orange-500 text-white hover:bg-orange-400" },
          { label: '4', onClick: () => inputDigit(4), className: "bg-gray-700 text-white hover:bg-gray-600" },
          { label: '5', onClick: () => inputDigit(5), className: "bg-gray-700 text-white hover:bg-gray-600" },
          { label: '6', onClick: () => inputDigit(6), className: "bg-gray-700 text-white hover:bg-gray-600" },
          { label: '-', onClick: () => performOperation('-'), className: "bg-orange-500 text-white hover:bg-orange-400" },
          { label: '1', onClick: () => inputDigit(1), className: "bg-gray-700 text-white hover:bg-gray-600" },
          { label: '2', onClick: () => inputDigit(2), className: "bg-gray-700 text-white hover:bg-gray-600" },
          { label: '3', onClick: () => inputDigit(3), className: "bg-gray-700 text-white hover:bg-gray-600" },
          { label: '+', onClick: () => performOperation('+'), className: "bg-orange-500 text-white hover:bg-orange-400" },
          { label: '0', onClick: () => inputDigit(0), className: "col-span-2 bg-gray-700 text-white hover:bg-gray-600" },
          { label: '.', onClick: inputDecimal, className: "bg-gray-700 text-white hover:bg-gray-600" },
          { label: '=', onClick: () => performOperation('='), className: "bg-orange-500 text-white hover:bg-orange-400" },
        ].map((btn, index) => (
          <Button
            key={index}
            onClick={btn.onClick}
            className={`${buttonClass} ${btn.className} ${btn.label === '0' ? 'col-span-2' : ''}`}
          >
            {btn.label}
          </Button>
        ))}
      </div>
    </div>
  )
}