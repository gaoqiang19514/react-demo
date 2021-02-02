import React, { useEffect } from "react";
import Plyr from "plyr";
import "plyr/dist/plyr.css";

import "./styles.css";

function Player() {
  useEffect(() => {
    window.player = new Plyr("#player", {
      controls: [
        "play-large",
        "play",
        "progress",
        "current-time",
        "captions",
        "fullscreen",
      ],
      hideControls: false,
      fullscreen: {
        enabled: true,
        fallback: true,
        iosNative: false,
        container: "#container",
      },
    });

    window.player.on("exitfullscreen", () => {
      window.player.pause();
    });
  }, []);

  const onClick = () => {
    window.player.play();
    window.player.fullscreen.enter();
  };

  return (
    <>
      <div className="video-box">
        <video id="player" data-poster="/path/to/poster.jpg">
          <source
            src="https://cgzf-1257892252.cos.ap-chengdu.myqcloud.com/2021/01/29/11/e54d3f05000846a6888c4839c79acfc3.mp4"
            type="video/mp4"
          />
        </video>
      </div>
      <button onClick={onClick}>flv paly</button>
    </>
  );
}

export default Player;
