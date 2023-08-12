import React, { useState, useEffect } from 'react';
import { doc, onSnapshot} from 'firebase/firestore';
import db from '../../firebase';
import {Image} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import moment from 'moment'

function TournamentListItem({tournament}) {
  const [serie, setSerie] = useState([])

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
      <Link to={`/tournaments/${tournament.id}`}>
        <div className='px-2 mb-2 d-flex align-items-center tourney-list-item'
        style={(serie.color2 === "") ? ({backgroundColor: serie.color}) : ({backgroundImage: `linear-gradient(to right, ${serie.color}, ${serie.color2})`})}>
          <Image className='toruney-img mr-1' src={serie.img} />
          <b className='tourney-title-list-item mb-0' style={{color: serie.txtColor}}>
            <b className='ardela tourney-year-list-item'>{moment.utc(tournament.startAt*1000).format('YYYY/MM')}</b>
            {" | "}
            {tournament.name}
          </b>
        </div>
      </Link>
    )
  }
}

export default TournamentListItem;