import React from 'react'

const CounterBox = ({ title, value }) => {
  return (
    <div className="flex flex-col items-center w-[150px]">
      <h4 className="font-Roboto font-bold text-[30px] text-white p-3 bg-[#1c1c24] rounded-t-[10px] w-full text-center truncate">{value}</h4>
      <p className="font-Roboto font-normal text-[16px] text-[#808191] bg-[#28282e] rounded-b-[10px] px-3 py-2 w-full text-center">{title}</p>
    </div>
  )
}

export default CounterBox