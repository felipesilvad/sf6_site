import React, { useState, useEffect } from 'react';
import {Image} from 'react-bootstrap';
import {MdClose} from 'react-icons/md';
import { doc, onSnapshot,} from 'firebase/firestore';
import db from '../../firebase';

function FilterHeadTourney({id, reloadFilter}) {
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

  return (
    <div className='d-flex filter__bg mx-1 ' 
    style={(serie.color2 === "") ? ({backgroundColor: serie.color}) : ({backgroundImage: `linear-gradient(to right, ${serie.color}, ${serie.color2})`})}>
      <Image className='toruney-img mr-1' src={serie.img} />
      <b className='tourney-title touney-title_filter' style={{color: serie.txtColor}}>
        {tournament.name}
      </b>
      <div className='filter-options-x px-1' onClick={() => reloadFilter('')}>
        <div className='x__margin'>
          <MdClose />
        </div>
      </div>
    </div>
  );
}

export default FilterHeadTourney;