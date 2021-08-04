import React from "react";
import Editor from "./Editor";
import { Link } from "react-router-dom";
export default function Code() {
  return (
    <>
      <div className="section sec-1">
        <Editor language="html"/>
      </div>
      <div className="section">
        <iframe
          width="100%"
          height="100%"
          title="output"
          sandbox="allow-script"
          frameborder="0"
        />
      </div>
      <div className="backToChat">
        <Link to="/chats">Back To Chat</Link>
      </div>
    </>
  );
}
