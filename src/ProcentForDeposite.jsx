import React from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import style from './App'

export default function ProcentForDeposite({procentEveryYear, setProcentEveryYar}) {

  const updateCalculating = (e, value) => {
    setProcentEveryYar(value)
    
    // const newProcentValue = (value/100).toFixed(3)
    // setProcent(newProcentValue)
    // setMonthIncome(calculateProcentIncomeAfterMonth( newProcentValue ))
    // setYearIncome(calculateProcentIncomeAfterYear( newProcentValue ) )
  }

  return (
    <div className={style.procentForDeposite}>
      <Typography id="discrete-slider" gutterBottom>
        Index your interest
      </Typography>
      <Slider
        defaultValue={procentEveryYear*100}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={1}
        marks
        min={3}
        max={15}
        onChange={updateCalculating } />
      
    </div>
  );
}