import React, { useState, useEffect } from 'react';
import db from '../../firebase';
import { query, collection, onSnapshot} from 'firebase/firestore';
import { Container,Table } from 'react-bootstrap';
import StatsNav from './StatsNav';
import CharUsageRow from './CharUsageRow';

function CharUsage() {
  const [games,setGames] = useState([]);
  const [matches, setMatches] = useState([])

  useEffect (() => {
    onSnapshot(query(collection(db, `/sets`)), (snapshot) => {
      setMatches(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
      snapshot.docs.map(doc => (
        setGames(oldGames => [...oldGames,
          doc.data().games.game1,doc.data().games.game2,doc.data().games.game3,doc.data().games.game4,doc.data().games.game5,
          doc.data().games.game6,doc.data().games.game7,doc.data().games.game8,doc.data().games.game9,doc.data().games.game10
        ])
      ))
    });
  }, [])

  const [chars, setChars] = useState([])
  useEffect (() => {
    onSnapshot(query(collection(db, `/chars`)), (snapshot) => {
      setChars(snapshot.docs.map(doc => ({title: doc.data().title, id: doc.id, color:  doc.data().color})))
    });
  }, [])

  const [players, setPlayers] = useState([])
  useEffect (() => {
    onSnapshot(query(collection(db, `/players`)), (snapshot) => {
      setPlayers(snapshot.docs.map(doc => (doc.id)))
    });
  }, [])

  function filterEmptyGames(game) {
    if (game) { if (Object.keys(game).length !== 0) {
      return true
    } else {return false}} else {return false}
  }

  const getPlayerGames = (char_id) => {
    var playersCount = 0
    players.map((player) => (
      (matches.filter(match => (
        (
          (match.Player1_id === player)
          &&
          ((match.games.game1.charP1 === char_id) ||
          (!! match.games.game2 &&(match.games.game2.charP1 === char_id)) ||
          (!! match.games.game3 &&(match.games.game3.charP1 === char_id)) ||
          (!! match.games.game4 &&(match.games.game4.charP1 === char_id)) ||
          (!! match.games.game5 &&(match.games.game5.charP1 === char_id)) ||
          (!! match.games.game6 &&(match.games.game6.charP1 === char_id)) ||
          (!! match.games.game7 &&(match.games.game7.charP1 === char_id)) ||
          (!! match.games.game8 &&(match.games.game8.charP1 === char_id)) ||
          (!! match.games.game9 &&(match.games.game9.charP1 === char_id)) ||
          (!! match.games.game10 &&(match.games.game10.charP1 === char_id))
          )
        ) || (
          (match.Player2_id === player)
          &&
          ((match.games.game1.charP2 === char_id) ||
          (!! match.games.game2 &&(match.games.game2.charP2 === char_id)) ||
          (!! match.games.game3 &&(match.games.game3.charP2 === char_id)) ||
          (!! match.games.game4 &&(match.games.game4.charP2 === char_id)) ||
          (!! match.games.game5 &&(match.games.game5.charP2 === char_id)) ||
          (!! match.games.game6 &&(match.games.game6.charP2 === char_id)) ||
          (!! match.games.game7 &&(match.games.game7.charP2 === char_id)) ||
          (!! match.games.game8 &&(match.games.game8.charP2 === char_id)) ||
          (!! match.games.game9 &&(match.games.game9.charP2 === char_id)) ||
          (!! match.games.game10 &&(match.games.game10.charP2 === char_id))
          )
        )
      )).length > 0)&&(
        playersCount = playersCount + 1
      )
    ))
    return playersCount
  }

  const dataTest =  []
  
  chars.map((char) => (
    dataTest.push({name: char.title, id: char.id,
    Players: getPlayerGames(char.id),
    Games: 
      games.filter(filterEmptyGames).filter(game => game.charP1 === char.id).length
      +
      games.filter(filterEmptyGames).filter(game => game.charP2 === char.id).length
    ,color: char.color
    })
  ))

  const getPlayersPercent = (charPlayers) => {
    const totalPlayers = dataTest.reduce((a, b) => +a + +b.Players, 0)
    return ((charPlayers/totalPlayers)*100).toFixed(2)
  }

  const getGamesPercent = (charGames) => {
    const totalGames = dataTest.reduce((a, b) => +a + +b.Games, 0)
    return ((charGames/totalGames)*100).toFixed(2)
  }


  function order( a, b ) {
    if (orderBy === 'players') {
      if (a.Players > b.Players){
        return -1;
      }
      if (a.Players < b.Players){
        return 1;
      }
      return 0;
    } else {
      if (a.Games > b.Games){
        return -1;
      }
      if (a.Games < b.Games){
        return 1;
      }
      return 0;
    }
  }

  const [orderBy, setOrderBy] = useState('players')
  const [showPlayers, setShowPlayers] = useState(true)
  const [showGames, setShowGames] = useState(false)

  const handleShowPlayers = () => {
    setShowPlayers(true)
    setShowGames(false)
    setOrderBy('players')
  }

  const handleShowGames = () => {
    setShowGames(true)
    setShowPlayers(false)
    setOrderBy('games')
  }
  
  if (dataTest) {
    return (
      <Container>
        <StatsNav />
        <div className='d-flex ml-4 my-1'>
           <div className={`show-button ardela mx-2 ${showPlayers&&('show-button_active')}`}
           onClick={() => handleShowPlayers()}>Players</div>
           <div className={`show-button ardela mx-2 ${showGames&&('show-button_active')}`}
           onClick={() => handleShowGames()}>Games</div>
        </div>
        <Table  striped bordered hover variant="dark">
          <tbody>
            {dataTest.sort(order).map((data, index)=> (
              <CharUsageRow name={data.name} id={data.id} orderBy={orderBy} index={index}
              playersWR={getPlayersPercent(data.Players)} gamesWR={getGamesPercent(data.Games)}  />
            ))}
          </tbody>
        </Table>
        
      </Container>
    );
  }
  
}
export default CharUsage;
