import React, { useState } from 'react';
import './App.css';
import ProcentForDeposite from './ProcentForDeposite';
import { createMuiTheme } from '@material-ui/core/styles';

import { TextField } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';


const charAfterDot = 2

export default function App() {

//initial state
const [procentEveryYear, setProcentPerYear] = useState(0.04)
const [deposite, setDeposite] = useState(0)
const [monthIncome, setMonthIncome] = useState(0)  
const [yearIncome, setYearIncome] = useState(0) 
const [addEveryMonth, setAddEveryMoth] = useState(0) 

// Calculate
  const calculateProcentIncomeAfterMonth = (procent = procentEveryYear, depositCount = deposite, monthlyPaid = addEveryMonth  ) => {
    return +((depositCount + monthlyPaid) * procent / 12).toFixed(charAfterDot)
  }

  const calculateProcentIncomeAfterYear = (procent = procentEveryYear, depositCount = deposite, monthlyPaid = addEveryMonth) => {
    const depositSumm = calculateDepositeAfterSomeMonth(12, depositCount, addEveryMonth)
    return calculateProcentIncomeAfterMonth(procent, depositSumm[11], monthlyPaid,   ) 
  }

  const calculateDepositeAfterSomeMonth = (countMonth, depositeCount = deposite, monthlyPaid = addEveryMonth, procentOfYear = procentEveryYear) => {
    let depositeSumms = [];
    let newDeposite = depositeCount;
    for (let i = 0; i < countMonth; i++) {
      newDeposite = (newDeposite + monthlyPaid) + newDeposite * procentOfYear / 12
      depositeSumms.push(newDeposite.toFixed(charAfterDot))
    }
    return depositeSumms
  }

// EventListeners 
  const depositIsChange = event => {
    let newDepositSize = +event.target.value 
    if (!newDepositSize || Number.isNaN(newDepositSize))  {
      newDepositSize = 0
    }
    setDeposite(newDepositSize)
    setMonthIncome(calculateProcentIncomeAfterMonth(procentEveryYear, newDepositSize))
    setYearIncome(calculateProcentIncomeAfterYear(procentEveryYear, newDepositSize) )
  }

  const summAddEveryMonthIsChanged = event => {
    const monthlyPaid = +event.target.value 
    setAddEveryMoth(monthlyPaid)
    setMonthIncome(calculateProcentIncomeAfterMonth(procentEveryYear, deposite, monthlyPaid))
    setYearIncome(calculateProcentIncomeAfterYear(procentEveryYear, deposite, monthlyPaid) )
  }


  const userDepositInfo = (
    <form className={'variables'}>
      <div className={'cell'}>
        <ProcentForDeposite   procentEveryYear={procentEveryYear}
                              setProcent={setProcentPerYear}
                              setMonthIncome={setMonthIncome} 
                              setYearIncome={setYearIncome}
                              calculateProcentIncomeAfterMonth={calculateProcentIncomeAfterMonth} 
                              calculateProcentIncomeAfterYear={calculateProcentIncomeAfterYear}
                              deposite={deposite}
                              addEveryMonth={addEveryMonth}
         />
      </div>
      <div className={'cell'}>
        <TextField
            value={deposite}
            onChange={depositIsChange}
            label="Your deposite now"
            id="standard-start-adornment"
            className={'cell'}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
          />
      </div>

      <div className={'cell'}>
      <TextField
            value={monthIncome}
            onChange={() => {console.log('Its proprepty calculate automatic')}} 
            label="% after a month"
            id="procentAfterMonth"
            color="secondary"
            InputProps={{
              startAdornment: <InputAdornment position="start">%</InputAdornment>,
            }}
          />
      </div>

      <div className={'cell'}>
      <TextField
            value={yearIncome}
            onChange={() => {console.log('Its proprepty calculate automatic')}} 
            label="% after a month"
            id="procentAfterYear"
            color="secondary"

            InputProps={{
              startAdornment: <InputAdornment position="start">%</InputAdornment>,
            }}
          />
        
      </div>

      <div className={'cell'}>
        <TextField  label="Add every month"  
                    placeholder={'Can add every month'} 
                    value={addEveryMonth} 
                    onChange={summAddEveryMonthIsChanged} 
                    InputProps={{
                      startAdornment: <InputAdornment position="start">%</InputAdornment>,
                    }}
          /> 
      </div>
    </form>)

  const willBeMoneyOnAYear = calculateDepositeAfterSomeMonth(12, deposite, addEveryMonth)
                                    .map( (sum, index) => {
                                      return (
                                        <div className={'calculateEachMonth'}>
                                          <p> {index + 1} month -></p> 
                                          <p className={'calculateDeposite'}>{sum}</p>
                                        </div>
                                      )})  ;
    
    const willBeMoneyOnLongTherm = calculateDepositeAfterSomeMonth(300)
                                        .map( (summa, index) => {
                                            if (index === 59 || index === 119 || index === 179 || index === 239 || index === 299) {
                                              return <div className={'calculateEachYear'}>
                                                        <p> { (index + 1) / 12} years -></p> 
                                                        <p className={'calculateDeposite'}>{summa}</p>
                                                      </div> 
                                            }
                                            return null
                                          })


  return (
    <div className={'App'} color="primary">
      <h1 className={'title'}>Calculate your deposite</h1>
      <div className={'container'}>
        {userDepositInfo}
        <div className={'willBe'}>
          {willBeMoneyOnAYear}
        </div>
        <div className={'longThermPlans'}>
          {willBeMoneyOnLongTherm}
        </div>
       
      </div>
    </div>)
}