import React, { useState, useEffect } from 'react';
import { query, collection, onSnapshot } from 'firebase/firestore';
import db from '../../firebase';
import MatchesListItem from './MatchesListItem';

function MatchesSide() {
  const [matches, setMatches] = useState([])
  useEffect (() => {
    onSnapshot(query(collection(db, `/sets`)), (snapshot) => {
      setMatches(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    });
  }, [])

  return (
    <div className='matches-side__div custom-scrollbar'>
      {matches.map((match) => (
        <MatchesListItem match={match}/>
      ))}
    </div>
  );
}

export default MatchesSide;