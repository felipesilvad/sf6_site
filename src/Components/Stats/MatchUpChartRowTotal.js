import React, {useState, useEffect} from 'react';
import MatchUpChartTd from './MatchUpChartTd';

const MatchUpChartRowTotal = ({char_id, data}) => {
  const charData = data[parseInt(char_id)-1]
  
  if (charWinRate > 50) {
    return (
      <MatchUpChartTd charWinRate={charWinRate} charWins={charWins} charGames={charGames}
      color={`rgba(51, 170, 51, ${Math.round(charWinRate)/100 - 0.38})`} />
    )
  } 
  else if (charWinRate < 50) {
    return (
      <MatchUpChartTd charWinRate={charWinRate} charWins={charWins} charGames={charGames}
      color={`rgba(225, 49, 51, ${Math.abs(Math.round(charWinRate - 100)/100)- 0.38})`} />
    )
  } 
  else if (charWinRate === 50) {
    return (
      <MatchUpChartTd charWinRate={charWinRate} charWins={charWins} charGames={charGames}
      color={`none`} />
    )
  } else {
    return(
      <td className="p-0 text-center" >
        <b style={{background: `none`}}>-</b>
      </td>
    )
  }
}

export default MatchUpChartRowTotal;