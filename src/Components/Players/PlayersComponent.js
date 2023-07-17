import React, { useState, useEffect } from 'react';
import { query, collection, onSnapshot} from "firebase/firestore"; 
import db from '../../firebase';
import {Container,Row,Col} from 'react-bootstrap';
import PlayersSingle from './PlayerSingle';
import Select from 'react-select'
import PlayersVsMatch from './PlayersVsMatch';

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

  const [selectedPlayer1, setSelectedPlayer1] = useState([])
  const [selectedPlayer2, setSelectedPlayer2] = useState([])

  const [playerGamesPlayer1P1, setPlayerGamesPlayer1P1] = useState([])
  const [playerGamesPlayer1P2, setPlayerGamesPlayer1P2] = useState([])

  const [playerGamesPlayer2P1, setPlayerGamesPlayer2P1] = useState([])
  const [playerGamesPlayer2P2, setPlayerGamesPlayer2P2] = useState([])

  const selectPlayer1 = (id) => {
    setPlayerGamesPlayer1P1([])
    setPlayerGamesPlayer1P2([])
    setSelectedPlayer1(id)
  }

  const selectPlayer2 = (id) => {
    setPlayerGamesPlayer2P1([])
    setPlayerGamesPlayer2P2([])
    setSelectedPlayer2(id)
  }

  function filterEmptyGames(game) {
    if (game) { if (Object.keys(game).length !== 0) {
      return true
    } else {return false}} else {return false}
  }
  function filterMatchesPlayer1P1(match) {
    if (match.Player1_id === String(selectedPlayer1) ) {
      return true
    }
  }
  function filterMatchesPlayer1P2(match) {
    if (match.Player2_id === String(selectedPlayer1) ) {
      return true
    }
  }
  function filterMatchesPlayer2P1(match) {
    if (match.Player1_id === String(selectedPlayer2) ) {
      return true
    }
  }
  function filterMatchesPlayer2P2(match) {
    if (match.Player2_id === String(selectedPlayer2) ) {
      return true
    }
  }

  useEffect (() => {
    if (selectedPlayer1) {
      matches.filter(filterMatchesPlayer1P1).map(match => (
        setPlayerGamesPlayer1P1(oldGamesP1 => [...oldGamesP1,
          match.games.game1,match.games.game2,match.games.game3,match.games.game4,match.games.game5,
          match.games.game6,match.games.game7,match.games.game8,match.games.game9,match.games.game10
        ])
      ))
      matches.filter(filterMatchesPlayer1P2).map(match => (
        setPlayerGamesPlayer1P2(oldGamesP2 => [...oldGamesP2,
          match.games.game1,match.games.game2,match.games.game3,match.games.game4,match.games.game5,
          match.games.game6,match.games.game7,match.games.game8,match.games.game9,match.games.game10
        ])
      ))
    }
  }, [selectedPlayer1])

  useEffect (() => {
    if (selectedPlayer2) {
      matches.filter(filterMatchesPlayer2P1).map(match => (
        setPlayerGamesPlayer2P1(oldGamesP1 => [...oldGamesP1,
          match.games.game1,match.games.game2,match.games.game3,match.games.game4,match.games.game5,
          match.games.game6,match.games.game7,match.games.game8,match.games.game9,match.games.game10
        ])
      ))
      matches.filter(filterMatchesPlayer2P2).map(match => (
        setPlayerGamesPlayer2P2(oldGamesP2 => [...oldGamesP2,
          match.games.game1,match.games.game2,match.games.game3,match.games.game4,match.games.game5,
          match.games.game6,match.games.game7,match.games.game8,match.games.game9,match.games.game10
        ])
      ))
    }
  }, [selectedPlayer2])

  return (
    <Container>
      <Row>
        <Col>
          <h5 className='ardela txt-shadow mt-1 text-center'>Player 1</h5>
          <Select
            onChange={e => selectPlayer1(e.value)}
            className="Selector mb-2" isSearchable 
            options={players}
          />
          {selectedPlayer1&&(
            matches&&(
              <PlayersSingle slug={selectedPlayer1} matches={matches} 
              gamesP1={playerGamesPlayer1P1.filter(filterEmptyGames)} gamesP2={playerGamesPlayer1P2.filter(filterEmptyGames)} />
            )
          )}
        </Col>
        <Col>
          <h5 className='ardela txt-shadow mt-1 text-center'>Player 2</h5>
          <Select
            onChange={e => selectPlayer2(e.value)}
            className="Selector mb-2" isSearchable 
            options={players}
          />
          {selectedPlayer2&&(
            matches&&(
              <PlayersSingle slug={selectedPlayer2} matches={matches} 
              gamesP1={playerGamesPlayer2P1.filter(filterEmptyGames)} gamesP2={playerGamesPlayer2P2.filter(filterEmptyGames)} />
            )
          )}
        </Col>

        {selectedPlayer1&&selectedPlayer2&&(
          <PlayersVsMatch selectedPlayer1={selectedPlayer1} selectedPlayer2={selectedPlayer2}
          matches={matches} />
        )}
        
      </Row>
      
    </Container>
);
}

export default PlayersComponent;