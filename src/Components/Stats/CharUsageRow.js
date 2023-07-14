import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import {Image} from 'react-bootstrap';

const CharUsageRow = ({name, playersWR, gamesWR, orderBy, id, index}) => {
  const playersNow = parseFloat(playersWR) + 45
  const gamesNow =parseFloat(gamesWR) + 45
  function isOdd(num) { return num % 2;}
  return (
    <tr>
      <td className="p-0 fixed-table-img-left border-left-none">
        <Image className="match__char-img mc-img-game p-0"
        src={`https://firebasestorage.googleapis.com/v0/b/sf6-vods.appspot.com/o/Chars%2F${id}_.png?alt=media`} />
        <b className='table__char-name ardela txt-shadow'>
          {name}
        </b>
      </td>
      {(orderBy === 'players') ? (
        <td className='usage__td'>
          <ProgressBar className={`usage__progress ardela txt-shadow ${
            (isOdd(index))?('bg-odd'):('bg-even')
          }`}
          animated now={playersNow} label={`${playersWR}%`} />
        </td>
      ) : (
        <td className='usage__td'>
          <ProgressBar className={`usage__progress ardela txt-shadow ${
            (isOdd(index))?('bg-odd'):('bg-even')
          }`}
          animated now={gamesNow} label={`${gamesWR}%`} />
        </td>
      )}
      
    </tr>
  )

}

export default CharUsageRow;