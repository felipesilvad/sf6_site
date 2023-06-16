import React from 'react';
import MatchGameChar from './MatchGameChar';

function MatchGame({game, game_n,handleTime,h,m,s}) {

  const getTimeStamp = () => {
    // OPECV
    // return ((parseInt(h) + parseInt(game.timestamp.split(".")[0].split(":")[0])) * 3600)
    //   +
    // ((parseInt(m) + parseInt(game.timestamp.split(".")[0].split(":")[1])) * 60)
    //   + 
    // (parseInt(s) + parseInt(game.timestamp.split(".")[0].split(":")[2]))

    return ((parseInt(game.timestamp.split(".")[0].split(":")[0])) * 3600)
      +
    ((parseInt(game.timestamp.split(".")[0].split(":")[1])) * 60)
      + 
    (parseInt(game.timestamp.split(".")[0].split(":")[2]))
  }

  
  if (game) {
    if (game.length !== 0) {
      return (
        <div className='m-0'>
          <div 
            className='match-game-bg d-flex justify-content-between align-items-center my-1 d-flex'
            onClick={() => handleTime(getTimeStamp())} >
            <MatchGameChar id={game.charP1} />
            <b className='ardela match-game-item-title'>
              Game {game_n}
              <b className='timestamp'> ({game.timestamp})</b>
            </b>
            <MatchGameChar id={game.charP2} p2={true} />
          </div>
        </div>
      )
    }
  }
}

export default MatchGame;