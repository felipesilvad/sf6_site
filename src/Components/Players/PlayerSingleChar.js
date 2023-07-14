import React, { useState, useEffect } from 'react';

function PlayerSingleChar(chars,matches,player_id) {
  console.log(matches)
  function filterMatchesP1(match) {
    if (match.Player1_id === player_id ) {
      return true
    }
  }
  function filterMatchesP2(match) {
    if (match.Player2_id === player_id ) {
      return true
    }
  }
  const [playerChars, setPlayerChars] = useState([])

  useEffect (() => {
    if (matches.length !== 0) {
      console.log('matches',matches)
      // matches.filter(filterMatchesP1).map(match => (
      //   setPlayerChars(oldGames => [...oldGames,match.games.game1.charP1,match.games.game2.charP1,match.games.game3.charP1,match.games.game4.charP1,match.games.game5.charP1,match.games.game6.charP1,match.games.game7.charP1,match.games.game8.charP1,match.games.game9.charP1,match.games.game10.charP1] )
      // ))
      // matches.filter(filterMatchesP2).map(match => (
      //   setPlayerChars(oldGames => [...oldGames,match.games.game1.charP2,match.games.game2.charP2,match.games.game3.charP2,match.games.game4.charP2,match.games.game5.charP2,match.games.game6.charP2,match.games.game7.charP2,match.games.game8.charP2,match.games.game9.charP2,match.games.game10.charP2] )
      // ))
    }
  }, [matches])

  console.log('playerChars:',playerChars)
  return (
    <div className='p-single__bg'>
      
    </div>
  );
}

export default PlayerSingleChar;