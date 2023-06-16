import React, { useState, useEffect } from 'react';
import { doc, onSnapshot,} from 'firebase/firestore';
import db from '../../firebase';
import {countries} from '../../data.ts'
import ReactCountryFlag from "react-country-flag"

function MatchesListPlayerFlag({id, p2}) {
  const [player, setPlayer] = useState([])

  useEffect(() => {
    onSnapshot(doc(db, "/players/", String(id)), (doc) => {
      setPlayer(doc.data());
    });
  }, [id]);

  const getFlagCode = (txt) => {
    const theCountry = countries.filter(country => country.name === txt)
    return theCountry[0].code
  }

  if (player) {
    if (p2 !== true) {
      return (
        <div className={`match-txt-negative`}>
          <b className="mx-1 txt-shadow ardela-nu">{player.gamerTag}</b>
          {player.country&&(
            <ReactCountryFlag className='mb-1' countryCode={getFlagCode(player.country)} svg />
          )}
        </div>
      )
    } else {
      return (
        <div className={`match-txt-negative text-right`}>
          {player.country&&(
            <ReactCountryFlag className='mb-1' countryCode={getFlagCode(player.country)} svg />
          )}
          <b className="mx-1 txt-shadow ardela-nu">{player.gamerTag}</b>
        </div>
      )
    }
  }
}

export default MatchesListPlayerFlag;