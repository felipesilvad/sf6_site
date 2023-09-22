import React, { useState, useEffect } from 'react';
import db from '../../firebase';
import { query, collection, onSnapshot, doc} from 'firebase/firestore';
import { Container,Table } from 'react-bootstrap';
import StatsNav from './StatsNav';
import CharUsageRow from './CharUsageRow';

function CharUsage() {
  const [data, setData] = useState([])
  const [dataTotal, setDataTotal] = useState([])

  useEffect (() => {
    onSnapshot(query(collection(db, `/data/CharsData/CharsData/`)), (snapshot) => {
      setData(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    });
    onSnapshot(doc(db, "/data/total"), (doc) => {
      setDataTotal(doc.data());
    });
  }, [])

  const [chars, setChars] = useState([])
  useEffect (() => {
    onSnapshot(query(collection(db, `/chars`)), (snapshot) => {
      setChars(snapshot.docs.map(doc => ({title: doc.data().title, id: doc.id, color:  doc.data().color})))
    });
  }, [])

  const getPlayersPercent = (charPlayers) => {
    return ((charPlayers/dataTotal.totalPlayers)*100).toFixed(2)
  }

  const getGamesPercent = (charGames) => {
    return ((charGames/dataTotal.totalGames)*100).toFixed(2)
  }


  function order( a, b ) {
    if (orderBy === 'players') {
      if (a.player > b.player){
        return -1;
      }
      if (a.player < b.player){
        return 1;
      }
      return 0;
    } else {
      if (a.games > b.games){
        return -1;
      }
      if (a.games < b.games){
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
  
  if (data && dataTotal) {
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
            {data.sort(order).map((charData, index)=> (
              <CharUsageRow name={charData.name} id={charData.id} orderBy={orderBy} index={index}
              playersWR={getPlayersPercent(charData.player)} gamesWR={getGamesPercent(charData.games)}  />
            ))}
          </tbody>
        </Table>
        
      </Container>
    );
  }
  
}
export default CharUsage;
