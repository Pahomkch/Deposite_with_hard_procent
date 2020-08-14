import React, { useState } from 'react';
import './App.css';
import ProcentForDeposite from './ProcentForDeposite';
import { TextField } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import { setDeposite, setProcentEveryYar,  setMonthlyProfit, setYearlyProfit, setMonthlyIncome } from './Redux/reducer';
import { connect } from 'react-redux';
import { getDepositeValue, getProcentValue, getMonthlyProfitValue, getYearProfitValue,getMonthlyIncomeValue } from './Redux/StateSelectors/selectors';


const mapStateToProps = (state) => ({
  deposite: getDepositeValue(state),
  procentEveryYear: getProcentValue(state),
  monthProfit: getMonthlyProfitValue(state),
  yearProfit: getYearProfitValue(state),
  monthlyIncome: getMonthlyIncomeValue(state)
})
export default connect(mapStateToProps, {setDeposite, setProcentEveryYar, setMonthlyProfit, setYearlyProfit, setMonthlyIncome})(App)

function App(props) {
  const {deposite, procentEveryYear, monthProfit, yearProfit, monthlyIncome, 
    setDeposite, setProcentEveryYar, setMonthlyProfit, setYearlyProfit, setMonthlyIncome} = props

const [charAfterDot, setCharAfterDot] = useState(0)

// EventListeners 
  const depositIsChange = event => {
    // let newDepositSize = +event.target.value 
    console.log('depositeIsChange')
    // if (!newDepositSize || Number.isNaN(newDepositSize))  {
    //   newDepositSize = 0
    // }
    //     setDeposite(newDepositSize)
    //     setMonthIncome(calculateProcentIncomeAfterMonth(procentEveryYear, newDepositSize))
    //     setYearIncome(calculateProcentIncomeAfterYear(procentEveryYear, newDepositSize) )
      }

  const summAddEveryMonthIsChanged = event => {
    console.log('add every month');
    
    // const monthlyPaid = +event.target.value 
    // setAddEveryMoth(monthlyPaid)
    // setMonthIncome(calculateProcentIncomeAfterMonth(procentEveryYear, deposite, monthlyPaid))
    // setYearIncome(calculateProcentIncomeAfterYear(procentEveryYear, deposite, monthlyPaid) )
  }


  const userDepositInfo = (
    <form className={'variables'}>
      <div className={'cell'}>
        <ProcentForDeposite procentEveryYear={procentEveryYear} setProcentEveryYar={setProcentEveryYar} />
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
            value={monthProfit}
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
            value={yearProfit}
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
                    value={monthlyIncome} 
                    onChange={summAddEveryMonthIsChanged} 
                    InputProps={{
                      startAdornment: <InputAdornment position="start">%</InputAdornment>,
                    }}
          /> 
      </div>
    </form>)

  // const willBeMoneyOnAYear = calculateDepositeAfterSomeMonth(12, deposite, addEveryMonth)
  //                                   .map( (sum, index) => {
  //                                     return (
  //                                       <div className={'calculateEachMonth'}>
  //                                         <p> {index + 1} month -></p> 
  //                                         <p className={'calculateDeposite'}>{sum}</p>
  //                                       </div>
  //                                     )})  ;
    
  //   const willBeMoneyOnLongTherm = calculateDepositeAfterSomeMonth(300)
  //                                       .map( (summa, index) => {
  //                                           if (index === 59 || index === 119 || index === 179 || index === 239 || index === 299) {
  //                                             return <div className={'calculateEachYear'}>
  //                                                       <p> { (index + 1) / 12} years -></p> 
  //                                                       <p className={'calculateDeposite'}>{summa}</p>
  //                                                     </div> 
  //                                           }
  //                                           return null
  //                                         })


  return (
    <div className={'App'} color="primary">
      <h1 className={'title'}>Calculate your deposite</h1>
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