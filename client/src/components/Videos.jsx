import React from 'react'
import Controllers from './Controllers';

function Videos(props) {
    const{myvideoref,remotevideoref} = props;
  return (

    <div>
         <div className='relative'>
        <video ref={myvideoref} width="160" height="120" muted className='absolute bottom-0 right-0 border-2 border-b-black
          ' autoPlay />
        <video ref={remotevideoref} width="750"  autoPlay muted className='
         border-2 boreder-b-black ' controls />

    </div>
    

        <Controllers/>

    
    </div>
   

    
  )
}

export default Videos