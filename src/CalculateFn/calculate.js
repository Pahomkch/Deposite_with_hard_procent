export const calculateProcentIncomeAfterMonth = (procent, depositCount, monthlyPaid, charAfterDot) => {
    const summAfterMonth = +(depositCount + monthlyPaid)
    const answer = +(summAfterMonth * procent / 12)
    return answer.toFixed(charAfterDot)
  }

export const calculateProcentIncomeAfterYear = (procent, depositCount, monthlyPaid, charAfterDot) => {
    const depositSumm = calculateDepositeAfterSomeMonth(12, depositCount, monthlyPaid, procent)
    const answer = depositSumm[11] * procent / 12
    return answer.toFixed(charAfterDot)
  }

export const calculateDepositeAfterSomeMonth = (countMonth, depositeCount, monthlyPaid, procentOfYear, charAfterDot) => {
    let depositeSumms = [];
    let newDeposite = depositeCount;
    for (let i = 0; i < countMonth; i++) {
      newDeposite = (newDeposite + monthlyPaid) + newDeposite * procentOfYear / 12
      depositeSumms.push(newDeposite.toFixed(charAfterDot))
    }
    return depositeSumms
  }
