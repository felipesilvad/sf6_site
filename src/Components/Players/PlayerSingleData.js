import React from 'react';
import {countries} from '../../data.ts'
import ReactCountryFlag from "react-country-flag"
import PlayerSingleChar from './PlayerSingleChar';

function PlayerSingleData({player, playerID, gamesP1, gamesP2}) {
  const getFlagCode = (txt) => {
    const theCountry = countries.filter(country => country.name === txt)
    if (theCountry[0]) {
      return theCountry[0].code
    }
  }

  console.log('gamesP1',gamesP2)

  return (
    <div className='p-single__bg'>
      {player&&(
        <>
          {player.country&&(
            <ReactCountryFlag className='mb-1' countryCode={getFlagCode(player.country)} svg />
          )}
          <b className="mx-1 txt-shadow ardela-nu">{player.gamerTag}</b>
          <hr />
          {player.country&&(
            <label>
              Country: {player.country} <ReactCountryFlag countryCode={getFlagCode(player.country)} svg />
            </label>
          )}
          <br/>
          {player.state&&(
            <label>State: {player.state}</label>
          )}
          <PlayerSingleChar player_id={playerID}
          gamesP1={gamesP1} gamesP2={gamesP2}  />
        </>
      )}
    </div>
  );
}

export default PlayerSingleData;