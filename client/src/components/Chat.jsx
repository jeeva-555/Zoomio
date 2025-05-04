import React, { useEffect, useState } from 'react';
import dateFormat from "dateformat";
import { useParams } from 'react-router-dom';

function Chat(props) {
  const { UserName, socket } = props;
  const [Message, setMessage] = useState("");
  const [Messages, setMessages] = useState([]);
  const { roomid } = useParams();

  useEffect(() => {
    if (!socket) return;
    
    alert("ready to chat");
    const handleIncomingMessage = (message) => {
      setMessages(prev => [...prev, message]);
      console.log(Messages)
    };

    socket.on("messages", handleIncomingMessage);

    return () => {
      socket.off("messages", handleIncomingMessage);
    };
  }, [socket]);

  const sendMessage = () => {
    const now = new Date();
    const time = dateFormat(now, "h:MM TT");
    
    if(!Message) return
    socket.emit("message", {
      username: UserName,
      message: Message,
      time,
      roomid
    });

    setMessage(""); 
  };

  return (
    <div className='md:h-screen h-[80vh] flex flex-col w-full md:w-[25vw] bg-[#1A191C]'>
      <p className='w-full px-3 py-3 bg-[#42475E] text-center text-white font-medium text-2xl'>chat</p>

      <div className='h-full flex flex-col gap-4 px-2 py-2 overflow-auto'>
        {Messages.map((message, ind) => (
          <div
            key={ind}
            className={`px-2 py-2 ${message.username === UserName ? "bg-[#FE9A01] ml-auto" : "bg-[#42475E]"} text-white w-4/5 capitalize`}
          >
            <div className='flex mb-3 justify-between text-xs'>
              <p>{message.username}</p>
              <p>{message.time}</p>
            </div>
            <p className='text-sm'>{message.message}</p>
          </div>
        ))}
      </div>

      <div className='flex items-center justify-between mt-auto px-2 gap-2 py-4'>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="hover:text-orange-600 text-[#FE9A01] size-8"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
        </svg>

        <textarea
          onChange={(e) => setMessage(e.target.value)}
          value={Message}
          className='bg-[#434660] font-normal w-full outline-0 text-white pt-2 rounded-2xl px-2 overflow-hidden'
        />

        <svg
          xmlns="http://www.w3.org/2000/svg"
          onClick={sendMessage}
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-8 text-[#FE9A01] hover:text-orange-600"
        >
          <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
        </svg>
      </div>
    </div>
  );
}

export default Chat;
