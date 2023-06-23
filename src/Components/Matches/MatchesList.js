import React, { useState, useEffect } from 'react';
import { query, collection, onSnapshot } from 'firebase/firestore';
import db from '../../firebase';
import {Link} from 'react-router-dom';
import { Row, Col, Container} from 'react-bootstrap';
import MatchesListItem from './MatchesListItem';
import FilterMatches from './FilterMatches';

function MatchesList() {
  const [matches, setMatches] = useState([])
  useEffect (() => {
    onSnapshot(query(collection(db, `/sets`)), (snapshot) => {
      setMatches(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    });
  }, [])

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const [char1, setChar1] = useState('');
  async function reloadFilterChar1(value) {
    setChar1(false)
    await sleep(200);
    setChar1(value)
  }
  function filterChar1(match) {
    if (char1 === "") {
      return true
    } else {
      if (char1 === char2) {
        return (match.games.game1.charP1 === char2 && match.games.game1.charP2 === char2) ||
        (!! match.games.game2 &&(match.games.game2.charP1 === char2 && match.games.game2.charP2 === char2)) ||
        (!! match.games.game3 &&(match.games.game3.charP1 === char2 && match.games.game3.charP2 === char2)) ||
        (!! match.games.game4 &&(match.games.game4.charP1 === char2 && match.games.game4.charP2 === char2)) ||
        (!! match.games.game5 &&(match.games.game5.charP1 === char2 && match.games.game5.charP2 === char2)) ||
        (!! match.games.game6 &&(match.games.game6.charP1 === char2 && match.games.game6.charP2 === char2)) ||
        (!! match.games.game7 &&(match.games.game7.charP1 === char2 && match.games.game7.charP2 === char2))
      } else {
        return  (match.games.game1.charP1 === char1 || match.games.game1.charP2 === char1) ||
        (!! match.games.game2 &&(match.games.game2.charP1 === char1 || match.games.game2.charP2 === char1)) ||
        (!! match.games.game3 &&(match.games.game3.charP1 === char1 || match.games.game3.charP2 === char1)) ||
        (!! match.games.game4 &&(match.games.game4.charP1 === char1 || match.games.game4.charP2 === char1)) ||
        (!! match.games.game5 &&(match.games.game5.charP1 === char1 || match.games.game5.charP2 === char1)) ||
        (!! match.games.game6 &&(match.games.game6.charP1 === char1 || match.games.game6.charP2 === char1)) ||
        (!! match.games.game7 &&(match.games.game7.charP1 === char1 || match.games.game7.charP2 === char1))
      }
    }
  }

  const [char2, setChar2] = useState('');
  async function reloadFilterChar2(value) {
    setChar2(false)
    await sleep(200);
    setChar2(value)
  }
  function filterChar2(match) {
    if (char2 === "") {
      return true
    } else {
      if (char1 === char2) {
        return (match.games.game1.charP1 === char2 && match.games.game1.charP2 === char2) ||
        (!! match.games.game2 &&(match.games.game2.charP1 === char2 && match.games.game2.charP2 === char2)) ||
        (!! match.games.game3 &&(match.games.game3.charP1 === char2 && match.games.game3.charP2 === char2)) ||
        (!! match.games.game4 &&(match.games.game4.charP1 === char2 && match.games.game4.charP2 === char2)) ||
        (!! match.games.game5 &&(match.games.game5.charP1 === char2 && match.games.game5.charP2 === char2)) ||
        (!! match.games.game6 &&(match.games.game6.charP1 === char2 && match.games.game6.charP2 === char2)) ||
        (!! match.games.game7 &&(match.games.game7.charP1 === char2 && match.games.game7.charP2 === char2))
      } else {
        return (match.games.game1.charP1 === char2 || match.games.game1.charP2 === char2) ||
        (!! match.games.game2 &&(match.games.game2.charP1 === char2 || match.games.game2.charP2 === char2)) ||
        (!! match.games.game3 &&(match.games.game3.charP1 === char2 || match.games.game3.charP2 === char2)) ||
        (!! match.games.game4 &&(match.games.game4.charP1 === char2 || match.games.game4.charP2 === char2)) ||
        (!! match.games.game5 &&(match.games.game5.charP1 === char2 || match.games.game5.charP2 === char2)) ||
        (!! match.games.game6 &&(match.games.game6.charP1 === char2 || match.games.game6.charP2 === char2)) ||
        (!! match.games.game7 &&(match.games.game7.charP1 === char2 || match.games.game7.charP2 === char2))
      }
    }
  }

  return (
    <Container>
      <Row>
        <Col md={2}>
          <FilterMatches reloadFilterChar1={reloadFilterChar1} reloadFilterChar2={reloadFilterChar2} />
        </Col>
        <Col md={10}>
          {matches.filter(filterChar1).filter(filterChar2).map((match) => (
            <MatchesListItem match={match}/>
          ))}
        </Col>
      </Row>
    </Container>
);
}

export default MatchesList;