import React, { useState, useEffect } from 'react';
import { query, collection, onSnapshot , orderBy} from 'firebase/firestore';
import db from '../../firebase';
import {Container} from 'react-bootstrap';
import TournamentListItem from '../Tournaments/TournamentListItem';

function TournamentsList() {
  const [tournaments, setTournaments] = useState([])
  
  useEffect (() => {
    onSnapshot(query(collection(db, `/tournaments`), orderBy("startAt", "desc")), (snapshot) => {
      setTournaments(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    });
  }, [])


  return (
    <Container className='player-min-h'>
      {tournaments.map((tournament) => (
        <TournamentListItem tournament={tournament} />
      ))}
    </Container>
);
}

export default TournamentsList;