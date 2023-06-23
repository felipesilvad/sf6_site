import React, { useState, useEffect } from 'react';
import { Image } from 'react-bootstrap';
import { doc, onSnapshot,} from 'firebase/firestore';
import db from '../../firebase';
import MatchesListPlayerFlag from './MatchesListPlayerFlag';

function MatchesListItemChar({id, p2, player,cntrl}) {
  const img = `https://firebasestorage.googleapis.com/v0/b/sf6-vods.appspot.com/o/Chars%2F${id}_.png?alt=media`
  const [char, setChar] = useState([])

  useEffect(() => {
    onSnapshot(doc(db, "/chars/", id), (doc) => {
      setChar(doc.data());
    });
  }, [id]);
  
  if (char) {
    return (
      <div className=''>
        <div className={`cntrl-img-div ${p2&&('text-right')}`}>
          <Image src={require(`../../Assets/img/logo-${cntrl}.png`)} className="cntrl-img" />
        </div>
        <Image src={img} className={`match__char-img ${p2&&('match__char-img-2')}`} />
        <div className={`match-txt-negative`}>
          <MatchesListPlayerFlag id={String(player)} p2={p2} />
        </div>
      </div>
    )
  }
}

export default MatchesListItemChar;