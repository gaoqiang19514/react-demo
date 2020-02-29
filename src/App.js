import React, { useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:4000");

socket.on("chat message", msg => {
  console.log("chat message：", msg);
});

function App() {
  const [msg, setMsg] = useState("");

  const send = () => {
    socket.emit("chat message", msg);
  };

  return (
    <div className="App">
      <input type="text" value={msg} onChange={e => setMsg(e.target.value)} />
      <button type="button" onClick={send}>
        send
      </button>
    </div>
  );
}

export default App;
