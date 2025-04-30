import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {v4 as uuid} from "uuid"
import Navbar from '../components/Navbar';

function CreateRoom(props) {

const Navigate = useNavigate();
const [RoomId,setRoomId] = useState("");
const[IsCopied,setIsCopied] = useState(false);
const{UserName} = props;


const handleOnClick = ()=>{
  if(!RoomId)return alert("please generate roomid")
  Navigate(`/videochat/${RoomId}`)
}



const GeneratorRex = ()=>{
     let roomId = uuid();
     roomId = roomId.length>10?roomId.substring(0,10):roomId;
     setRoomId(roomId);
}

const copyroomid = async()=>{
    await navigator.clipboard.writeText(RoomId);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 5000); 
}


  return (

    <div>
        <Navbar/>
        <div  className='flex flex-col justify-center items-center h-[calc(100vh-140px)] bg-[#151C23]  container-7xl'>
        

        <p className='text-white capitalize font-bold text-5xl text-center pb-4'>Welcome <span className='text-orange-600'>{UserName}</span></p>

           <div className='flex flex-col gap-4 p-10 bg-[#212B37] justify-center items-center w-full max-w-[500px] py-15 rounded-3xl'>
          
          
            <div className=' w-full px-4 py-4
            bg-white  font-bold text-center text-black capitalize flex justify-between'>
                <input type="text" className='outline-0' value={RoomId}
                onChange={(e)=>setRoomId(e.target.value)}
                />

                <div className='relative'>
                {IsCopied &&<p className=' text-green-400 absolute top-[-50px] '>copied</p>}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
                strokeWidth={1.5} stroke="currentColor" className="size-6 hover:text-orange-600"
                onClick ={copyroomid}>
                <path strokeLinecap="round" 
                strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                </svg>
                </div>
                

            </div>

            
            <button 
            className='w-full px-2 py-4 text-orange-600 bg-[#151C23] font-medium
            hover:bg-orange-600 hover:text-white '
            onClick={GeneratorRex}
            >
                Generate Roomid
            </button> 

            
            <button 
            className='w-full px-2 py-4 text-orange-600 bg-[#151C23] font-medium
            hover:bg-orange-600 hover:text-white capitalize'
            onClick={handleOnClick}
            >
                join new room
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

export default CreateRoom