import React from 'react'

const Button = ({btnText, onClickFn}) => {
  return (
    <button className='px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 transition duration-200 cursor-pointer' onClick={onClickFn}>{btnText}</button>
  )
}

export default Button