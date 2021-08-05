import React, { useState } from "react";
import "../styles/css/editor.css";
import { Controlled as TextEditor } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/ayu-mirage.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/css/css";
import "codemirror/mode/javascript/javascript";

import Expand from "../assets/expand.svg";
import Collapse from "../assets/collapse.svg";

export default function Editor(props) {
  const [collapsed, setCollapsed] = useState(false);
  const { name ,language , value, onChange } = props;

  const size = () => {
    setCollapsed(!collapsed);
  };

  function handleChange(editor, data, value) {
    onChange(value)
  }

  return (
    <div className="editor_cont">
      <div className="editor_header">
        <div className="title">{name}</div>
        <div className="img_cont" onClick={size}>
          {collapsed ? (
            <img title="expand" src={Expand} alt="<->" />
          ) : (
            <img title="collapse" src={Collapse} alt="-><-" />
          )}
        </div>
      </div>
      <TextEditor
        onBeforeChange={handleChange}
        value={value}
        className="code-mirror-wrapper"
        options={{
          lineWrapping: true,
          lint: true,
          mode: language,
          theme: "ayu-mirage",
          lineNumbers: true,
        }}
      />
    </div>
  );
}
