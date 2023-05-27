import React, { useState, useEffect } from 'react';
import MatchesListItemChar from './MatchesListItemChar';
import { Link } from 'react-router-dom';
function MatchesListItem({match}) {
  // const [allCharP1, setAllCharP1] = useState([])
  // const [allCharP2, setAllCharP2] = useState([])

  const allCharP1 = [match.games.game1.charP1,match.games.game2.charP1,match.games.game3.charP1]
  const allCharP2 = [match.games.game1.charP2,match.games.game2.charP2,match.games.game3.charP2]
  const uniqCharP1 = [...new Set(allCharP1)];
  const uniqCharP2 = [...new Set(allCharP2)];

  return (
    <Link to={`/sets/${match.id}`} className='match-item__bg my-1 d-flex'>
      <div className='w-45 d-flex justify-content-start h-100 align-items-center match-divider-bl'>
        <MatchesListItemChar id={uniqCharP1[0]} player={match.Player1_name} />
      </div>
      <div className='w-10'>
        <div className='text-center ardela'>{match.phase}</div>
      </div>
      <div className='w-45 d-flex justify-content-end h-100 align-items-center'>
        <MatchesListItemChar id={uniqCharP2[0]} p2={true} player={match.Player2_name} />
      </div>
    </Link>
  )
}

export default MatchesListItem;