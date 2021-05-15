import React, { useEffect } from 'react';

import './App.css';

window.onClick = () => {
  const audio = document.getElementById('audio');
  const playBtn = document.getElementById('play-btn');

  playBtn.disabled = true;

  const onPlay = () => {
    playBtn.classList.add('active');
  };

  const onEnded = () => {
    playBtn.disabled = false;
    playBtn.classList.remove('active');

    audio.removeEventListener('play', onPlay);
    audio.removeEventListener('ended', onEnded);
  };

  audio.addEventListener('play', onPlay);
  audio.addEventListener('ended', onEnded);

  audio.play();
};

function createAudio() {
  return `<div>
  <div id="play-btn" class="play-btn" onClick="onClick()"></div>
  <audio id="audio" src="https://szzhcg.com/zhzf/file/hy-public/2021/05/13/16/888d512762404bfa8267d9b3d60f5607.wav"  />
  </div>`;
}

function App() {
  useEffect(() => {
    const html = createAudio();
    document.getElementById('container').innerHTML = html;
  }, []);
  return (
    <div className="App">
      <div id="container" />
    </div>
  );
}

export default App;
