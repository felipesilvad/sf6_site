import React, {useState, useEffect} from 'react';
import {Row,Col,Image, Container} from 'react-bootstrap';
import { doc, onSnapshot,query,collection,where, orderBy} from 'firebase/firestore';
import {useParams} from 'react-router-dom';
import db from '../../firebase';
import MatchesListItem from '../Matches/MatchesListItem';
import moment from 'moment'

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
    onSnapshot(query(collection(db, `/sets`), where("tournament_id", "==", parseInt(id))), orderBy("documentID","desc"), (snapshot) => {
      setMatches(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    });
  }, [])

  const [serie, setSerie] = useState([])
  useEffect(() => {
    if (tournament) {
      if (tournament.serie) {
        onSnapshot(doc(db, "/tournamentSeries/", tournament.serie), (doc) => {
          setSerie(doc.data());
        });
      }
    }
  }, [tournament]);

  return (
    <Container className='custom-row'>
      <div className='px-2 mb-2 d-flex align-items-center tourney-list-item'
      style={(serie.color2 === "") ? ({backgroundColor: serie.color}) : ({backgroundImage: `linear-gradient(to right, ${serie.color}, ${serie.color2})`})}>
        <Image className='toruney-img mr-1' src={serie.img} />
        <b className='tourney-title-list-item mb-0' style={{color: serie.txtColor}}>
          {tournament.name}
        </b>
      </div>
      <Row>
        <Col>
          <b className='ardela'>
            {moment.utc(tournament.startAt*1000).format('MMMM DD')}
            {' - '}
            {moment.utc(tournament.endAt*1000).format('MMMM DD')}
            , {moment.utc(tournament.startAt*1000).format('YYYY')}
          </b>
        </Col>
        <Col>
          <b className='ardela'>Attendees: {tournament.numAttendees}</b>
        </Col>
      </Row>
      <hr />
      {matches.sort((a, b) => (a.id > b.id ? -1 : 1)).map((match) => (
        <MatchesListItem match={match} />
      ))}
    </Container>
  );
}

export default TournamentComponent;