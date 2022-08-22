import React from 'react';
import { Block } from './Block';
import './index.scss';

function App() {

  const rates = React.useRef({});

  const [currencyFrom, setCurencyFrom] = React.useState('MDL');
  const [currencyTo, setCurencyTo] = React.useState('USD');

  const [priceFrom, setFromPrice] = React.useState(0);
  const [priceTo, setToPrice] = React.useState(0);


  React.useEffect(()=>{
    fetch('https://cdn.cur.su/api/latest.json')
    .then((res) => res.json())
    .then((res) => {
      rates.current = res.rates;
      onChangeCurrencyFrom(100);
    })
    .catch((err) => console.log(err))

  },[])

  const onChangeCurrencyFrom = (value) => {
    const sum = value / rates.current[currencyFrom]
    const result  = sum * rates.current[currencyTo]
  

    setFromPrice(value)
    setToPrice(result.toFixed(3))
  }

  const onChangeCurrencyTo = (value) => {

    const result = (rates.current[currencyFrom] / rates.current[currencyTo] ) * value;
    
    setToPrice(value)
    setFromPrice(result.toFixed(3))
  }


  React.useEffect(() => {
    onChangeCurrencyFrom(priceFrom)
  },[currencyFrom])  

  React.useEffect(() => {
    onChangeCurrencyTo(priceTo)
  },[currencyTo])  



  return (
    <div className="App">
      <Block
        value={priceFrom}
        currency={currencyFrom}
        onChangeCurrency={setCurencyFrom}
        onChangeValue={onChangeCurrencyFrom} />

      <Block
        value={priceTo}
        currency={currencyTo}
        onChangeCurrency={setCurencyTo} 
        onChangeValue={onChangeCurrencyTo}
        />
    </div>
  );
}

export default App;
