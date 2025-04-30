import React, { useState } from 'react'
import {Routes,Route} from "react-router-dom"
import SignUp from './pages/SignUp'
import CreateRoom from './pages/CreateRoom'
import JoinRoom from './pages/JoinRoom'
import VideoChat from './pages/VideoChat'


const App = () => {

  const [UserName,setUserName] = useState("")
  return (
    <div >
      {/* <Navbar/> */}
      <Routes>
          <Route path='/' element={<SignUp  setUserName = {setUserName} UserName={UserName}/>}/>
          <Route path='/create-room' element={<CreateRoom UserName={UserName}/>}/>
          <Route path='/join-room' element={<JoinRoom UserName={UserName}/>}/>
          <Route path='/videochat/:roomid' element={<VideoChat UserName={UserName}/>}/>
      </Routes>
    </div>
  )
}

export default App