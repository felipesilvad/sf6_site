import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

function PalCardTabsStatBar({value, field, label, maxStats}) {

  const getMaxStat = (id) => {
    const theStat = maxStats.filter(stat => (stat.id === id))
    if (theStat[0]) {
      return theStat[0].value
    }
  }

  return (
    <div className='d-flex w-100'>
      <div className={`pct__stat-field`}>
        {label}
      </div>
      <ProgressBar className={`stat-bar ${field}-bar-color `} 
      animated={true} now={value} label={value} max={getMaxStat("hp")} />
    </div>
  );
}

export default PalCardTabsStatBar;