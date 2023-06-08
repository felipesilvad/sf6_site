import React, { useState, useEffect } from 'react';
import { doc, onSnapshot,} from 'firebase/firestore';
import db from '../../firebase';
import {Image} from 'react-bootstrap';

function MatchesListItemTourney({id}) {
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
      <div className='px-2 mb-2 d-flex align-items-center tourney-title-border'
      style={(serie.color2 === "") ? ({backgroundColor: serie.color}) : ({backgroundImage: `linear-gradient(to right, ${serie.color}, ${serie.color2})`})}>
        <Image className='toruney-img mr-1' src={serie.img} />
        <h5 className='tourney-title mb-0 txt-shadow ' style={{color: serie.txtColor}}>{tournament.name}</h5>
      </div>
    )
  }
}

export default MatchesListItemTourney;