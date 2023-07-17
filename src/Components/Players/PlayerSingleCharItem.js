import React, { useState, useEffect } from 'react';
import { Image, ProgressBar } from 'react-bootstrap';
import { doc, onSnapshot, query,collection} from 'firebase/firestore';
import db from '../../firebase';

function PlayerSingleCharItem({charPercent,char_id,index}) {
  const [char, setChar] = useState([])
  const img = `https://firebasestorage.googleapis.com/v0/b/sf6-vods.appspot.com/o/Chars%2F${char_id}_.png?alt=media`

  useEffect(() => {
    onSnapshot(doc(db, "/chars/", char_id), (doc) => {
      setChar(doc.data());
    });
  }, [char_id]);

  return (
    <ProgressBar className='char-progress-bar bg-odd ardela txt-shadow' key={index}
    animated now={charPercent} label={`${charPercent}%`} />
  );
}

export default PlayerSingleCharItem;