//   export const calculateProcentIncomeAfterMonth = (procent, depositCount, monthlyPaid, charAfterDot) => {
//     return +((depositCount + monthlyPaid) * procent / 12).toFixed(charAfterDot)
//   }

//   const calculateProcentIncomeAfterYear = (procent, depositCount, monthlyPaid) => {
//     const depositSumm = calculateDepositeAfterSomeMonth(12, depositCount, addEveryMonth)
//     return calculateProcentIncomeAfterMonth(procent, depositSumm[11], monthlyPaid,   ) 
//   }

//   const calculateDepositeAfterSomeMonth = (countMonth, depositeCount, monthlyPaid, procentOfYear, charAfterDot) => {
//     let depositeSumms = [];
//     let newDeposite = depositeCount;
//     for (let i = 0; i < countMonth; i++) {
//       newDeposite = (newDeposite + monthlyPaid) + newDeposite * procentOfYear / 12
//       depositeSumms.push(newDeposite.toFixed(charAfterDot))
//     }
//     return depositeSumms
//   }
