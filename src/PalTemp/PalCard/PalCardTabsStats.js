import React, {useState, useEffect} from 'react';
import db from '../../firebase';
import { query, collection, onSnapshot} from "firebase/firestore"; 
import PalCardTabsStatBar from './PalCardTabsStatBar';

function PalCardTabsStats({stats}) {
  
  const [maxStats, setMaxStats] = useState([])
  useEffect (() => {
    onSnapshot(query(collection(db, `/dbs/Pal/maxStats`)), (snapshot) => {
      setMaxStats(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    });
  }, [])

  function capitalizeFirstLetter(string) {
    string = string.replace("_", " ")
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  if (stats) {
    return (
      <div>
        {stats.map(stat => (
          stat.value&&(
            <PalCardTabsStatBar value={stat.value} field={stat.label} label={capitalizeFirstLetter(stat.label)} maxStats={maxStats} />
          )
        ))}
      </div>
    );
  }
}

export default PalCardTabsStats;