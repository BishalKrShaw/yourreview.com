import React from 'react'

const Button = ({btnText, onClickFn}) => {
  return (
    <button className='font-semibold bg-black text-white rounded px-5 py-2 cursor-pointer' onClick={onClickFn}>{btnText}</button>
  )
}

export default Button