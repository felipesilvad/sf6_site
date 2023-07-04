import React, { useState, useEffect } from 'react';
import { doc, onSnapshot,} from 'firebase/firestore';
import db from '../../firebase';

function MatchTournament({id}) {
  const [tournament, setTournament] = useState([])

  useEffect(() => {
    onSnapshot(doc(db, "/tournaments/", id), (doc) => {
      setTournament(doc.data());
    });
  }, [id]);
  
  return (
    tournament&&(tournament.name)
  )
}

export default MatchTournament;