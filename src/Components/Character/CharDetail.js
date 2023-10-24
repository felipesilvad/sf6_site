import React, {useState, useEffect} from 'react';
import {Container, Image} from 'react-bootstrap';
import { doc, onSnapshot, query,collection} from 'firebase/firestore';
import {useParams} from 'react-router-dom';
import db from '../../firebase';
import CharPlayers from './CharPlayers';

function CharComponent() {
  const id = useParams().id
  const [char, setChar] = useState([])
  const img = `https://firebasestorage.googleapis.com/v0/b/sf6-vods.appspot.com/o/Chars%2F${id}_.png?alt=media`
  const [charData, setCharData] = useState([])

  const [playersData, setPlayersData] = useState([])

  useEffect(() => {
    onSnapshot(doc(db, "/chars/", id), (doc) => {
      setChar(doc.data());
    });
    onSnapshot(doc(db, "/data/CharsData/CharsData/", id), (doc) => {
      setCharData(doc.data());
    });
    onSnapshot(query(collection(db, `/data/PlayersData/PlayersData`)), (snapshot) => {
      setPlayersData(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    })
  }, [id]);

  console.log(charData)

  const getPlayers = () => {
    const players = playersData.filter(player => player.charsWinRate.filter(
      charUsage => charUsage.char === id
    ).length > 0)
    return players
  }

  if (char) {
    return (
      <Container className='match-container'>
        <div className='d-flex'>
          <Image src={img} className={`match__char-img`} />
          <h2 className='ardela'>{char.title}</h2>
        </div>
        <h2 className="ardela">Players</h2>
        <div className='d-flex flex-wrap'>
          {getPlayers().map(player => (
            <CharPlayers id={player.id} />
          ))}
        </div>
      </Container>
    );
  }
}

export default CharComponent;