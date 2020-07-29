import React, { useState } from 'react';
import './App.css';

// add input for change that values
const charAfterDot = 2
const procentEveryYear = 0.04


function App() {
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
  const [deposite, setDeposite] = useState(1000)
  const [monthIncome, setMonthIncome] = useState(calculateProcentIncomeForMonth(deposite)) 
  const [yearIncome, setYearIncome] = useState(calculateForYear(deposite)) 
  const [addEveryMonth, setAddEveryMoth] = useState(0) 

// EventListeners 
  const depositIsChange = event => {
    setDeposite(+event.target.value)
    setMonthIncome(calculateProcentIncomeForMonth(+event.target.value))
    setYearIncome(calculateForYear(+event.target.value, addEveryMonth))
  }
  const summAddEveryMonthIsChanged = event => {
    setAddEveryMoth(+event.target.value)
    setYearIncome(calculateForYear(deposite, +event.target.value))
  }




  return (
    <div className={'App'}>
      {/* main summ */}
      <div className={'variables'}>

        <div className={'cell'}>
          <p>Enter your deposit</p>
          <input value={deposite} onChange={depositIsChange}  type={'text'}  />
        </div>

        <div className={'cell'}>
          <p>% in Month</p> 
          <input value={monthIncome} id={'inComeNextMonth'}  placeholder={'month'}  type={'text'}  />
        </div>

        <div className={'cell'}>
          <p>% in Year</p> 
          <input value={yearIncome} id={'inComeNextYear'}  placeholder={'year'}  type={'text'}  />
        </div>

        <div className={'cell'}>
          <p>Add Monthly</p> 
          <textarea placeholder={'Can add every month'} 
                  id={'addEveryMonth'}
                  value={addEveryMonth} 
                  onChange={summAddEveryMonthIsChanged} />
        </div>
      </div>

      <div className={'willBe'}>
        {calculateDepositeSizeForSomeMonths(deposite, addEveryMonth, 12)
          .map( (sum, index) => {
            let showSum = +sum.toFixed(charAfterDot)
            return (
              <div key={sum} className={'calculateEachMonth'}>
                <p>Your deposite after {index + 1} month:</p> <p className={'calculateDeposite'}>{showSum}</p>
              </div>
            )})}
      </div>



    
      <div className={'longThermPlans'}>
        {calculateDepositeSizeForSomeMonths(deposite, addEveryMonth, 240).map( (sum, index) => {
          return (index === 59 || index === 119 || index === 179 || index === 239  ) ? 
                  <div key={sum} className={'calculateEachMonth'}> 
                      after {index=== 59 && '5 years'} 
                            {index === 119 && '10 years'}
                            {index === 179 && '15 years'}
                            {index === 239 && '20 years'}
                                  <p className={'calculateDeposite'}>{sum}</p></div> 
                  : null 
        })}
      </div>
    </div>)
}

export default App;
