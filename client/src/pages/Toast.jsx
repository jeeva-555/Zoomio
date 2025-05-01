import React from 'react'

function Toast({answer,caller,reject}) {
  return (
    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
      <div className="flex flex-col w-fit px-10 py-5  bg-black gap-2  rounded-2xl">
    <p className="text-lg font-semibold text-white mb-2">{caller} is calling...</p>

    <div className='flex gap-2'>
        <button
            onClick={()=>reject()}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
            Reject
        </button>
        <button
            onClick={()=>answer()}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
            Answer
        </button>
    </div>
    </div>
    </div>
  )
}

export default Toast