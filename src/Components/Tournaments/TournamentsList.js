import React, { useState, useEffect } from 'react';
import { query, collection, onSnapshot } from 'firebase/firestore';
import db from '../../firebase';
import {Link} from 'react-router-dom';
import { Row, Col, Container} from 'react-bootstrap';

function TournamentsList() {
  const [tournaments, setTournaments] = useState([])
  
  useEffect (() => {
    onSnapshot(query(collection(db, `/tournaments`)), (snapshot) => {
      setTournaments(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    });
  }, [])

  return (
    <Container>
      {/* <h1>{data.user.name}</h1>
      <p>{data.user.email}</p> */}
      <Row>
        <Col xs={2}>
          search and stuff
        </Col>
        <Col xs={10}>
          {tournaments.map((tournament) => (
            <Link to={`/tournaments/${tournament.id}`}>
              {tournament.name}
            </Link>
          ))}
        </Col>
      </Row>
    </Container>
);
}

export default TournamentsList;