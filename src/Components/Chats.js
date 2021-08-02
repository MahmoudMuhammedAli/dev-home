import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
//styles
import "../styles/css/chats.css";
import axios from "axios";

export default function Chats() {
  const history = useHistory();
  const [nav, setNav] = useState("Wanna Code?");
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  //get user's avatar
  const getFile = async (url) => {
    const response = await fetch(url);
    //use blob to transfer the image in binary formate
    const date = await response.blob();

    return new File([date], "userPhoto.jpg", { type: "image/jpeg" });
  };
  console.log(user); 
  useEffect(() => {
    // prevent the user from accessing the chat with out login
    if (!user) {
      history.push("/");
      return;
    }
    // fetch the users api
    //signIn if you have chatEngine profile
    axios
      .get("https://api.chatengine.io/users/me/", {
       
        headers: {
          "project-id": "013128ed-bcd2-484a-8d74-0ade7cb2c318",
          "user-name": user.email,
          "user-secret": user.uid,
        },
      })
      .then(() => { 
        setLoading(false);
      })
      //create a profile if you don't have one
      .catch(() => {
        let Data = new FormData();
        Data.append("email", user.email);
        Data.append("username", user.displayName);
        Data.append("secret", user.uid);

        getFile(user.photoURL).then((avatar) => {
          Data.append("avatar", avatar, avatar.name);
          axios.post("https://api.chatengine.io/users", Data, {
            headers: { "private-key": "899a3cba-2a68-400c-b81e-051de9a65241" },
          })
          .then(() => setLoading(false))
          .catch((error) => console.log(error))
        });
      });
  }, [user, history]);

  function changeView() {
    nav === "Wanna Code?" ? setNav("back to chat") : setNav("Wanna Code?");
  }
  async function signOut() {
    await auth.signOut();
    history.push("/");
  }

  //because there is no user once the page loads 
  if(!user || loading)  
  return (
    <h1 className="loading"> loading...</h1>
    )
  
  return (
    <div className="chats_view">
      <div className="navbar">
        <div className="logo">Deve Home</div>
        <div className="links">
          <div className="link code" onClick={changeView}>
            {nav}
          </div>
          <div className="link signOut" onClick={signOut}>
            Sign out
          </div>
        </div>
      </div>

      <ChatEngine
        height="calc(100vh - 66px)"
        projectID="
        013128ed-bcd2-484a-8d74-0ade7cb2c318"
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
}
