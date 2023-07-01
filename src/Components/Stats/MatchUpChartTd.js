import React, {useState} from 'react';

const MatchUpChartTd = ({charWinRate,charWins,charGames, color}) => {
  const [isShown, setIsShown] = useState(false);

  return (
    <td 
      className="p-0 text-center" 
      style={{background: color}}
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      {isShown && (
        <div className='hover_detail_bg'>
          <h6 className='hover_detail_txt'>
            {!! charWins &&(charWins)} Wins <br />
            of {!! charGames &&(charGames)} Games
          </h6>
        </div>
      )}
      <b style={{background: `none`}}>{charWinRate}%</b>
    </td>
  )
}

export default MatchUpChartTd;