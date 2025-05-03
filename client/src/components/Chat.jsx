import React, { useState } from 'react'
import dateFormat from "dateformat"
import { useParams } from 'react-router-dom';

function Chat(props) {


  const {UserName,socket,roomId} = props;
  const [Message,setMessage] = useState("");
  const[Messages,setMessages] = useState([]);
  const { roomid } = useParams();

  const sentmessage = ()=>{
    const Time = ()=>{
      const now = new Date();
      return dateFormat(now, "h:MM TT");
    }
    socket.current.emit("message",{username:UserName,message:Message,time:Time,roomid});
  };

  socket.current.on("messages",message=>{
    setMessages([...Messages,message])
  }
  )

 

  



  return (
        <div className='h-screen flex flex-col  w-[25vw] bg-[#1A191C]'>
          <p className='w-full px-3 py-3 bg-[#42475E] text-center text-white font-medium text-2xl'>chat</p>


            <div className='h-full flex flex-col gap-2 px-2 py-2 '>
              <div className="px-2 py-2  bg-[#42475E]  text-white w-4/5 capitalize">
                <div className='flex mb-3 justify-between text-xs'>
                  <p>jeeva</p>
                  <p>{ date()}</p>
                </div>
                <p className='text-sm'>this is jeeva welcome tothe chat and thanks for joining my video chat applcation
                </p>
              </div>
              <div className='px-2 py-2 bg-[#FE9A01] ml-auto text-white w-4/5 capitalize'>
              <div className='flex mb-3 justify-between text-xs'>
                  <p>jeeva</p>
                  <p>{ date()}</p>
                </div>
                <p className='text-sm'>this is jeeva welcome tothe chat and thanks for joining my video chat applcation
                </p>
              </div>
            </div>




          <div className='flex items-center justify-between mt-auto px-2 gap-2  py-4'>

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="hover:text-orange-600 text-[#FE9A01] size-8 ">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
</svg>

            <textarea onChange={(e)=>setMessage(e.target.value)} className='bg-[#434660] font-normal  w-full outline-0 text-white pt-2 rounded-2xl px-2 overflow-hidden' />


            <svg xmlns="http://www.w3.org/2000/svg" onClick={sentmessage} viewBox="0 0 24 24" fill="currentColor" className="size-8 text-[#FE9A01] hover:text-orange-600">
  <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
</svg>

          </div>
        </div>
    
  )
}

export default Chat