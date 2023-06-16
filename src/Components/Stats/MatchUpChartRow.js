import React, {useState, useEffect} from 'react';
import MatchUpChartTd from './MatchUpChartTd';

const MatchUpChartRow = ({games, char_id, char2_id}) => {
  const [charWinRate, setCharWinRate] = useState();
  const [charWins, setCharWins] = useState();
  const [charGames, setCharGames] = useState();

  const getCharWinrate = (char, char2) => {
    const charFilteredGames = games.filter(game => 
      (game.charP1 === char || game.charP2 === char) &&
      (game.charP1 === char2 || game.charP2 === char2)
    )
    setCharGames(charFilteredGames.length)
    const charWins = charFilteredGames.filter(game => 
        game.winner === char || game.winner === char ||
        game.winner === char || game.winner === char ||
        game.winner === char
      ).length
    setCharWins(charWins)
    console.log(((charWins/charFilteredGames.length)*100).toFixed(2))
    return ((charWins/charFilteredGames.length)*100).toFixed(2)
  }

  useEffect (() => {
    setCharWinRate(getCharWinrate(char_id, char2_id))
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

export default MatchUpChartRow;