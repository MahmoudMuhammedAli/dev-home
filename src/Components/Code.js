import React, { useState, useEffect } from "react";
import Editor from "./Editor";
import { Link } from "react-router-dom";
import "../styles/css/code.css";
export default function Code() {
  const [html, setHtml] = useState("<h1>Edit Me!</h1>");
  const [css, setCss] = useState(
    `
h1{
  color:red;
  text-align:center;
}
`
  );
  const [js, setJs] = useState(`document.body.style.background ="white"`);
  const [srcDoc, setSrcDoc] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <style>${css}</style>  
          </head>
          <body>
              ${html}
            <script>${js}</script>
          </body>
        </html>
      `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  return (
    <div className="code_view">
      <div className="section sec-1">
        <Editor name="HTML" language="xml" value={html} onChange={setHtml} />
        <Editor name="CSS" language="css" value={css} onChange={setCss} />
        <Editor name="JS" language="javascript" value={js} onChange={setJs} />
      </div>
      <div className="section">
        <iframe
          srcDoc={srcDoc}
          width="100%"
          height="100%"
          title="output"
          sandbox="allow-scripts"
          frameborder="0"
        />
      </div>
      <div className="backToChat">
        <Link to="/chats">Back To Chat</Link>
      </div>
    </div>
  );
}
