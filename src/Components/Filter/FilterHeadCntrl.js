import React from 'react';
import {Image} from 'react-bootstrap';
import {MdClose} from 'react-icons/md';

function FilterHeadCntrl({cntrl, reloadFilter}) {

  return (
    <div className='d-flex filter__bg mx-1 ' >
      {cntrl&&(
        <Image className='cntrl-select__img' src={require(`../../Assets/img/logo-${cntrl}.png`)} />
      )}
      <div className='filter-options-x px-1' onClick={() => reloadFilter('')}>
        <div className='x__margin'>
          <MdClose />
        </div>
      </div>
    </div>
  );
}

export default FilterHeadCntrl;