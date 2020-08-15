import React, { useState } from 'react';
import './App.css';
import ProcentForDeposite from './ProcentForDeposite';
import { TextField } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import { setDeposite, setProcentEveryYar, setMonthlyIncome } from './Redux/reducer';
import { connect } from 'react-redux';
import { getDepositeValue, getProcentValue, getMonthlyIncomeValue } from './Redux/StateSelectors/selectors';
import { calculateProcentIncomeAfterMonth, calculateProcentIncomeAfterYear, calculateDepositeAfterSomeMonth } from './CalculateFn/calculate';


const mapStateToProps = (state) => ({
  deposite: getDepositeValue(state),
  procentEveryYear: getProcentValue(state),
  monthlyIncome: getMonthlyIncomeValue(state)
})
export default connect(mapStateToProps, {setDeposite, setProcentEveryYar, setMonthlyIncome})(App)





function App(props) {
  const {deposite, procentEveryYear, monthlyIncome,
    setDeposite, setProcentEveryYar, setMonthlyIncome} = props

  const [charAfterDot, setCharAfterDot] = useState(2)

  
  // EventListeners 
  const depositIsChange = event => {
    let newDepositSize = +event.target.value 
    if (!newDepositSize || Number.isNaN(newDepositSize))  {
      newDepositSize = 0
    }
        setDeposite(+newDepositSize)
       
      }

  const summAddEveryMonthIsChanged = event => {
    let monthlyPaid = +event.target.value 
    if (!monthlyPaid || Number.isNaN(monthlyPaid))  {
      monthlyPaid = 0
    }
    setMonthlyIncome(monthlyPaid)
  }


  const userDepositInfo = (
    <form className={'variables'}>
      <div className={'cell'}>
        <ProcentForDeposite procentEveryYear={procentEveryYear} 
                            setProcentEveryYar={setProcentEveryYar} 
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
            value={
              calculateProcentIncomeAfterMonth(procentEveryYear, deposite, monthlyIncome, charAfterDot)
              }
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
            value={
              calculateProcentIncomeAfterYear(procentEveryYear, deposite, monthlyIncome, charAfterDot)
            }
            onChange={() => {console.log('Its proprepty calculate automatic')}} 
            label="% after a year"
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

  const willBeMoneyOnAYear = calculateDepositeAfterSomeMonth(12, deposite, monthlyIncome, procentEveryYear, charAfterDot )   
                                    .map( (sum, index) => {
                                      return (
                                        <div className={'calculateEachMonth'}>
                                          <p> {index + 1} month -></p> 
                                          <p className={'calculateDeposite'}>{sum}</p>
                                        </div>
                                      )})  ;
    
  const willBeMoneyOnLongTherm = calculateDepositeAfterSomeMonth(300, deposite, monthlyIncome, procentEveryYear, charAfterDot)
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