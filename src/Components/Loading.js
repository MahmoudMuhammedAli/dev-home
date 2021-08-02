import React from 'react'
import logo from "../assets/logo.svg";

export default function Loading() {
    return (
        <div className="loading_pic">
        <img src={logo} alt=""  />
        <h1>loading...</h1>
      </div>
    )
}
