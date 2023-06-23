import React, { useState, useEffect } from 'react';
import { Image } from 'react-bootstrap';
import { doc, onSnapshot,} from 'firebase/firestore';
import db from '../../firebase';

function MatchGameChar({cntrl, id, p2}) {
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
        <div className={`cntrl-img-div__game ${p2&&('text-right')}`}>
          <Image src={require(`../../Assets/img/logo-${cntrl}.png`)} className="cntrl-img__game" />
        </div>
        <Image src={img} className={`match__char-img rounded mc-img-game ${p2&&('match__char-img-2')}`} />
      </div>
    )
  }
}

export default MatchGameChar;