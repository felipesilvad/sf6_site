import React, {useState, useEffect} from 'react';
import MatchUpChartTd from './MatchUpChartTd';

const MatchUpChartRowTotal = ({char_id, games}) => {
  const [charWinRate, setCharWinRate] = useState();
  const [charWins, setCharWins] = useState();
  const [charGames, setCharGames] = useState();

  const getCharWinrate = (char) => {
    const charWins = games.filter(games => 
        games.winner === char
      ).length
    setCharWins(charWins)
    const charLoses = games.filter(games => 
        ((games.charP1 === char || games.charP2 === char) && games.winner !== char) ||
        ((games.charP1 === char || games.charP2 === char) && games.charP1 === games.charP2)
    ).length
    setCharGames(charLoses+charWins)
    return Math.round(((charWins/(charLoses+charWins))*100) * 100) / 100
  }

  useEffect (() => {
    setCharWinRate(getCharWinrate(char_id))
  }, [char_id])

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