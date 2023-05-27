import React, { useState, useEffect } from 'react';
import { query, collection, onSnapshot } from 'firebase/firestore';
import db from '../../firebase';
import {Link} from 'react-router-dom';
import { Row, Col, Container} from 'react-bootstrap';
import MatchesListItem from './MatchesListItem';

function MatchesList() {
  const [matches, setMatches] = useState([])
  useEffect (() => {
    onSnapshot(query(collection(db, `/sets`)), (snapshot) => {
      setMatches(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    });
  }, [])

  return (
    <Container>
      <Row>
        <Col xs={2}>
          search and stuff
        </Col>
        <Col xs={10}>
          {matches.map((match) => (
            <MatchesListItem match={match}/>
          ))}
        </Col>
      </Row>
    </Container>
);
}

export default MatchesList;