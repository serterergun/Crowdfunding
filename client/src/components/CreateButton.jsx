import React from 'react'

const CreateButton = ({ btnType, title, handleClick, styles }) => {
  return (
    <button
      type={btnType}
      className={`font-Roboto font-semibold text-[16px] leading-[26px] text-[#ffffff] min-h-[52px] px-4 rounded-[10px] ${styles}`}
      onClick={handleClick}
    >
      {title}
    </button>
  )
}

export default CreateButton