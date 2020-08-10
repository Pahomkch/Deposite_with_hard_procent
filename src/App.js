import React, { useState } from 'react';
import './App.css';
import ProcentForDeposite from './ProcentForDeposite';

// add input for change that variables
const charAfterDot = 2
// const procentEveryYear = 0.04


function App() {
//initial
const [procentEveryYear, setProcentPerYear] = useState(0.04)
// Calculate
  const calculateProcentIncomeForMonth = (depositCount) => {
    return +((depositCount * procentEveryYear) / 12).toFixed(charAfterDot)
  }
  const calculateForYear = (depositCount, monthlyPaid = 0) => {
    const summMonthlyPaidAfterYear = monthlyPaid * 12
    const summDepositeInTheYearEnd = depositCount + summMonthlyPaidAfterYear 
    return Math.round(summDepositeInTheYearEnd * procentEveryYear)
  }

  const calculateDepositeSizeForSomeMonths = (deposit, sumMonthlyIncome, months) => {
    const helperCalculate = (deposit, summEveryMonth = sumMonthlyIncome) => {
      return (deposit + summEveryMonth + calculateProcentIncomeForMonth(deposit)) 
    }    

    let depositsInEachMonth = [];
    let newDepositSum = deposit;
    for (let i = 1; i <= months; i++) {
      let depositInNextMonth = helperCalculate(newDepositSum)
      depositsInEachMonth.push(+depositInNextMonth.toFixed(charAfterDot))
      newDepositSum = depositInNextMonth
    }
    return depositsInEachMonth
  }

//state
  const [deposite, setDeposite] = useState(0)
  const [monthIncome, setMonthIncome] = useState(calculateProcentIncomeForMonth(deposite)) 
  const [yearIncome, setYearIncome] = useState(calculateForYear(deposite)) 
  const [addEveryMonth, setAddEveryMoth] = useState(0) 

// EventListeners 
  const depositIsChange = event => {
    let newDepositSize = +event.target.value 
    if (!newDepositSize || Number.isNaN(newDepositSize))  {
      newDepositSize = 0
    }
    setDeposite(newDepositSize)
    setMonthIncome(calculateProcentIncomeForMonth(newDepositSize))
    setYearIncome(calculateForYear(newDepositSize, addEveryMonth))
  }
  const summAddEveryMonthIsChanged = event => {
    setAddEveryMoth(+event.target.value)
    setMonthIncome(calculateProcentIncomeForMonth(+event.target.value * 12))
    setYearIncome(calculateForYear(deposite, +event.target.value))
  }


  const userDepositInfo = (
    <div className={'variables'}>
      <div className={'cell'}>
        <ProcentForDeposite setProcent={setProcentPerYear} />
      </div>
      <div className={'cell'}>
        <div>Enter your deposit</div>
        <input value={deposite} onChange={depositIsChange}  type={'text'}  />
      </div>

      <div className={'cell'}>
        <div>income % in Month</div> 
        <input value={monthIncome} id={'inComeNextMonth'}  placeholder={'month'}  type={'text'}  />
      </div>

      <div className={'cell'}>
        <div>income % in Year</div> 
        <input value={yearIncome} id={'inComeNextYear'}  placeholder={'year'}  type={'text'}  />
      </div>

      <div className={'cell'}>
        <div>Add Monthly</div> 
        <textarea placeholder={'Can add every month'} 
                id={'addEveryMonth'}
                value={addEveryMonth} 
                onChange={summAddEveryMonthIsChanged} />
         <div>procentEveryYear = {procentEveryYear}</div> 
      </div>
    </div>)

  const willBeMoneyOnAYear = calculateDepositeSizeForSomeMonths(deposite, addEveryMonth, 12)
                                    .map( (sum, index) => {
                                      let showSum = +sum.toFixed(charAfterDot)
                                      return (
                                        <div className={'calculateEachMonth'}>
                                          <p> After {index + 1} month:</p> 
                                          <p className={'calculateDeposite'}>{showSum}</p>
                                        </div>
                                      )})  ;
    
    const willBeMoneyOnLongTherm = calculateDepositeSizeForSomeMonths(deposite, addEveryMonth, 240)
                                      .map( (sum, index) => {
                                        return (index === 59 || index === 119 || index === 179 || index === 239  ) ? 
                                                <div className={'calculateEachMonth'}> 
                                                  After {index=== 59 && '5 years'} 
                                                          {index === 119 && '10 years'}
                                                          {index === 179 && '15 years'}
                                                          {index === 239 && '20 years'}
                                                    <p className={'calculateDeposite'}>{sum}</p></div> 
                                                : null 
                                      })                                  


  return (
    <div className={'App'} color="primary">
      <h1>Calculate your deposite</h1>
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

export default App;
