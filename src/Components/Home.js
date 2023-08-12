import React, { useState, useEffect } from 'react';
import { query, collection, onSnapshot, orderBy, limit} from 'firebase/firestore';
import {FieldPath, where} from 'firebase/firestore'
import db from '../firebase';
import {Col, Container, Row} from 'react-bootstrap'; 
import MatchesListItem from './Matches/MatchesListItem';
import TournamentListItem from './Tournaments/TournamentListItem';

function HomeComponent() {
  const [matches, setMatches] = useState([])
  const [tournaments, setTournaments] = useState([])

  useEffect (() => {
    onSnapshot(query(collection(db, `/tournaments`), limit(13), orderBy("startAt", "desc")), (snapshot) => {
      setTournaments(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    });
  }, [])
  useEffect (() => {
    if (tournaments[0]) {
      onSnapshot(query(collection(db, `/sets`), where("tournament_id", "==", parseInt(tournaments[0].id))), (snapshot) => {
        setMatches(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
      })
    }
  }, [tournaments])

  if (matches) {
    return (
      <Container className='player-min-h'>
        <Row className='mt-1'>
          <Col>
            <div className='ardela text-center'><h5><b>Latest Matches</b></h5></div>
            {matches.sort((a, b) => (a.id > b.id ? -1 : 1)).slice(0, 5).map((match) => (
              <MatchesListItem match={match} />
            ))}
          </Col>
          <Col>
            <div className='ardela text-center'><h5><b>Latest Tournaments</b></h5></div>
            {tournaments.map((tournament) => (
              <TournamentListItem tournament={tournament} />
            ))}
          </Col>
        </Row>
        
      </Container>
    )
  }
}

export default HomeComponent;