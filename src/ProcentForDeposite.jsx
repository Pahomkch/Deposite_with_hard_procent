import React from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import style from './App'

export default function ProcentForDeposite({setProcent}) {
    const acc = (e)=>{
        if ( !isNaN(+e.currentTarget.innerText) ) {
            // setProcent(+e.currentTarget.innerText)
            }
        }
    return (
    <div className={style.procentForDeposite}>
      <Typography id="discrete-slider" gutterBottom>
        Index your interest
      </Typography>
      <Slider
        defaultValue={1.0}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={0.1}
        marks
        min={3}
        max={6}
        getAriaValueText={(value) => { setProcent((value/100).toFixed(2))}}
      />
      
    </div>
  );
}