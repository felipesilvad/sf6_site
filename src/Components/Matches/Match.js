import React, {useState, useEffect, useRef} from 'react';
import {Row,Col, Container} from 'react-bootstrap';
import { doc, onSnapshot} from 'firebase/firestore';
import {useParams} from 'react-router-dom';
import db from '../../firebase';
import MatchTournament from './MatchTournament';
import MatchGame from './MatchGame';
import MatchVideo from './MatchVideo';
import MatchesSide from './MatchesSide';
import MatchesListPlayerFlag from './MatchesListPlayerFlag';

function MatchComponent() {
  const id = useParams().id
  const [match, setMatch] = useState([])
  useEffect(() => {
    onSnapshot(doc(db, "/sets/", id), (doc) => {
      setMatch(doc.data());
    });
  }, [id]);

  const playerRef = useRef(null);
  const handleTime = (time) => {
    playerRef.current.seekTo(time)
  }
  const [played, setPlayed] = useState(0);

  if (match) {
    return (
      <Container className='match-container'>
        <Row>
          <Col md={8}>
            <MatchVideo playerRef={playerRef} videoUrl={match.videoUrl} setPlayed={setPlayed} h={match.start_h} m={match.start_m} s={match.start_s} />
            <div className='current_games'>
              <h5 className='mx-1 ardela-nu'>
                <MatchTournament id={String(match.tournament_id)} />
                {" - "}
                {match.phase}
              </h5>
              <div className='d-flex mx-2 justify-content-between mt-2'>
                <MatchesListPlayerFlag id={match.Player1_id} />
                <MatchesListPlayerFlag id={match.Player2_id} p2={true} />
              </div>
              {match.games&&(
                <>
                  <MatchGame game={match.games.game1} game_n={1} handleTime={handleTime} h={match.start_h} m={match.start_m} s={match.start_s} />
                  <MatchGame game={match.games.game2} game_n={2} handleTime={handleTime} h={match.start_h} m={match.start_m} s={match.start_s} />
                  <MatchGame game={match.games.game3} game_n={3} handleTime={handleTime} h={match.start_h} m={match.start_m} s={match.start_s} />
                  <MatchGame game={match.games.game4} game_n={4} handleTime={handleTime} h={match.start_h} m={match.start_m} s={match.start_s} />
                  <MatchGame game={match.games.game5} game_n={5} handleTime={handleTime} h={match.start_h} m={match.start_m} s={match.start_s} />
                </>
              )}
            </div>
          </Col>
          <Col md={4}>
            <MatchesSide />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default MatchComponent;