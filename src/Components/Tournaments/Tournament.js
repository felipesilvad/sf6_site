import React, {useState, useEffect} from 'react';
import {Row,Col, Container} from 'react-bootstrap';
import { doc, onSnapshot,query,collection,where} from 'firebase/firestore';
import {useParams} from 'react-router-dom';
import db from '../../firebase';
import MatchesListItem from '../Matches/MatchesListItem';

function TournamentComponent() {
  const id = useParams().id
  const [tournament, setTournament] = useState([])
  useEffect(() => {
    onSnapshot(doc(db, "/tournaments/", id), (doc) => {
      setTournament(doc.data());
    });
  }, [id]);

  const [matches, setMatches] = useState([])
  useEffect (() => {
    onSnapshot(query(collection(db, `/sets`), where("tournament_id", "==", parseInt(id))), (snapshot) => {
      setMatches(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    });
  }, [])


  return (
    <Container className='custom-row'>
      {tournament.name}
      <hr />
      {matches.map((match) => (
        <MatchesListItem match={match} />
      ))}
    </Container>
  );
}

export default TournamentComponent;