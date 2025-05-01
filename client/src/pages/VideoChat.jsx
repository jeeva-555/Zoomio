import React, { useEffect, useRef, useState } from 'react'
import Videos from '../components/Videos';
import Userspanel from '../components/Userspanel';
import {io} from "socket.io-client"
import Peer from 'peerjs';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getUserMediaStream } from '../peermodules/getusermedia';
import Toast from './Toast';

function VideoChat(props) {


  const {UserName,setUserName} = props;
  const navigate = useNavigate()
  const myvideoref = useRef(null);
  const remotevideoref = useRef(null);
  const currentstreamref = useRef(null);
  const socket = useRef();
  const peer = useRef();
  const SocketId = useRef();
  const PeerId = useRef();
  const { roomid } = useParams();
  const [Participants,setParticipants] = useState([]);
  const[oncall,setoncall] = useState(false);
  const [incomingcall,setincomingcall] = useState(false);
  const callref = useRef(null);
  const [callerguy,setcallerguy] = useState("someone");


  useEffect(()=>{



    if(!UserName) return navigate("/")

     socket.current = io("http://localhost:8008");

     socket.current.on("myid",(id)=>SocketId.current=id);

     peer.current = new Peer();
     
         peer.current.on('open', (id) => {
           console.log('My peer ID is:', id);
           PeerId.current;
           socket.current.emit("NewUser",{PeerId:id,SocketId : SocketId.current,UserName,roomid});
         });

     socket.current.on("Updateusers",(users)=>{
      console.log(users);
      setParticipants(users)});

      socket.current.on("caller-info",from=>{
        setcallerguy(from);
      })

      peer.current.on ("call",async(call)=>{
       callref.current = call;
       setincomingcall(true)
        
      })
    

    //  navigator.mediaDevices.getUserMedia({video:true,audio:true})
    //  .then(stream=>{
    //   currentstreamref.current = stream
    //   myvideoref.current.srcObject = stream;
    //   remotevideoref.current.srcObject = stream;
    //  })

     return ()=>{
        if(currentstreamref.current){
          currentstreamref.current.getTracks().forEach(track=> {
            track.stop();
          });
        }
     }
  },[]);


  


  const call = async(peerid,socketid)=>{
      const stream = await getUserMediaStream(currentstreamref,myvideoref);
      socket.current.emit("caller",{from : UserName,to : socketid});
      const call = peer.current.call(peerid,stream);
      setoncall(true);
      call.on("stream",stream=>remotevideoref.current.srcObject=stream);
  };


  const answer = async()=>{
    setincomingcall(false)
    const stream = await getUserMediaStream(currentstreamref,myvideoref);
    callref.current.answer(stream);
        setoncall(true);
        callref.current.on("stream",stream=>remotevideoref.current.srcObject=stream);
  }


  const reject = ()=>{
    callref.current.close();
    callref.current= null;
    setincomingcall(false);
    
  }




  return (
    <div className='flex  h-screen  bg-[#151C23]'>
      <Userspanel UserName={UserName} Participants={Participants} oncall={oncall} call={call}/>
      <Videos myvideoref={myvideoref} remotevideoref={remotevideoref}/>
      {incomingcall && <Toast reject={reject} answer={answer} caller={callerguy}/> }
    </div>
  )
}

export default VideoChat