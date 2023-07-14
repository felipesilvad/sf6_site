import React, { useState, useEffect } from 'react';
import { query, collection, onSnapshot} from "firebase/firestore"; 
import db from '../../firebase';
import { Form, Container, Button, Image} from 'react-bootstrap';
import PlayersSingle from './PlayerSingle';
import Select from 'react-select'

function PlayersComponent() {
  const [matches, setMatches] = useState([])
  
  useEffect (() => {
    onSnapshot(query(collection(db, `/sets`)), (snapshot) => {
      setMatches(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    });
  }, [])
  
  const [players, setPlayers] = useState([])
  useEffect (() => {
    onSnapshot(query(collection(db, `/players`)), (snapshot) => {
      setPlayers(snapshot.docs.map(doc => ({label: doc.data().gamerTag, value: doc.id})))
    });
  }, [])

  const [chars, setChars] = useState([])
  useEffect (() => {
    onSnapshot(query(collection(db, `/chars`)), (snapshot) => {
      setChars(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    });
  }, [])

  const [selectedPlayer1, setSelectedPlayer1] = useState([])

  return (
    <Container>
      <h5 className='ardela txt-shadow ml-2'>Player 1</h5>
      <Select
        onChange={e => setSelectedPlayer1(e.value)}
        className="Selector mb-2" isSearchable 
        options={players}
      />
      {selectedPlayer1&&(
        <PlayersSingle slug={selectedPlayer1} chars={chars} matches={matches} />
      )}
    </Container>
);
}

export default PlayersComponent;