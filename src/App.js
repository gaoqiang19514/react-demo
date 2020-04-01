import React from "react";
import axios from "axios";

async function send(formData) {
  const { data } = await axios.post("/upload?token=123", { file: formData });
  console.log("data", data);
}

function upload(file) {
  const formData = new FormData();

  if (!file || !file.size) {
    return;
  }

  formData.append("file", file);
  send(formData);
}

function onChange(e) {
  const { files } = e.target;
  const [file] = files;

  upload(file);
}

function App() {
  return (
    <div className="App">
      <input type="file" onChange={onChange} />
    </div>
  );
}

export default App;
