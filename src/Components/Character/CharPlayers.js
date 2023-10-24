import React, {useState, useEffect} from 'react';
import {Container, Image} from 'react-bootstrap';
import { doc, onSnapshot} from 'firebase/firestore';
import db from '../../firebase';
import { Link } from 'react-router-dom';
import MatchPlayerFlag from '../Matches/MatchPlayerFlag';

function CharPlayers({id}) {
  const [player, setPlayer] = useState([])

  useEffect(() => {
    onSnapshot(doc(db, "/players/", id), (doc) => {
      setPlayer(doc.data());
    });
  }, [id]);

  if (player) {
    return (
      <Link key={id} to={`/players/${id}`} className='char-players'>
        <MatchPlayerFlag id={id} />
        {/* {player.gamerTag} */}
      </Link>
    );
  }
}

export default CharPlayers;