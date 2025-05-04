import React, { useRef, useState } from 'react'
import { getUserMediaStream, getuserscreenstream } from '../peermodules/getusermedia';


function Controllers({currentstreamref,callref,setoncall,myvideoref,remotevideoref}) {

  const [ismicon,setismicon] = useState(true);
  const [iscamon,setiscamon] = useState(true);
  const[isscreenshareenable,setisscreenshareenable] = useState(false);
  const screentrackref = useRef(null);
  const  [isspeakeron,setisspeakeron] = useState(true);

  
  const togglemic=()=>{
    if(ismicon){
      currentstreamref.current.getAudioTracks()[0].enabled=false;
      setismicon(prev=>!prev);
      return
    } 

    currentstreamref.current.getAudioTracks()[0].enabled=true;
    setismicon(prev=>!prev);

  }


  const togglecamera=()=>{
    if(iscamon){
      currentstreamref.current.getVideoTracks()[0].enabled=false;
      setiscamon(prev=>!prev);
      return
    } 

    currentstreamref.current.getVideoTracks()[0].enabled=true;
    setiscamon(prev=>!prev);

  };


  const endcall = ()=>{


    if(callref.current){
      callref.current.close();
      callref.current= null;
    }
    
    currentstreamref.current.getTracks().forEach(track => track.stop());
    currentstreamref.current = null;
    setoncall(false)
  };


  const screenshare = async () => {
    const sender = callref.current.peerConnection
      .getSenders()
      .find(s => s.track.kind === 'video');
  
    
      const screenstream = await navigator.mediaDevices.getDisplayMedia({ video: true , audio: false });
      const screentrack = screenstream.getVideoTracks()[0];  
      screentrackref.current = screentrack; 
      if (sender) sender.replaceTrack(screentrack);
     
      myvideoref.current.srcObject = screenstream;
      myvideoref.current.play();
      setisscreenshareenable(true);
      
      currentstreamref.current.srcObject = screenstream;

      screentrack.onended=async()=>{
        const stream = await getUserMediaStream(currentstreamref,myvideoref);
        const vidtrack = stream.getVideoTracks()[0];
        sender.replaceTrack(vidtrack);
       
        myvideoref.current.srcObject = stream;
        myvideoref.current.play();
        setisscreenshareenable(false);
       
        currentstreamref.current.srcObject=stream;
      

  
    } 

   
    
  };



  const volume = ()=>{
    if(isspeakeron){
      remotevideoref.current.muted = true;
      setisspeakeron(false);
      return
    }
    remotevideoref.current.muted = false;
    setisspeakeron(true);
  }
  





    
  return (
    <div className='flex items-center justify-around h-auto md:h-[15vh]  w-full px-4 py-4  bg-[#434660]'>
    

    <div className='px-2 py-2 border-white rounded-2xl border-1 hover:bg-orange-600'>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6
      hover:bg-orange-600 text-[#FE9A01] hover:text-white"
      onClick={togglemic}>
         {!ismicon && <path d="M2 2L22 22" stroke="currentColor" strokeWidth="2" /> }
          <path d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z" />
          <path d="M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.751 6.751 0 0 1-6 6.709v2.291h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-2.291a6.751 6.751 0 0 1-6-6.709v-1.5A.75.75 0 0 1 6 10.5Z" />
      </svg>
    </div>
    



    <div className='px-2 py-2 border-white rounded-2xl border-1 hover:bg-orange-600'>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6
     hover:bg-orange-600 text-[#FE9A01] hover:text-white"  onClick={togglecamera}>
       {!iscamon && <path d="M2 2L22 22" stroke="currentColor" strokeWidth="2" /> }
  <path d="M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h8.25a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3H4.5ZM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06Z" />
</svg>

    </div>


    <button className='px-4 py-2 bg-red-600 text-white capitalize font-medium rounded-2xl
    hover:bg-red-700 hover:scale-3d' onClick={endcall}>End call</button>

    
    <div className='px-2 py-2 border-white rounded-2xl border-1 hover:bg-orange-600 '>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6
     hover:bg-orange-600 text-[#FE9A01] hover:text-white " onClick={screenshare}>
      
  <path d="M6 3a3 3 0 0 0-3 3v1.5a.75.75 0 0 0 1.5 0V6A1.5 1.5 0 0 1 6 4.5h1.5a.75.75 0 0 0 0-1.5H6ZM16.5 3a.75.75 0 0 0 0 1.5H18A1.5 1.5 0 0 1 19.5 6v1.5a.75.75 0 0 0 1.5 0V6a3 3 0 0 0-3-3h-1.5ZM12 8.25a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5ZM4.5 16.5a.75.75 0 0 0-1.5 0V18a3 3 0 0 0 3 3h1.5a.75.75 0 0 0 0-1.5H6A1.5 1.5 0 0 1 4.5 18v-1.5ZM21 16.5a.75.75 0 0 0-1.5 0V18a1.5 1.5 0 0 1-1.5 1.5h-1.5a.75.75 0 0 0 0 1.5H18a3 3 0 0 0 3-3v-1.5Z" />
</svg>


    </div>





    <div className='px-2 py-2 border-white rounded-2xl border-1 hover:bg-orange-600'>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6
     hover:bg-orange-600 text-[#FE9A01] hover:text-white" onClick={volume}>
       {!isspeakeron && <path d="M2 2L22 22" stroke="currentColor" strokeWidth="2" /> }
  <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.584 5.106a.75.75 0 0 1 1.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 0 1-1.06-1.06 8.25 8.25 0 0 0 0-11.668.75.75 0 0 1 0-1.06Z" />
  <path d="M15.932 7.757a.75.75 0 0 1 1.061 0 6 6 0 0 1 0 8.486.75.75 0 0 1-1.06-1.061 4.5 4.5 0 0 0 0-6.364.75.75 0 0 1 0-1.06Z" />
</svg>



    </div>





    </div>
  )
}

export default Controllers