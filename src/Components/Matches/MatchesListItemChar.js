import React, { useState, useEffect } from 'react';
import { Image } from 'react-bootstrap';
import { doc, onSnapshot,} from 'firebase/firestore';
import db from '../../firebase';

function MatchesListItemChar({id, p2, player}) {
  const img = `https://firebasestorage.googleapis.com/v0/b/sf6-vods.appspot.com/o/Chars%2F${id}_.png?alt=media`
  const [char, setChar] = useState([])

  useEffect(() => {
    onSnapshot(doc(db, "/chars/", id), (doc) => {
      setChar(doc.data());
    });
  }, [id]);
  
  if (char) {
    return (
      <div className='match__char-bg d-flex'>
        <Image src={img} className={`match__char-img ${p2&&('match__char-img-2')}`} />
        <div className={`match__char-txt-centered ${p2&&('mctc-p2')}`}>
          <h3 className='ardela'>{char.title}</h3>
          <h6>{player}</h6>
        </div>
      </div>
    )
  }
}

export default MatchesListItemChar;