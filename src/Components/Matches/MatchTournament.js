import React, { useState, useEffect } from 'react';
import { doc, onSnapshot,} from 'firebase/firestore';
import db from '../../firebase';
import {Image} from 'react-bootstrap';

function MatchTournament({id,phase, phase_id}) {
  const [tournament, setTournament] = useState([])
  const [serie, setSerie] = useState([])

  useEffect(() => {
    onSnapshot(doc(db, "/tournaments/", id), (doc) => {
      setTournament(doc.data());
    });
  }, [id]);

  useEffect(() => {
    if (tournament) {
      if (tournament.serie) {
        onSnapshot(doc(db, "/tournamentSeries/", tournament.serie), (doc) => {
          setSerie(doc.data());
        });
      }
    }
  }, [tournament]);
  
  if (tournament && serie) {
    return (
      <div className='px-2 d-flex align-items-center tourney-title-border'
      style={(serie.color2 === "") ? ({backgroundColor: serie.color}) : ({backgroundImage: `linear-gradient(to right, ${serie.color}, ${serie.color2})`})}>
        <Image className='toruney-img mr-1' src={serie.img} />
        <b className='tourney-title mb-0' style={{color: serie.txtColor}}>
          {tournament.name}
          {" - "}
          <b className='ardela mr-2'>{phase}</b>
          {(phase === "Top 8")&&(
            <b className='tourney-title mb-0'>
              {(phase_id==="A" || phase_id==="B")&&("Winners Semi-Final")}
              {(phase_id==="C")&&("Winners Final")}
              {(phase_id==="C")&&("Grand Final")}
              {(phase_id==="C")&&("Grand Final Reset #ERRRRR#")}
              {(phase_id==="F" || phase_id==="G")&&("Losers Round 1")}
              {(phase_id==="H" || phase_id==="I")&&("Losers Quarter-Final")}
              {(phase_id==="J")&&("Losers Semi-Final")}
              {(phase_id==="K")&&("Losers Final")}
            </b>
          )}
        </b>
      </div>
    )
  }
}

export default MatchTournament;