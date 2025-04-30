import React, { useEffect, useRef } from 'react'
import Videos from '../components/Videos';
import Userspanel from '../components/Userspanel';


function VideoChat() {


  const myvideoref = useRef(null);
  const remotevideoref = useRef(null);
  const currentstreamref = useRef(null);


  useEffect(()=>{
    
     navigator.mediaDevices.getUserMedia({video:true,audio:true})
     .then(stream=>{
      currentstreamref.current = stream
      myvideoref.current.srcObject = stream;
      remotevideoref.current.srcObject = stream;
     })

     return ()=>{
        if(currentstreamref.current){
          currentstreamref.current.getTracks().forEach(track=> {
            track.stop();
          });
        }
     }
  },[])





  return (
    <div className='flex  h-screen  bg-[#151C23]'>
      <Userspanel/>
      <Videos myvideoref={myvideoref} remotevideoref={remotevideoref}/>
    </div>
  )
}

export default VideoChat