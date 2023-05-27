import React from 'react';
import ReactPlayer from "react-player";

function MatchVideo({playerRef, setPlayed,h,m,s}) {

  return (
    <div className='m-0 player-wrapper'>
      <ReactPlayer
        onProgress={(progress) => {
          setPlayed(progress.playedSeconds);
        }}
        playing={true}
        ref={playerRef}
        className="react-player"
        url={`https://www.youtube.com/watch?v=${"9udmG_6pgSo"}?t=${((h*3600) + (m*60) + parseInt(s))}`}
        controls='true'
        width="100%"
        height="100%"
        config={{
          youtube: {
            options: {
              time: `${h}h${m}m${s}s`
            },
          }
        }}
        autoPlay
        muted={false}
      />
    </div>
  )
}

export default MatchVideo;