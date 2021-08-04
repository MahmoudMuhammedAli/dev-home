import React, { useState } from "react";
import "../styles/css/editor.css";
import { Controlled as ControlledEditor } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/css/css";
import "codemirror/mode/javascript/javascript";

import Expand from "../assets/expand.svg";
import Collapse from "../assets/collapse.svg";

export default function Editor(props) {
  const [collapsed, setCollapsed] = useState(false);
  const { language } = props;

  const size = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="editor_cont">
      <div className="editor_header">
        <div className="title">{language}</div>
        <div className="img_cont" onClick={size}>
          {collapsed ? (
            <img src={Expand} alt="<->" />
          ) : (
            <img src={Collapse} alt="-><-" />
          )}
        </div>
      </div>
    </div>
  );
}
