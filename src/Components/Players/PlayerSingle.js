import React, { useState, useEffect } from 'react';
import { query, collection, onSnapshot, doc, where} from 'firebase/firestore';
import db from '../../firebase';
import {Container} from 'react-bootstrap';
import PlayersSingle from './PlayerSingle';
import {useParams} from 'react-router-dom';
import MatchesListItem from '../Matches/MatchesListItem';
import PlayerSingleData from './PlayerSingleData';

function PlayerSingle() {
  const id = useParams().id
  const [playerGamesPlayer1P1, setPlayerGamesPlayer1P1] = useState([])
  const [playerGamesPlayer1P2, setPlayerGamesPlayer1P2] = useState([])

  const [player, setPlayer] = useState([])

  useEffect(() => {
    onSnapshot(query(collection(db, `/sets`), where("Player1_id","==",id)), (snapshot) => {
      setPlayerGamesPlayer1P1(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    });
    onSnapshot(query(collection(db, `/sets`), where("Player2_id","==",id)), (snapshot) => {
      setPlayerGamesPlayer1P2(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    });

    window.scrollTo(0, 0)

    onSnapshot(doc(db, "/players/", id), (doc) => {
      setPlayer(doc.data());
    });
  }, [id]);

  function filterEmptyGames(game) {
    if (game) { if (Object.keys(game).length !== 0) {
      return true
    } else {return false}} else {return false}
  }

  return (
    <Container className='player-min-h'>
      <div>
        {player&&(
          playerGamesPlayer1P1&&playerGamesPlayer1P2&&(
            <PlayerSingleData player={player} playerID={id} 
            gamesP1={playerGamesPlayer1P1.filter(filterEmptyGames)} gamesP2={playerGamesPlayer1P2.filter(filterEmptyGames)} />
          )
        )}
      </div>
      <h5 className='ardela txt-shadow mt-2 text-center'>VODS</h5>
      {playerGamesPlayer1P1.map((match) => (
        <MatchesListItem match={match} />
      ))}
      {playerGamesPlayer1P2.map((match) => (
        <MatchesListItem match={match} />
      ))}  
    </Container>
  );
}

export default PlayerSingle;