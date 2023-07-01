import React, {useState, useEffect} from 'react';
import {Container, Image} from 'react-bootstrap';
import { doc, onSnapshot, query,collection} from 'firebase/firestore';
import {useParams} from 'react-router-dom';
import db from '../../firebase';

function CharComponent() {
  const id = useParams().id
  const [char, setChar] = useState([])
  const img = `https://firebasestorage.googleapis.com/v0/b/sf6-vods.appspot.com/o/Chars%2F${id}_.png?alt=media`

  useEffect(() => {
    onSnapshot(doc(db, "/chars/", id), (doc) => {
      setChar(doc.data());
    });
  }, [id]);

  const [games,setGames] = useState([]);

  useEffect (() => {
    onSnapshot(query(collection(db, `/sets`)), (snapshot) => {
      snapshot.docs.map(doc => (
        setGames(oldGames => [...oldGames,doc.data().games.game1,doc.data().games.game2,doc.data().games.game3,doc.data().games.game4,doc.data().games.game5] )
      ))
    });
  }, [id])
  
  function filterGames(game) {
    if (game.winner) {
      if (game.charP1 === id || game.charP2 === id) {
        return true
      }
    } else {return false}
  }

  if (char) {
    return (
      <Container className='match-container'>
        <div className='d-flex'>
          <Image src={img} className={`match__char-img`} />
          <h2 className='ardela'>{char.title}</h2>
        </div>
        {games.filter(filterGames).length}
      </Container>
    );
  }
}

export default CharComponent;