import { useEffect, useRef, useState } from "react"

enum Operator {
    add = '+',
    substract = '-',
    multiply = 'x',
    divide = '+'
}

export const useCalculator = () => {

    const [formula, setFormula] = useState('0')  
    
    const [number, setNumber] = useState('0')
    const [prevNumber, setPrevNumber] = useState('0')

    const lastOperation = useRef<Operator>()

    useEffect(() => {
        if(lastOperation.current){
            const firstFormulaPart = formula.split(' ').at(0)
            setFormula(`${firstFormulaPart} ${lastOperation.current} ${number}`)
        } else {
            setFormula(number)
        }
    }, [number])

    useEffect(() => {
        const subResult = calculateSubResult();
        setPrevNumber(`${subResult}`)
    }, [formula])

    const clean = () => {
        setNumber('0')
        setPrevNumber('0')
        setFormula('0')

        lastOperation.current = undefined
    }  
    
    const toggleSign = () => {
        if (number.includes('-')) {
            setNumber(number.replace('-', ''))
        }

        setNumber('-' + number)
    }

    const deleteLast = () => {
        let currentSign = ''
        let temporalNumber = number

        if (number.includes('-')) {
            currentSign = '-'
            temporalNumber = number.substring(1)
        }

        if (temporalNumber.length > 1) {
            return setNumber(currentSign + temporalNumber.slice(0,- 1))
        }

        setNumber('0')
    }

    const setLastNumber = () => {
        calculateResult()

        if(number.endsWith('.')) {
            setPrevNumber(number.slice(0, -1))
        }

        setPrevNumber(number)
        setNumber('0')
    }

    const divideOperation = () => {
        setLastNumber()
        lastOperation.current = Operator.divide
    }

    const multiplyOperation = () => {
        setLastNumber()
        lastOperation.current = Operator.multiply
    }

    const substractOperation = () => {
        setLastNumber()
        lastOperation.current = Operator.substract
    }

    const addOperation = () => {
        setLastNumber()
        lastOperation.current = Operator.add
    }

    const calculateResult = () => {
        const result = calculateSubResult()
        setFormula(`${result}`)

        lastOperation.current = undefined
        setPrevNumber('0')

    }

    const calculateSubResult = () => {
        const [firstNumber, operation, secondNumber] = formula.split(' ')

       const num1 = Number(firstNumber)
       const num2 = Number(secondNumber)

       if( isNaN(num2) ) return num1;
        
       switch (operation) {
        case Operator.add:
            return num1 + num2
        case Operator.substract:
            return num1 - num2
        case Operator.multiply:
            return num1 * num2
        case Operator.divide:
            return num1 / num2

        default:
            throw new Error(`Operation ${operation} not implemented`)
       }

    }

    const buildNumber = ( numberString: string ) => {
        if (number.includes('.') && numberString === '.') return

        if (number.startsWith('0') || number.startsWith('-0')) {
            if(numberString === '.') {
               return setNumber(number + numberString)
            }

            //Evaluate if is other zero and there is no point
            if(numberString === '0' && number.includes('.')) {
                return setNumber(number + numberString)
            }

            //Evaluate if is different from zero, there is no point and it is first number
            if(numberString !== '0' && !number.includes('.')) {
                return setNumber(numberString)
            }

            //Avoid double zero
            if(numberString === '0' && !number.includes('.')) {
                return
            }
        }

        setNumber(number + numberString)
    }

    return {
        //Props
        formula,
        number,
        prevNumber,

        //Methods
        buildNumber,
        clean,
        toggleSign,
        deleteLast, 

        divideOperation,
        multiplyOperation,
        substractOperation,
        addOperation,
        calculateSubResult,
        calculateResult
    }
}