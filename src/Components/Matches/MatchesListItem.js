import React from 'react';
import MatchesListItemChar from './MatchesListItemChar';
import { Link } from 'react-router-dom';
import MatchesListItemTourney from './MatchesListItemTourney';

function MatchesListItem({match}) {
  const allCharP1 = [match.games.game1.charP1,match.games.game2.charP1,match.games.game3.charP1]
  const allCharP2 = [match.games.game1.charP2,match.games.game2.charP2,match.games.game3.charP2]
  const uniqCharP1 = [...new Set(allCharP1)];
  const uniqCharP2 = [...new Set(allCharP2)];

  return (
    <Link key={match.id} to={`/vods/${match.id}`}>
      <div key={match.id} className='match-item__bg my-1'>
        <MatchesListItemTourney id={String(match.tournament_id)} />
        <div className='match_phase ardela'>
          {match.phase}
        </div>
        <div className='d-flex'>
          {(match.switch) ? (
            <>
              <div className='w-50 d-flex justify-content-start h-100 align-items-center match-divider-bl'>
                <MatchesListItemChar cntrl={match.games.game1.cP2} id={uniqCharP2[0]} player={match.Player2_id} />
              </div>
              <div className='w-50 d-flex justify-content-end h-100 align-items-center'>
                <MatchesListItemChar cntrl={match.games.game1.cP1} id={uniqCharP1[0]} p2={true} player={match.Player1_id} />
              </div>
            </>
          ) : (
            <>
              <div className='w-50 d-flex justify-content-start h-100 align-items-center match-divider-bl'>
                <MatchesListItemChar cntrl={match.games.game1.cP1} id={uniqCharP1[0]} player={match.Player1_id} />
              </div>
              <div className='w-50 d-flex justify-content-end h-100 align-items-center'>
                <MatchesListItemChar cntrl={match.games.game1.cP2} id={uniqCharP2[0]} p2={true} player={match.Player2_id} />
              </div>
            </>
          )}
        </div>
      </div>
    </Link>
  )
}

export default MatchesListItem;