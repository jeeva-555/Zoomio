import React from 'react'

function Oncalltoast({callee}) {
  return (
    <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 '>
        <p className="text-lg font-semibold text-white bg-red-600 px-10 py-10 rounded-3xl ">{callee} is oncall</p>
    </div>
  )
}

export default Oncalltoast