import React from 'react'
import Controllers from './Controllers';

function Videos(props) {
    const{myvideoref,remotevideoref,currentstreamref,callref,setoncall} = props;
  return (

    <div className='h-screen  w-[60vw]'>
      
    <div className='relative'>
        <video ref={myvideoref} width="160" height="120" muted className='absolute bottom-0 right-0 border-2 border-b-black
          ' autoPlay />
        <video ref={remotevideoref}    autoPlay  className='
         h-[85vh] border-2 boreder-b-black w-full object-cover' playsInline controls />

    </div>
    

        <Controllers currentstreamref={currentstreamref} myvideoref={myvideoref} setoncall={setoncall} callref={callref}/>

    
    </div>
   

    
  )
}

export default Videos