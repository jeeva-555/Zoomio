import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';

function SignUp(props) {


    const {setUserName,UserName} = props;
    const navigate = useNavigate();

    const handlenavigate = (endpoint)=>{
        if(!UserName) return alert("you need a username to enter");
        if(UserName.length>10 || UserName.length<4) return alert("username length should be from 4 to 10 characters in range")
        navigate(endpoint);
    }

    const handleOnchange = (e)=>{
          setUserName(e.target.value)
    }
  return (
    <div>
        <Navbar/>
        <div className='flex justify-center items-center h-[calc(100vh-140px)] bg-[#151C23]  container-7xl'>

<div className='flex flex-col gap-4 p-10 bg-[#212B37] justify-center items-center w-full max-w-[500px] py-15 rounded-3xl'>
 
    <input type="text" className=' w-full px-4 py-4
    bg-white outline-0 font-bold text-center text-black capitalize' placeholder='enter your name'
    onChange={handleOnchange} value={UserName}/>
    <button className='px-2 py-4 w-full text-orange-600 bg-[#151C23] font-medium
    hover:bg-orange-600 hover:text-white'
    onClick={()=>handlenavigate("/join-room")}>Join Room</button>
    <button 
    className='w-full px-2 py-4 text-orange-600 bg-[#151C23] font-medium
    hover:bg-orange-600 hover:text-white '
    onClick={()=>handlenavigate("/create-room")}>
        Create Room
    </button>
</div>


</div>
    </div>
   
  )
}

export default SignUp