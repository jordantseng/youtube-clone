import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const VideoPlayer = ({ eventON }) => {
  const options = {
    fill: true,
    fluid: true,
    preload: 'auto',
    html5: {
      hls: {
        enableLowInitialPlaylist: true,
        smoothQualityChange: true,
        overrideNative: true,
      },
    },
  };
  const playerRef = useRef();

  useEffect(() => {
    const player = videojs(
      playerRef.current,
      {
        autoplay: true,
        sources: [
          {
            src:
              'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
            type: 'application/x-mpegURL',
          },
        ],
        controls: true,
        ...options,
      },
      () => {
        player.src();
      }
    );

    player.on('pause', eventON.pause);

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

// import React, { useEffect, useRef, useState } from 'react';
// import videojs from 'video.js';
// import 'video.js/dist/video-js.css';

// const usePlayer = ({ videoSrc, controls = true, autoplay = false }) => {
//   const options = {
//     fill: true,
//     fluid: true,
//     preload: 'auto',
//     html5: {
//       hls: {
//         enableLowInitialPlaylist: true,
//         smoothQualityChange: true,
//         overrideNative: true,
//       },
//     },
//   };
//   const videoRef = useRef(null);
//   const [player, setPlayer] = useState(null);

//   useEffect(() => {
//     const vjsPlayer = videojs(videoRef.current, {
//       ...options,
//       controls,
//       autoplay,
//       sources: [videoSrc],
//     });
//     setPlayer(vjsPlayer);

//     return () => {
//       if (player !== null) {
//         player.dispose();
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (player !== null) {
//       player.src({ videoSrc });
//     }
//   }, [videoSrc]);

//   return videoRef;
// };

// const VideoPlayer = ({ src, controls, autoplay }) => {
//   const playerRef = usePlayer({ src, controls, autoplay });

//   return (
//     <div data-vjs-player>
//       <video ref={playerRef} className='video-js' />
//     </div>
//   );
// };

// export default VideoPlayer;
