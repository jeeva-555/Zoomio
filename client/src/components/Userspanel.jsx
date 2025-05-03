import React from 'react'
import { useParams } from 'react-router-dom'

function Userspanel({UserName,Participants,call,oncall}) {



    const {roomid} = useParams();
  return (
    <div className='w-[15vw] h-screen bg-[#151C23] flex flex-col'>

        <h1 className='px-4 py-2 text-2xl text-center font-semibold mb-1 capitalize bg-[#42475E] text-white'>
            
            participants</h1>
        {Participants.map((user,ind)=>{
           return(
                <div key={ind} className='flex mx-2 justify-around px-2 py-2 rounded-full bg-white my-1'>
                    <p className='text-black font-medium capitalize'>{user.username}</p>
                    {user.username!=UserName && <button 
                    className='text-white px-3 hover:bg-green-500  rounded-full bg-green-500'
                    onClick={()=>call(user.peerid,user.socketid)}>{oncall?"on":""}call</button>}
                          
                </div>
        )
        })}

        <p className='mt-auto text-center bg-orange-600 px-2 py-2 text-white font-medium'>roomid : {roomid}</p>
    </div>
  )
}

export default Userspanel