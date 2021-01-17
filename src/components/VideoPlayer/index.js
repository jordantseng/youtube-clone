import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const VideoPlayer = ({ onVideoPause }) => {
  const playerRef = useRef();
  const videoJsOptions = {
    fill: true,
    fluid: true,
    preload: 'auto',
    autoplay: false,
    sources: [
      {
        src:
          'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
        type: 'application/x-mpegURL',
      },
    ],
    controls: true,
  };

  useEffect(() => {
    const player = videojs(playerRef.current, videoJsOptions, () => {
      player.src();
      player.on('pause', onVideoPause);
    });

    return () => {
      player.dispose();
    };
  }, []);

  return (
    <div data-vjs-player>
      <video ref={playerRef} className='video-js vjs-16-9' playsInline />
    </div>
  );
};

export default VideoPlayer;
