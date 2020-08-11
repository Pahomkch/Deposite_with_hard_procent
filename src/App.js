import React, { useState } from 'react';
import './App.css';
import ProcentForDeposite from './ProcentForDeposite';



const charAfterDot = 2

export default function App() {
//initial state
const [procentEveryYear, setProcentPerYear] = useState(0.04)
const [deposite, setDeposite] = useState(0)
const [monthIncome, setMonthIncome] = useState(0) 
const [yearIncome, setYearIncome] = useState(0) 
const [addEveryMonth, setAddEveryMoth] = useState(0) 

// Calculate
  const calculateProcentIncomeAfterMonth = (depositCount, monthlyPaid = 0) => {
    return +((depositCount + monthlyPaid) * procentEveryYear / 12).toFixed(charAfterDot)
  }

  const calculateProcentIncomeAfterYear = (depositCount, monthlyPaid = 0) => {
    const depositSumm = calculateDepositeAfterSomeMonth(12, depositCount, addEveryMonth)
    return calculateProcentIncomeAfterMonth(depositSumm[11]) 
  }

  const calculateDepositeAfterSomeMonth = (countMonth, deposite, monthlyPaid = 0, procentOfYear = procentEveryYear) => {
    let depositeSumms = [];
    let newDeposite = deposite;
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
    setMonthIncome(calculateProcentIncomeAfterMonth(newDepositSize, addEveryMonth))
    setYearIncome(calculateProcentIncomeAfterYear(newDepositSize, addEveryMonth) )
  }

  const summAddEveryMonthIsChanged = event => {
    const monthlyPaid = +event.target.value 
    setAddEveryMoth(monthlyPaid)
    setMonthIncome(calculateProcentIncomeAfterMonth(deposite, monthlyPaid))
    setYearIncome(calculateProcentIncomeAfterYear(deposite, monthlyPaid) )
  }


  const userDepositInfo = (
    <div className={'variables'}>
      <div className={'cell'}>
        <ProcentForDeposite  setProcent={setProcentPerYear} />
      </div>
      <div className={'cell'}>
        <div>Enter your deposit</div>
        <input value={deposite} onChange={depositIsChange}  type={'text'}  />
      </div>

      <div className={'cell'}>
        <div>income % after Month</div> 
        <input value={monthIncome} onChange={() => {console.log('Its proprepty calculate automatic')}} 
                id={'inComeNextMonth'}  placeholder={'month'}  type={'text'}  />
      </div>

      <div className={'cell'}>
        <div>income % after Year</div> 
        <input value={yearIncome} onChange={() => {console.log('Its proprepty calculate automatic')}}
                id={'inComeNextYear'}  placeholder={'year'}  type={'text'}  />
      </div>

      <div className={'cell'}>
        <div>Add Monthly</div> 
        <textarea placeholder={'Can add every month'} 
                id={'addEveryMonth'}
                value={addEveryMonth} 
                onChange={summAddEveryMonthIsChanged} />
      </div>
    </div>)

  // const willBeMoneyOnAYear = calculateDepositeSizeForSomeMonths(deposite, addEveryMonth, 12)
  //                                   .map( (sum, index) => {
  //                                     let showSum = +sum.toFixed(charAfterDot)
  //                                     return (
  //                                       <div className={'calculateEachMonth'}>
  //                                         <p> After {index + 1} month:</p> 
  //                                         <p className={'calculateDeposite'}>{showSum}</p>
  //                                       </div>
  //                                     )})  ;
    
  //   const willBeMoneyOnLongTherm = calculateDepositeSizeForSomeMonths(deposite, addEveryMonth, 240)
  //                                     .map( (sum, index) => {
  //                                       return (index === 59 || index === 119 || index === 179 || index === 239  ) ? 
  //                                               <div className={'calculateEachMonth'}> 
  //                                                 After {index=== 59 && '5 years'} 
  //                                                         {index === 119 && '10 years'}
  //                                                         {index === 179 && '15 years'}
  //                                                         {index === 239 && '20 years'}
  //                                                   <p className={'calculateDeposite'}>{sum}</p></div> 
  //                                               : null 
  //                                     })                                  


  return (
    <div className={'App'} color="primary">
      <h1>Calculate your deposite</h1>
      <div className={'container'}>
        {userDepositInfo}
        <div className={'willBe'}>
          {/* {willBeMoneyOnAYear} */}
        </div>
        <div className={'longThermPlans'}>
          {/* {willBeMoneyOnLongTherm} */}
        </div>
       
      </div>
    </div>)
}