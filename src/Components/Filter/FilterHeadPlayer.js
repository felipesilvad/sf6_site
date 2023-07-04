import React from 'react';
import {Image} from 'react-bootstrap';
import {MdClose} from 'react-icons/md';
import MatchPlayerFlag from '../Matches/MatchPlayerFlag';

function FilterHeadPlayer({id, reloadFilter}) {

  return (
    <div className='d-flex filter__bg mx-1 ' >
      <MatchPlayerFlag id={id} />
      <div className='filter-options-x px-1' onClick={() => reloadFilter('')}>
        <div className='x__margin'>
          <MdClose />
        </div>
      </div>
    </div>
  );
}

export default FilterHeadPlayer;