const SET_DEPOSITE = 'APP/DEPOSITE_WITH_HARD_PROCENT/SET_DEPOSITE'
const SET_PROCENT_EVERY_YAER = 'APP/DEPOSITE_WITH_HARD_PROCENT/SET_PROCENT_EVERY_YAER'
const SET_MONTHLY_PROFIT = 'APP/DEPOSITE_WITH_HARD_PROCENT/SET_MONTHLY_PROFIT'
const SET_YEARLY_PROFIT = 'APP/DEPOSITE_WITH_HARD_PROCENT/SET_YEARLY_PROFIT'
const SET_MONTHLY_INCOME = 'APP/DEPOSITE_WITH_HARD_PROCENT/SET_MONTHLY_INCOME'



const initial = {
    procentEveryYear: 0.04,
    deposite: 101,
    monthProfit: 0,
    yearProfit: 0,
    monthlyIncome: 0
}

export default function reducer(state = initial, action) {
    switch (action.type) {
      case SET_DEPOSITE:
        return {
            ...state,
            deposite: action.payload
        }
      default:
        return state
    }
  }

export const setDeposite = (depositeValue) => ({type: SET_DEPOSITE, payload: depositeValue})
export const setProcentEveryYar = (value) => ({type: SET_PROCENT_EVERY_YAER, payload: value})
export const setMonthlyProfit = (value) => ({type: SET_MONTHLY_PROFIT, payload: value})
export const setYearlyProfit = (value) => ({type: SET_YEARLY_PROFIT, payload: value})
export const setMonthlyIncome = (value) => ({type: SET_MONTHLY_INCOME, payload: value})


