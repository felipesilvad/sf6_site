import React, { useState, useEffect } from 'react';
import { query, collection, onSnapshot} from "firebase/firestore"; 
import db from '../../firebase';
import {Container,Row,Col} from 'react-bootstrap';
import PlayersSingle from './PlayerSingle';
import Select from 'react-select'
import PlayersVsMatch from './PlayersVsMatch';
import CharPlayers from '../Character/CharPlayers';

function PlayersComponent() {
  const [players, setPlayers] = useState([])
  useEffect (() => {
    onSnapshot(query(collection(db, `/players`)), (snapshot) => {
      setPlayers(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    });
  }, [])


  if (players) {
    return (
      <Container className='player-min-h'>
        <div className='d-flex flex-wrap'>
          {players.map(player => (
            <CharPlayers id={player.id} />
          ))}
        </div>
      </Container>
    )
  }
  
}

export default PlayersComponent;