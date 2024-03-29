import React, {useState, useEffect, useRef} from 'react';
import {Row,Col, Container} from 'react-bootstrap';
import { doc, onSnapshot} from 'firebase/firestore';
import {useParams} from 'react-router-dom';
import db from '../../firebase';
import MatchTournament from './MatchTournament';
import MatchGame from './MatchGame';
import MatchVideo from './MatchVideo';
import MatchesSide from './MatchesSide';
import MatchPlayerFlag from './MatchPlayerFlag';

function MatchComponent() {
  const id = useParams().id
  const [match, setMatch] = useState([])

  useEffect(() => {
    window.scrollTo(0, 0)
    onSnapshot(doc(db, "/sets/", id), (doc) => {
      setMatch(doc.data());
    });
  }, [id]);

  const getTimeStamp = (timestamp) => {
    return ((parseInt(timestamp.split(".")[0].split(":")[0])) * 3600)
      +
    ((parseInt(timestamp.split(".")[0].split(":")[1])) * 60)
      + 
    (parseInt(timestamp.split(".")[0].split(":")[2]))
  }
  const playerRef = useRef('');
  const handleTime = (time) => {
    playerRef.current.seekTo(time)
  }

  useEffect(() => {
    handleTime(getTimeStamp(`${match.start_h}:${match.start_m}:${match.start_s}.00`))
  }, [match])


  // CURRENT TIME STUFF
  const [played, setPlayed] = useState(0);
  const getActiveGame = () => {
    var game_1_s = getTimeStamp(match.games.game1.timestamp)
    var game_2_s = getTimeStamp(match.games.game2.timestamp)
    var game_3_s = null
    var game_4_s = null
    var game_5_s = null
    var game_6_s = null
    var game_7_s = null
    var game_8_s = null
    var game_9_s = null
    
    if (match.games.game3) { if (Object.keys(match.games.game3).length !== 0) {
      game_3_s = getTimeStamp(match.games.game3.timestamp)
    }}
    if (match.games.game4) { if (Object.keys(match.games.game4).length !== 0) {
      game_4_s = getTimeStamp(match.games.game4.timestamp)
    }}
    if (match.games.game5) { if (Object.keys(match.games.game5).length !== 0) {
      game_5_s = getTimeStamp(match.games.game5.timestamp)
    }}
    if (match.games.game6) { if (Object.keys(match.games.game6).length !== 0) {
      game_6_s = getTimeStamp(match.games.game6.timestamp)
    }}
    if (match.games.game7) { if (Object.keys(match.games.game7).length !== 0) {
      game_7_s = getTimeStamp(match.games.game7.timestamp)
    }}
    if (match.games.game8) { if (Object.keys(match.games.game8).length !== 0) {
      game_8_s = getTimeStamp(match.games.game8.timestamp)
    }}
    if (match.games.game9) { if (Object.keys(match.games.game9).length !== 0) {
      game_9_s = getTimeStamp(match.games.game9.timestamp)
    }}

    if (game_1_s <= played && game_2_s > played) {
      return 1
    }
    if (game_3_s) {
      if (game_2_s <= played && game_3_s > played) {
        return 2
      } if (game_4_s) {
        if (game_3_s <= played && game_4_s > played) {
          return 3
        }
        if (game_5_s) {
          if (game_4_s <= played && game_5_s > played) {
            return 4
          } else {
            if (game_6_s) {
              if (game_5_s <= played && game_6_s > played) {
                return 5
              } else {
                if (game_7_s) {
                  if (game_6_s <= played && game_7_s > played) {
                    return 6
                  } else {
                    if (game_8_s) {
                      if (game_7_s <= played && game_8_s > played) {
                        return 7
                      } else {
                        if (game_9_s) {
                          if (game_8_s <= played && game_9_s > played) {
                            return 8
                          } else {
                            if (game_9_s <= played) {
                              return 9
                            }
                          }
                        } else {
                          if (game_8_s <= played) {
                            return 8
                          }
                        }
                      }
                    } else {
                      if (game_7_s <= played) {
                        return 7
                      }
                    }
                  }
                } else {
                  if (game_6_s <= played) {
                    return 6
                  }
                }
              }
            } else {
              if (game_5_s <= played) {
                return 5
              }
            }
          }
        } else {
          if (game_4_s <= played) {
            return 4
          }
        }
      } else {
        if (game_3_s <= played) {
          return 3
        }
      }
    } else {
      if (game_2_s <= played) {
        return 2
      }
    }
  }

  
  if (match) {
    return (
      <Container className='match-container'>
        <Row>
          <Col md={8} className='pr-0'>
            <MatchTournament id={String(match.tournament_id)} phase={match.phase} phase_id={match.identifier} />
            <MatchVideo playerRef={playerRef} setPlayed={setPlayed} videoUrl={match.videoUrl}
            h={match.start_h} m={match.start_m} s={match.start_s} />
            <div className='current_games mb-3'>
              <div className='d-flex mx-2 justify-content-between mt-2'>
                {(match.switch) ? (
                  <>
                    <MatchPlayerFlag id={match.Player2_id} />
                    <h5 className='ardela'>VS</h5>
                    <MatchPlayerFlag id={match.Player1_id} p2={true} />
                  </>
                ): (
                  <>
                    <MatchPlayerFlag id={match.Player1_id} />
                    <h5 className='ardela'>VS</h5>
                    <MatchPlayerFlag id={match.Player2_id} p2={true} />
                  </>
                )}
              </div>
              <hr />
              {match.games&&(
                <>
                  <MatchGame getActiveGame={getActiveGame} sw={match.switch} game={match.games.game1} game_n={1} handleTime={handleTime} getTimeStamp={getTimeStamp} />
                  <MatchGame getActiveGame={getActiveGame} sw={match.switch} game={match.games.game2} game_n={2} handleTime={handleTime} getTimeStamp={getTimeStamp} />
                  <MatchGame getActiveGame={getActiveGame} sw={match.switch} game={match.games.game3} game_n={3} handleTime={handleTime} getTimeStamp={getTimeStamp} />
                  <MatchGame getActiveGame={getActiveGame} sw={match.switch} game={match.games.game4} game_n={4} handleTime={handleTime} getTimeStamp={getTimeStamp} />
                  <MatchGame getActiveGame={getActiveGame} sw={match.switch} game={match.games.game5} game_n={5} handleTime={handleTime} getTimeStamp={getTimeStamp} />
                  <MatchGame getActiveGame={getActiveGame} sw={match.switch} game={match.games.game6} game_n={6} handleTime={handleTime} getTimeStamp={getTimeStamp} />
                  <MatchGame getActiveGame={getActiveGame} sw={match.switch} game={match.games.game7} game_n={7} handleTime={handleTime} getTimeStamp={getTimeStamp} />
                  <MatchGame getActiveGame={getActiveGame} sw={match.switch} game={match.games.game8} game_n={8} handleTime={handleTime} getTimeStamp={getTimeStamp} />
                  <MatchGame getActiveGame={getActiveGame} sw={match.switch} game={match.games.game9} game_n={9} handleTime={handleTime} getTimeStamp={getTimeStamp} />
                  <MatchGame getActiveGame={getActiveGame} sw={match.switch} game={match.games.game10} game_n={10} handleTime={handleTime} getTimeStamp={getTimeStamp} />
                </>
              )}
            </div>
          </Col>

          <Col md={4}>
            {match.games&&(match.games.game1&&(
              <MatchesSide 
                videoUrl={match.videoUrl} tournament_id={match.tournament_id} id={id}
              
                current_start_time={((parseInt(match.start_h)*3600) + (parseInt(match.start_m)*60) + parseInt(match.start_s))}
                currentChar1={match.games.game1.charP1} currentChar2={match.games.game1.charP2}
              />
              )
            )}
          </Col>

        </Row>
      </Container>
    );
  }
}

export default MatchComponent;