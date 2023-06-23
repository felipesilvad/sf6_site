import React from 'react';
import MatchGameChar from './MatchGameChar';

function MatchGame({getActiveGame,sw, game, game_n,handleTime,getTimeStamp}) {

  if (game) {
    if (game.length !== 0) {
      return (
        <div className='m-0'>
          <div className='game_timestamp' onClick={() => handleTime(getTimeStamp(game.timestamp))}>
            <b className='ardela match-game-item-title'>
              Game {game_n}
              <b className='timestamp'> ({game.timestamp})</b>
            </b>
          </div>
          <div 
            className={`match-game-bg d-flex justify-content-between align-items-center my-1 d-flex
            ${(getActiveGame() === game_n)&&("match-game-active")}`}
            onClick={() => handleTime(getTimeStamp(game.timestamp))} >
            {(sw) ? (
              <>
                <div className='w-50 d-flex justify-content-start h-100 align-items-center match-divider-bl'>
                  <MatchGameChar cntrl={game.cP2} id={game.charP2} />
                </div>
                <div className='w-50 d-flex justify-content-end h-100 align-items-center'>
                  <MatchGameChar cntrl={game.cP1} id={game.charP1} p2={true}  />
                </div>
              </>
            ) : (
              <>
                <div className='w-50 d-flex justify-content-start h-100 align-items-center match-divider-bl'>
                  <MatchGameChar cntrl={game.cP1} id={game.charP1} />
                </div>
                <div className='w-50 d-flex justify-content-end h-100 align-items-center'>
                  <MatchGameChar cntrl={game.cP2} id={game.charP2} p2={true}  />
                </div>
              </>
            )}
          </div>
        </div>
      )
    }
  }
}

export default MatchGame;