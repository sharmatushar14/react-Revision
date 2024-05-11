import React, { useId } from 'react'

const InputBox = ({
    label,
    amount,
    onAmountChange,
    onCurrencyChange,
    currencyOptions = [],  //Empty in case of default
    selectCurrency="usd",  //"usd" in case of default
    amountDisable= false,
    currencyDisable=false,
    className=""
}) => {
    const amountInputId = useId()
    return (
        <div className={`bg-white p-3 rounded-lg text-sm flex ${className}`}>
            <div className="w-1/2">
                <label htmlFor={amountInputId}
                className="text-black/40 mb-2 inline-block">
                    {label}
                </label>
                <input
                    id={amountInputId}
                    className="outline-none w-full bg-transparent py-1.5"
                    type="number"
                    placeholder="Amount"
                    disabled={amountDisable}
                    value={amount}
                    onChange={(e)=> onAmountChange && onAmountChange(Number(e.target.value))}
                />
            </div>
            <div className="w-1/2 flex flex-wrap justify-end text-right">
                <p className="text-black/40 mb-2 w-full">Currency Type</p>
                <select
                    className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
                    value={selectCurrency}
                    onChange={(e)=> onCurrencyChange && onCurrencyChange(e.target.value)}
                    disabled={currencyDisable}
                >
                  {currencyOptions.map((curr)=>(
                    <option key={curr} value={curr}>
                        {curr}
                    </option>
                  ))}               
                </select>
            </div>
        </div>
    );
}

export default InputBox;

//Try to make a index.js in components folder only to import all the components there and export them and then import only the index.js file in other modules to get all the components from only 1 file that is index.js

//In case of confusion for the map() function
//{currencyOptions.map((curr) => {
//     return (
//         <option key={curr} value={curr}>
//             {curr}
//         </option>
//     );
// })}