import React, {useState} from "react";
import { useHistory } from "react-router-dom"
import { ChatEngine } from "react-chat-engine";
import { auth } from "../firebase";
import {useAuth} from "../contexts/AuthContext"
//styles
import "../styles/css/chats.css";

export default function Chats() {
  const history = useHistory()
  const [nav, setNav] = useState("Wanna Code?");
  const {user} = useAuth();

  function changeView(){
    nav==="Wanna Code?"? 
    setNav("back to chat"):setNav("Wanna Code?")
  }
  async function signOut() {
    await auth.signOut()
    history.push("/")
  }

  return (
    <div className="chats_view">
      <div className="navbar">
        <div className="logo">Deve Home</div>
        <div className="links">
          <div className="link code" onClick={changeView}>{nav}</div>
          <div className="link signOut" onClick={signOut}>Sign out</div>
        </div>
      </div>
      
      <ChatEngine
        height= "calc(100vh - 66px)"
        projectId="
        013128ed-bcd2-484a-8d74-0ade7cb2c318"
        userName="."
        userSecret="."
      />
      
    </div>
  );
}
