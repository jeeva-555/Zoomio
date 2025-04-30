import React from 'react'

function Userspanel() {



    const users = ["jeeva","sankar","babu","rasapa"]
  return (
    <div className='w-1/6 h-screen bg-[#151C23]'>
        {users.map((user,ind)=>{
            return(
                <div key={ind} className='flex justify-around px-2 py-4'>
                    <p className='text-white font-medium'>{user}</p>
                    <button className='text-white'>call</button>
                </div>
            )
        })}
    </div>
  )
}

export default Userspanel