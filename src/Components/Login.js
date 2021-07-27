import React from "react";
import "../styles/css/login.css";
import circle from "../assets/circle.svg";
import chatter from "../assets/chatter.svg";
import Google from "../assets/Google.svg";
import firebase from "firebase/app";

import { auth } from "../firebase";
export default function Login() {
  return (
    <>
      <div className="logo">DEVE HOME</div>
      <div className="main">
        <div className="col_1">
          <div className="header_cont">
            <img src={circle} alt="" className="graphic" />

            <p className="header line-1">
              <span className="one">ONE</span> Room
              <p className="line-2">To Rule Them All</p>
            </p>
          </div>
          <div className="secondary">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="71"
                viewBox="0 0 13 71"
              >
                <path
                  id="Rectangle_1"
                  data-name="Rectangle 1"
                  d="M6,0h6a1,1,0,0,1,1,1V70a1,1,0,0,1-1,1H7a7,7,0,0,1-7-7V6A6,6,0,0,1,6,0Z"
                  fill="#ec615b"
                />
              </svg>
            </span>

            <span>
              <p className="sec_text">
                log in with one click and enjoy chatting with everybody
              </p>
            </span>
          </div>
        </div>

        <div className="col_2">
          <img src={chatter} alt="" />
        </div>
      </div>
      <button
        onClick={() =>
          auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
        }
        className="login"
      >
        LOGIN WITH GOOGLE
        <img src={Google} alt="" className="google" />
      </button>
      <marquee behavior="alternate" scrollamount="5">
        DEVE HOME
      </marquee>
    </>
  );
}
