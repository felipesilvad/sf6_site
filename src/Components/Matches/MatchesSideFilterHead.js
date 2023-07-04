import React from 'react';
import FilterHeadChar from '../Filter/FilterHeadChar';

function MatchesSideFilterHead({reloadFilterChar1,reloadFilterChar2,currentChar1,currentChar2}) {

  return (
    <div className='d-flex'>
      <div className='filter__more-bg mx-1 pb-1'>
        <div className='filter__more-txt'>more matches from:</div>
        <FilterHeadChar id={currentChar1} reloadFilter={reloadFilterChar1} current={true} />
      </div>
      <div className='filter__more-bg mx-1 pb-1'>
        <div className='filter__more-txt'>more matches from:</div>
        <FilterHeadChar id={currentChar2} reloadFilter={reloadFilterChar2} current={true} />
      </div>
    </div>
  );
  
}

export default MatchesSideFilterHead;