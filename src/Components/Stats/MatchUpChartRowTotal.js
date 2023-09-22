import React, {useState, useEffect} from 'react';
import MatchUpChartTd from './MatchUpChartTd';

const MatchUpChartRowTotal = ({char_id, data}) => {
  const charData = data[parseInt(char_id)-1]
  const charWinRate = charData.full_winrate

  if (charWinRate) {
    if (parseFloat(charWinRate.winrate) > 50) {
      return (
        <MatchUpChartTd charWinRate={charWinRate.winrate} charWins={charWinRate.wins} charGames={charWinRate.games}
        color={`rgba(51, 170, 51, ${Math.round(charWinRate.winrate)/100 - 0.38})`} />
      )
    } 
    else if (parseFloat(charWinRate.winrate) < 50) {
      return (
        <MatchUpChartTd charWinRate={charWinRate.winrate} charWins={charWinRate.wins} charGames={charWinRate.games}
        color={`rgba(225, 49, 51, ${Math.abs(Math.round(charWinRate.winrate - 100)/100)- 0.38})`} />
      )
    } 
    else if (parseFloat(charWinRate.winrate) === 50) {
      return (
        <MatchUpChartTd charWinRate={charWinRate.winrate} charWins={charWinRate.wins} charGames={charWinRate.games}
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
}

export default MatchUpChartRowTotal;