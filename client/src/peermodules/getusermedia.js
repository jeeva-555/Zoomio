

export const getUserMediaStream = async (streamRef,myVideoRef) => {
    if (streamRef.current) return streamRef.current;

    
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      streamRef.current = stream;
      myVideoRef.current.srcObject = stream;
      myVideoRef.current.play();
      return stream;
    
  };


  export const getuserscreenstream = async()=>{
    const screenstream = await navigator.mediaDevices.getDisplayMedia({ video: true , audio: true });
    return screenstream;
  }