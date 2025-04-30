import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';

function JoinRoom(props) {


    const {UserName} = props
    const Navigate = useNavigate();
    const[RoomId,setRoomId] = useState("");

    const paste = async()=>{
      const roomid = await navigator.clipboard.readText() ;
      setRoomId(roomid);
    }


    const handleOnClick = ()=>{
        if(!RoomId)return alert("please enter roomid")
        Navigate(`/videochat/${RoomId}`)
    }

    const handleOnchange = (e)=>{setRoomId(e.target.value)}
  return (



    <div>
      <Navbar/>
            <div className='flex flex-col justify-center items-center h-[calc(100vh-140px)] bg-[#151C23]  container-7xl'>

      <p className='text-white capitalize font-bold text-5xl text-center pb-4'>Welcome <span className='text-orange-600'>{UserName}</span></p>


      <div className='flex flex-col gap-4 p-10 bg-[#212B37] justify-center items-center w-full max-w-[500px] py-15 rounded-3xl'>

      <div className='w-full px-4 py-4
      bg-white font-bold text-center text-black capitalize flex justify-between'>
        <input type="text" className='outline-0 ' placeholder='enter your roomid'
      onChange={handleOnchange} value={RoomId}/>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
      strokeWidth={1.5} stroke="currentColor" className="size-6 hover:text-orange-600"
      onClick={paste}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z" />
      </svg>

      </div>


      <button 
      className='w-full px-2 py-4 text-orange-600 bg-[#151C23] font-medium
      hover:bg-orange-600 hover:text-white '
      onClick={handleOnClick}>
          Join Room
      </button> 
      <button 
      className='w-full px-2 py-4 text-orange-600 bg-[#151C23] font-medium
      hover:bg-orange-600 hover:text-white '
      onClick={()=>Navigate('/')}>
          Back
      </button> 
      </div>
      </div>
    </div>
   
  )
}

export default JoinRoom