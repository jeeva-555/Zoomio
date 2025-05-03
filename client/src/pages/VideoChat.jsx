import React, { useEffect, useRef, useState } from 'react'
import Videos from '../components/Videos';
import Userspanel from '../components/Userspanel';
import {io} from "socket.io-client"
import Peer from 'peerjs';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getUserMediaStream } from '../peermodules/getusermedia';
import Toast from './Toast';
import RejectToast from '../components/RejectToast';
import Oncalltoast from '../components/Oncalltoast';
import Chat from '../components/Chat';

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
  const [calleeguy,setcalleeguy] = useState("someone");
  const callersocketid = useRef(null);
  const [rejecttoast,setrejecttoast] = useState(false);
  const[oncalltoast,setoncalltoast] = useState(false);

  useEffect(()=>{



    if(!UserName) return navigate("/")

     socket.current = io("http://localhost:8008");

     socket.current.on("myid",(id)=>SocketId.current=id);

     peer.current = new Peer();
     
         peer.current.on('open', (id) => {
           console.log('My peer ID is:', id);
           PeerId.current = id;
           socket.current.emit("NewUser",{PeerId:id,SocketId : SocketId.current,UserName,roomid});
         });

     socket.current.on("Updateusers",(users)=>{
      console.log(users);
      setParticipants(users)});

      socket.current.on("caller-info",data=>{
        callersocketid.current=data.fromsocketid;
      
        setcallerguy(data.from);
      });

      socket.current.on("callee-reject",from=>{
        setrejecttoast(true);
        setcalleeguy(from);
        setTimeout(() => {
          setrejecttoast(false);
        },5000);
        setoncall(false)
      });

     

      peer.current.on ("call",async(call)=>{
       callref.current = call;
       setincomingcall(true);
        
      });
    

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

        if (peer.current) {
          peer.current.destroy();
        }

        if (socket.current) {
          socket.current.disconnect();
        }
     }
  },[]);


  


  const call = async(peerid,socketid)=>{
    if(oncall) return alert("he's on a call please try after sometime")
      const stream = await getUserMediaStream(currentstreamref,myvideoref);
      socket.current.emit("caller",{from : UserName,fromsocketid:SocketId.current,to : socketid});
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
    socket.current.emit("call-rejected",{to:callersocketid.current,from:UserName});
    console.log(callersocketid.current);
  }




  return (
    <div className='flex items-center  h-screen  bg-[#151C23]'>
      <Userspanel UserName={UserName} Participants={Participants} oncall={oncall} call={call}/>
      <Videos  myvideoref={myvideoref} setoncall={setoncall} remotevideoref={remotevideoref} currentstreamref={currentstreamref} callref={callref}/>
      {incomingcall && <Toast reject={reject} answer={answer} caller={callerguy}/> }
      {rejecttoast && <RejectToast callee={calleeguy}/>}
      <Chat UserName={UserName} socket={socket}/>
    </div>
  )
}

export default VideoChat