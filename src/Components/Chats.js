import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import Loading from "./Loading"
//styles
import "../styles/css/chats.css";

//dependencies
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
          "project-id": process.env.REACT_APP_CHAT_ENGINE_ID,
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
        Data.append("username", user.email);
        Data.append("secret", user.uid);

        getFile(user.photoURL).then((avatar) => {
          Data.append("avatar", avatar, avatar.name);
          axios
            .post("https://api.chatengine.io/users", Data, {
              headers: {
                "private-key": process.env.REACT_APP_CHAT_ENGINE_KEY,
              },
            })
            .then(() => setLoading(false))
            .catch((error) => console.log(error));
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
  if (!user || loading)
    return (
      <Loading/>
    );

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
        projectID={ process.env.REACT_APP_CHAT_ENGINE_ID}
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
}
